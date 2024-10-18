import { Request, Response, urlencoded } from "express";
import Reservation from "../../models/reservation.model";
import Room from "../../models/room.model";
import TimeSlot from "../../models/timeSlot.model";
import Treatment from "../../models/treatment.model";
import { ErrorCode } from "../utils/errorCode.enum";
import errorHandle from "../utils/errorHandler";
import { reservationCacheHandle } from "../middleware/reservationCache";
const { Op } = require("sequelize");
import redis from "../../service/db.redis";
import moment from "moment";
import { where } from "sequelize";

export default async function getReservationMuti(req: Request, res: Response) {
  try {
    const timeSlot = req.body.timeSlot;
    // const reservationCache = await reservationCacheHandle(date);
    // if (reservationCache) {
    //   res.status(200).send(JSON.parse(reservationCache));
    //   return;
    // }
    // Define the start and end date range
    const startDate = moment().startOf("day"); // Today
    const endDate = moment().add(6, "months").endOf("month"); // End of the 6th month
    const EECPRoom = ["203", "205", "208", "207"];
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Room,
          attributes: ["name"],
          where: {
            name: {
              [Op.in]: EECPRoom,
            },
          },
        },
        {
          model: TimeSlot,
          attributes: ["startTime"],
          where:{
            startTime: timeSlot
          }
        },
        {
          model: Treatment,
          attributes: ["name"],
          where: {
            name: "eecp",
          },
        },
      ],
      where: {
        date: {
          [Op.between]: [startDate.toDate(), endDate.toDate()], // From today to the end of the 6th month
        },
      },
    });

    const formattedReservations = reservations.map(
      (reservation: {
        dataValues: {
          date: { toISOString: () => string };
          name: any;
          room: { dataValues: { name: any } };
          time_slot: { dataValues: { startTime: string } };
          treatment: { name: any };
          equipment: any;
        };
      }) => ({
        date: reservation.dataValues.date.toISOString().split("T")[0], // Format date to 'YYYY-MM-DD'
        name: reservation.dataValues.name,
        room: reservation.dataValues.room.dataValues.name, // Extract room name from room dataValues
        timeSlot:
          reservation.dataValues.time_slot.dataValues.startTime.substring(0, 5),
        treatment: reservation.dataValues.treatment.name,
        equipment: reservation.dataValues.equipment,
      })
    );
    // redis.set(date, JSON.stringify(formattedReservations));
    res.status(200).send(formattedReservations);
  } catch (error: any) {
    const errorObject = errorHandle(ErrorCode.E002, error.message);
    res.status(500).send(errorObject);
  }
}
