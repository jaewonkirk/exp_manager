import express from "express";

const getHome = (req, res) => {
    res.render("home", {
        portList : req.data.portList,
        baudrateList : [600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400, 460800, 921600],
        databitsList : [5, 6, 7, 8],
        parityList : ["Even", "Odd", "None", "Mark", "Space"],
        stopbitsList : [1, 1.5, 2],
        flowControlList : ["Xon/Xoff", "RTS/CTS", "None"]
    });
}

export default getHome;