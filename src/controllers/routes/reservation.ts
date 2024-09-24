import { hashClearMiddleware } from "../../middleware/reservationCache";
import addReservationController from "../addReservationController";
import cancelReservationController from "../cancelReservationController";
import editReservationController from "../editReservationController";
import getReservationController from "../getReservationController";

const { Router } = require("express");

const reservationRouter = new Router();

reservationRouter.post(
  "/api/v1/reservation",
  hashClearMiddleware,
  addReservationController
);
reservationRouter.post(
  "/api/v1/edit",
  hashClearMiddleware,
  editReservationController
);
reservationRouter.post(
  "/api/v1/reservation/delete",
  hashClearMiddleware,
  cancelReservationController
);
reservationRouter.get("/api/v1/reservation/:date", getReservationController);
reservationRouter.get("/api/v1/reservation", getReservationController);

module.exports = { reservationRouter };
