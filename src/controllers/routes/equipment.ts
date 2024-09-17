import equipmentController from "../equipmentController";

const { Router } = require("express");

const equipmentRouter = new Router();

equipmentRouter.get("/api/v1/equipment", equipmentController)


module.exports = { equipmentRouter };