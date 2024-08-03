const express = require("express");
const ms = require("ms");
const db = require("./db");
const Spec = require("./models/Spec");

const app = express();

// Return a date time in the past, as ms
const parseSince = (since) => {
  if (since) {
    // Create a date that is in the past, '3m' -> 180000
    const sinceDate = new Date(Date.now() - ms(since));
    return sinceDate.getTime();
  }
};

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
    const now = new Date();
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
  const since = parseSince(req.query.since);
  const limit = parseLimit(req.query.limit);

  try {
    const readings = await db.getReadings(deviceId, { since, limit });

    // Create Spec instance and add the readings
    const spec = new Spec();
    readings.forEach((reading) => {
      console.log(reading);
      spec.addSinglePower(reading.power, reading.recordedTimestamp, false);
    });

    console.log(spec.getSpec());

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