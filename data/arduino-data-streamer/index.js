// https://fakerjs.dev/
const { faker } = require("@faker-js/faker");
// https://github.com/mqttjs/MQTT.js
const mqtt = require("mqtt");

// Make up a fake device name
const deviceId = process.env.DEVICE_ID;
const clientId = `device-${deviceId}`;

// Define our MQTT topic name
const topic = `device/${deviceId}/power`;

// Connect an MQTT client, so we can publish messages
const client = mqtt.connect(process.env.MQTT_URL, { clientId });

// Log errors
client.on("error", (err) => console.error("MQTT error", { deviceId, err }));

const simulateDeviceReading = () => {
  const data = {
    // Random number between 50 and 100
    power: faker.datatype.float({ min: 50, max: 100 }),
    // Current date and time (in ms)
    recordedTimestamp: Date.now(),
  };
  // We need to send this as a string
  const message = JSON.stringify(data);

  console.log(
    `deviceId=${deviceId} publish: topic=${topic}, message=${message}`
  );
  client.publish(topic, message);
};

// Simulate a new temperature reading every 5s
setInterval(simulateDeviceReading, 1000);
