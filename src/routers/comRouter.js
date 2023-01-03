import express from "express";

import postConnect from "../controllers/com/postConnect";

const comRouter = express.Router();

comRouter.post("/connect", postConnect);

export default comRouter;