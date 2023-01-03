const {SerialPort, InterByteTimeoutParser} = require("serialport");

const openPort = async (comParams) => {
    const port = new SerialPort({
        path: comParams.path,
        baudRate: comParams.baudrate,
        dataBits: comParams.databits,
        stopBits: comParams.stopbits
    });
    serialports.push(port);

    const parser = new InterByteTimeoutParser({
        interval: 100,
    });
    parsers.push(parser);
    
    serialports[serialports.length-1].pipe(parsers[parsers.length-1]);

    portIdx.push({port: comParams.path, idx: portIdx.length});
    buffers.push({port: comParams.path, buffer: []});

    parsers[parsers.length-1].on("data", (line) => {buffers[portIdx.length-1].push(line)});
};