const express = require("express");
const ms = require("ms");
const db = require("./db");
const Spec = require("./models/Spec");

const app = express();

const parseLimit = (limit) => {
  if (limit) {
    return parseInt(limit, 10);
  }
  // Use 300 as a default otherwise
  return 300;
};

// Return a power value object for the given device.
// Optionally limit it to only return a certain number,
// or give a time window (e.g., 1m or 2hours)
app.get("/power/:deviceId/current", async (req, res) => {
  const { deviceId } = req.params;

  try {
    const [reading] = await db.getReadings(deviceId, { limit: 1 });

    // Create Spec instance and add the reading
    const spec = new Spec();
    spec.addSinglePower(reading.power, reading.recordedTimestamp, false);

    res.json(spec.getSpec());
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error",
      message: "Unable to get current device power reading",
    });
  }
});

// Return an array of power value objects for the given device.
// Optionally limit it to only return a certain number,
// or give a time window (e.g., 1m or 2hours)
app.get("/power/:deviceId", async (req, res) => {
  const { deviceId } = req.params;
  const limit = parseLimit(req.query.limit);

  try {
    const readings = await db.getReadings(deviceId, { limit });

    // Create Spec instance and add the readings
    const spec = new Spec();
    readings.forEach((reading) => {
      spec.addSinglePower(reading.power, reading.recordedTimestamp, false);
    });

    res.json(spec.getSpec());
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error",
      message: "Unable to get device power readings",
    });
  }
});

module.exports = app;
