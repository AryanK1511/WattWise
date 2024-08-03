const db = require("./db");
const mqtt = require("./mqtt");
const app = require("./app");

// Start our back-end services
db.init().then(() => {
  mqtt.start();
  app.listen(3000, () =>
    console.log("Server started on http://localhost:3000"),
  );
});
