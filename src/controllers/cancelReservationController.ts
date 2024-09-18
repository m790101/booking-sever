import { Request, Response } from 'express';
import Room from '../../models/room.model';
import TimeSlot from '../../models/timeSlot.model';
import Reservation from '../../models/reservation.model';

export default async function cancelReservationController(req: Request, res: Response) {
    try{
        const data = req.body
        const roomInstance = await Room.findOne({ where: { name: data.room } });
        
        if (!roomInstance) {
          return res.status(404).send("Room not found");
        }
    
        const timeSlot = await TimeSlot.findOne({ where: { startTime: data.timeSlot } });

        if (!timeSlot) {
          throw new Error('Time slot not found');
        }
        await Reservation.destroy({
            where: {
                date: data.date,
                room_id: roomInstance.id,
                time_slot_id: timeSlot.id        
            },
          });
          const resJson = JSON.stringify('ok')

        res.status(200).send(resJson)
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message);
    }
}