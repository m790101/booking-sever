import { Request, Response, urlencoded } from "express";
import Reservation from "../../models/reservation.model";
import Room from "../../models/room.model";
import TimeSlot from "../../models/timeSlot.model";
import Treatment from "../../models/treatment.model";
import { where } from "sequelize";

export default async function getReservationController(
  req: Request,
  res: Response
) {
  try {
    const date = req.params.date
    // const reservation = await Reservation.findAll({ where: { date: today } });
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
      where:{date}
    });

    const formattedReservations = reservations.map((reservation: { dataValues: { date: { toISOString: () => string; }; name: any; room: { dataValues: { name: any; }; }; time_slot: { dataValues: { startTime: string; }; }; treatment: { name: any; }; equipment: any; }; } ) => ({
      date: reservation.dataValues.date.toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
      name: reservation.dataValues.name,
      room: reservation.dataValues.room.dataValues.name, // Extract room name from room dataValues
      timeSlot: reservation.dataValues.time_slot.dataValues.startTime.substring(0, 5),
      treatment: reservation.dataValues.treatment.name,
      equipment: reservation.dataValues.equipment
    }));

    res.status(200).send(formattedReservations);
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
