const db = require("./db");
const mqtt = require("mqtt");

// Initialize MQTT broker
module.exports.start = () => {
  console.log({ url: process.env.MQTT_URL });
  const client = mqtt.connect(process.env.MQTT_URL);

  // If MQTT doesn't connect, throw an error
  client.on("error", (err) => {
    console.error("MQTT error", err);
  });

  client.on("message", (topic, payload) => {
    // topic will be: device/:deviceId/power
    const [, deviceId] = topic.split("/");
    const data = JSON.parse(payload);

    console.log("Got MQTT message", { deviceId, data });
    db.addReading(deviceId, data.recordedTimestamp, data.power);
  });

  // Listen for any devices that have the device topid
  client.on("connect", () => {
    client.subscribe("device/+/power", (err) => {
      if (err) {
        console.error("Unable to subscribe to device/+/power topic", err);
      } else {
        console.log("Subscribed to device/+/power topic");
      }
    });
  });
};
