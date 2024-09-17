import treatmentController from "../treatmentController";

const { Router } = require("express");

const treatmentRouter = new Router();

treatmentRouter.get("/api/v1/treatment", treatmentController)


module.exports = { treatmentRouter };