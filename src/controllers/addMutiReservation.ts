import { Request, Response } from "express";
import Room from "../../models/room.model";
import TimeSlot from "../../models/timeSlot.model";
import Reservation from "../../models/reservation.model";
import Treatment from "../../models/treatment.model";
import sequelize from "../../service/db.service";
import errorHandle from "../utils/errorHandler";
import { ErrorCode, ErrorMessage } from "../utils/errorCode.enum";

const addMultipleReservations = async (req: Request, res: Response) => {
  const reservationdata = req.body; 
  try {
    const { room, timeSlot, treatment } = reservationdata;

    // Fetch room, timeslot, and treatment only once
    const [roomInstance, timeSlotInstance, treatmentInstance] =
      await Promise.all([
        Room.findOne({ where: { name: room } }),
        TimeSlot.findOne({ where: { startTime: timeSlot } }),
        Treatment.findOne({ where: { value: treatment } }),
      ]);

    // Validate fetched instances
    if (!roomInstance || !timeSlotInstance || !treatmentInstance) {
      throw new Error(ErrorCode.E002);
    }

    // Prepare the data for bulk insert
    const newReservations = reservationdata.date.map((date: string) => ({
      date: date, // Different date for each reservation
      room_id: roomInstance.id,
      time_slot_id: timeSlotInstance.id,
      treatment_id: treatmentInstance.id,
      name: reservationdata.name,
      equipment: reservationdata.equipment,
    }));

    // Execute the bulk insert within a transaction
    await sequelize.transaction(async (t: any) => {
      await Reservation.bulkCreate(newReservations, { transaction: t });
    });

    res.status(201).json({ message: "Reservations created successfully" });
  } catch (error: any) {
    if (error.message === ErrorCode.E002) {
      const errorObject = errorHandle(ErrorCode.E002, ErrorMessage.E002);
      res.status(200).send(errorObject);
    } else {
      const errorObject = errorHandle(ErrorCode.E999, error);
      res.status(500).send(errorObject);
    }
  }
};

export default addMultipleReservations;
