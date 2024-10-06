import { body } from "express-validator";
import { hashClearMiddleware } from "../../middleware/reservationCache";
import addReservationController from "../addReservationController";
import cancelReservationController from "../cancelReservationController";
import editReservationController from "../editReservationController";
import getReservationController from "../getReservationController";
import { addReservationValidator } from "../../validator/reservation.validator";
import getMonthltyReservationController from "../getMonthlyReservationController";

const { Router } = require("express");

const reservationRouter = new Router();

reservationRouter.post(
  "/api/v1/reservation",
  addReservationValidator,
  hashClearMiddleware,
  addReservationController
);
reservationRouter.post(
  "/api/v1/edit",
  addReservationValidator,
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
reservationRouter.post("/api/v1/reservation/month", getMonthltyReservationController);

module.exports = { reservationRouter };
