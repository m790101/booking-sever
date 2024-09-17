import { Request, Response } from 'express';
import Room from '../../models/room.model';
import TimeSlot from '../../models/timeSlot.model';
import Reservation from '../../models/reservation.model';
import Treatment from '../../models/treatment.model';

export default async function addReservationController(req: Request, res: Response) {
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

        const treatment = await Treatment.findOne({ where: { value: data.treatment } });

        if (!treatment) {
          return res.status(404).send("treatment not found");
        }
    
        const newReservation = await Reservation.create({
            date: data.date,
            room_id: roomInstance.id,       
            time_slot_id: timeSlot.id,  
            treatment_id: treatment.id,
            name: data.name,
            equipment: data.equipment
          });
    
        res.status(200).send(newReservation)
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message);
    }
}

