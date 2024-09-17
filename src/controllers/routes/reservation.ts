import addReservationController from "../addReservationController";
import getReservationController from "../getReservationController";

const { Router } = require("express");

const reservationRouter = new Router();

reservationRouter.post("/api/v1/reservation", addReservationController)
reservationRouter.get("/api/v1/reservation/:date", getReservationController)
reservationRouter.get("/api/v1/reservation", getReservationController)

module.exports = { reservationRouter };