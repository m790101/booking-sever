import { Request, Response } from "express";
import Room from "../../models/room.model";
import TimeSlot from "../../models/timeSlot.model";
import Reservation from "../../models/reservation.model";
import Treatment from "../../models/treatment.model";
import sequelize from "../../service/db.service";
import errorHandle from "../utils/errorHandler";
import { ErrorCode, ErrorMessage } from "../utils/errorCode.enum";
import { validationResult } from "express-validator";

export default async function addReservationController(
  req: Request,
  res: Response
) {
  try {
    const data = req.body;
    const result = await sequelize.transaction(async (t: any) => {
      const roomInstance = await Room.findOne({ where: { name: data.room } });

      if (!roomInstance) {
        throw new Error(ErrorCode.E002);
      }

      const timeSlot = await TimeSlot.findOne({
        where: { startTime: data.timeSlot },
      });

      if (!timeSlot) {
        throw new Error(ErrorCode.E002);
      }

      const treatment = await Treatment.findOne({
        where: { value: data.treatment },
      });

      if (!treatment) {
        throw new Error(ErrorCode.E002);
      }
      const newReservation = await Reservation.create({
        date: data.date,
        room_id: roomInstance.id,
        time_slot_id: timeSlot.id,
        treatment_id: treatment.id,
        name: data.name,
        equipment: data.equipment,
      });

      return newReservation;
    });
    res.status(200).send(result);
  } catch (error: any) {
    if (error.message === ErrorCode.E002) {
      const errorObject = errorHandle(ErrorCode.E002, ErrorMessage.E002);
      res.status(200).send(errorObject);
    } else {
      const errorObject = errorHandle(ErrorCode.E999, error);
      res.status(500).send(errorObject);
    }
  }
}
