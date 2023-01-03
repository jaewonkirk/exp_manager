import express from "express";
import openPort from "../../../device_controllers/openPort"

const postConnect = (req, res) => {
    const comParam = req.body;
    console.log(req.body);
    console.log(ports);
    openPort(comParam);

    res.send({connection: true});
}

export default postConnect;