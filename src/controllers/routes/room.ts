import roomController from "../roomController";

const { Router } = require("express");

const roomRouter = new Router();

roomRouter.get("/api/v1/room", roomController)


module.exports = { roomRouter };