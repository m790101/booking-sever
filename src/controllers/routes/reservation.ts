import { body } from "express-validator";
import { hashClearMiddleware, hashClearMutiMiddleware } from "../../middleware/reservationCache";
import addReservationController from "../addReservationController";
import cancelReservationController from "../cancelReservationController";
import editReservationController from "../editReservationController";
import getReservationController from "../getReservationController";
import { addReservationValidator } from "../../validator/reservation.validator";
import getMonthltyReservationController from "../getMonthlyReservationController";
import getReservationMuti from "../getReservationMuti";
import addMultipleReservations from "../addMutiReservation";

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
reservationRouter.post("/api/v1/reservation/muti", getReservationMuti);
reservationRouter.post("/api/v1/reservation/muti/add",hashClearMutiMiddleware,addMultipleReservations);

module.exports = { reservationRouter };
