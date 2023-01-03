import express from "express";
import getHome from "../controllers/global/getHome";

import getPortList from "../../device_controllers/getPortList"

const globalRouter = express.Router();

globalRouter.get("/", getPortList, getHome);

export default globalRouter;