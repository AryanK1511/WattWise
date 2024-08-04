const parser = require("./parser");
const mqtt = require("mqtt");

const deviceId = "arduino";
const clientId = `device-${deviceId}`;

// Define our MQTT topic name
const topic = `device/${deviceId}/power`;

// Connect an MQTT client, so we can publish messages
const client = mqtt.connect("mqtt://localhost:1883", { clientId });

// Log errors
client.on("error", (err) => console.error("MQTT error", { deviceId, err }));

// Get live data from the Arduino
let arduinoPower = 0;
parser.on("data", (data) => {
  arduinoPower = data;
});

// publishes the data that we get from the Arduino to the MQTT broker
const publishDeviceReading = () => {
  const data = {
    // power reading that we get from Arduino
    power: arduinoPower || null,
    // Current date and time (in ms)
    recordedTimestamp: new Date(),
  };
  // We need to send this as a string
  const message = JSON.stringify(data);

  console.log(
    `deviceId=${deviceId} publish: topic=${topic}, message=${message}`
  );
  client.publish(topic, message);
};

// Send a new power reading every second
setInterval(publishDeviceReading, 1000);
