// Import the serialport library
var SerialPort = require('serialport');

// Get the parsers from the serialport library
const parsers = SerialPort.parsers;

// Create a new Readline parser with a delimiter of '\r\n'
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

// Open a serial port on COM7 with the specified settings
var port = new SerialPort('COM7', {
    baudRate: 9600,       
    dataBits: 8,          
    parity: 'none',       
    stopBits: 1,          
    flowControl: false    
});

// Pipe the data from the serial port to the parser
port.pipe(parser);

// Event listener for when data is received from the parser
parser.on('data', function(data) {
    console.log(data);
});