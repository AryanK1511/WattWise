const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const port = new SerialPort({ path: "COM5", baudRate: 9600 }); // dev/cu.usbmodem1401

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
parser.on("data", console.log);

module.exports = parser;
