import "./device_controllers/serialInit";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

const PORT = 4001;

//통신부 - 추후 별도 파일로 분리 (어떻게하지?)
const ports = [];
const {SerialPort, InterByteTimeoutParser} = require("serialport");

const port = new SerialPort({
    path: "COM7",
    baudRate: 38400,
});
//serialports.push(port);

const parser = new InterByteTimeoutParser({
    interval: 100,
});
//parsers.push(parser);

port.pipe(parser);
//serialports[serialports.length-1].pipe(parsers[parsers.length-1]);

//portIdx.push({port: comParams.path, idx: portIdx.length});
//buffers.push({port: comParams.path, buffer: []});
let buffer = "";
parser.on("data", (line) => {console.log(line); buffer = `${line}`; console.log(buffer);});

port.write(":0703047162716200\r\n");

function postTxMsg(req, res){
    console.log(req.body.msg);
    function serialWrite(){
        port.write(req.body.msg);
        console.log(buffer);
    };
    serialWrite(req.body.msg);
    setTimeout(()=>{res.send({rxMsg:buffer});}, 1000);
};


// 통신부 끝

const app = express();
const logger = morgan("dev");

app.use(helmet());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views")
app.use(logger);

import globalRouter from "./src/routers/globalRouter";
import comRouter from "./src/routers/comRouter";

app.use(express.json());

app.post("/txMsg", postTxMsg);
app.use("/com", comRouter);
app.use("/", globalRouter);

const handleListening = () => console.log(`Server is listening on port ${PORT}`)

app.listen(PORT, handleListening);