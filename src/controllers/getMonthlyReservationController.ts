import { Request, Response, urlencoded } from "express";
import Reservation from "../../models/reservation.model";
import Room from "../../models/room.model";
import TimeSlot from "../../models/timeSlot.model";
import Treatment from "../../models/treatment.model";
import { ErrorCode } from "../utils/errorCode.enum";
import errorHandle from "../utils/errorHandler";
import { reservationCacheHandle } from "../middleware/reservationCache";
import redis from "../../service/db.redis";
import crypto from "crypto";
import moment from "moment";
import { Op } from "sequelize";

export default async function getMonthltyReservationController(
  req: Request,
  res: Response
) {
  try {
    const data = req.body;
    const month = moment(data.date, "YYYY-MM").month() + 1;
    const year = moment(data.date, "YYYY-MM").year();
    const startDate = moment(`${year}-${month}-01`).startOf('month').toDate(); // First day of the month
    const endDate = moment(startDate).endOf('month').toDate(); // Last day of the month
    const reservationCache = await reservationCacheHandle(data.date);
    if (reservationCache) {
      const cacheParse = JSON.parse(reservationCache)
      res.status(200).send({reservationList:cacheParse});
      return;
    }
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Room,
          attributes: ["name"], // Only include the room number
        },
        {
          model: TimeSlot,
          attributes: ["startTime"], // Only include the time field
        },
        {
          model: Treatment,
          attributes: ["name"], // Only include the time field
        },
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate], // Find all reservations within the month
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

    redis.set(data.date, JSON.stringify(formattedReservations));
    res.status(200).send({reservationList:formattedReservations});
  } catch (error: any) {
    const errorObject = errorHandle(ErrorCode.E002, error.message);
    res.status(500).send(errorObject);
  }
}
