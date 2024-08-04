# WattWise

WattWise is an innovative energy-saving app that uses an Arduino-powered device to monitor and predict household electricity usage and bills in real-time. Check out our [Devpost](https://devpost.com/software/hackthe6ix-bqlrik) to learn more.

<p align="center">
  <img src="./assets/WattWise.png" alt="WattWise logo" width="500"/>
</p>

By providing a web-based dashboard with live data and bill predictions, it incentivizes users to reduce their energy consumption.

This solution not only helps save money but also promotes environmental sustainability by reducing overall electricity usage.

## Running the code locally

> **NOTE:** This documentation is yet to be completed.

1. Setting up the docker containers to run MQTT, dynamoDB and some other services.

   ```bash
   cd mqtt-setup/
   docker compose up --build
   ```

2. Set up the data streaming from Arduino to your serial port.

   ```bash
   cd arduino-data-streamer/
   npm install
   node index.js
   ```

## Authors

- [Aryan Khurana](https://github.com/AryanK1511)
- [Shrey Bhatt](https://github.com/KaosElegent)
- [Krins Vaghasia](https://github.com/KrinsKumar)
