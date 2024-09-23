import { Request, Response } from 'express';
import Room from '../../models/room.model';
import TimeSlot from '../../models/timeSlot.model';
import Reservation from '../../models/reservation.model';
import sequelize from '../../service/db.service';
import errorHandle from '../utils/errorHandler';
import { ErrorCode } from '../utils/errorCode.enum';
import { reservationCacheClear } from '../middleware/reservationCache';

export default async function cancelReservationController(req: Request, res: Response) {
    try{

        const data = req.body
        const result = await sequelize.transaction(async (t: any) => {
          const roomInstance = await Room.findOne({ where: { name: data.room } });
        
          if (!roomInstance) {
            const errorObject = errorHandle(ErrorCode.E002,'資料有誤')
            return res.status(200).send(errorObject);
          }
      
          const timeSlot = await TimeSlot.findOne({ where: { startTime: data.timeSlot } });
  
          if (!timeSlot) {
            const errorObject = errorHandle(ErrorCode.E002,'資料有誤')
            return res.status(200).send(errorObject);
          }
  
          await Reservation.destroy({
            where: {
                date: data.date,
                room_id: roomInstance.id,
                time_slot_id: timeSlot.id        
            },
          });
        
          reservationCacheClear(data.date)
          return JSON.stringify('ok') 
        });
        res.status(200).send(result)
    } catch (error: any) {
      const errorObject = errorHandle(ErrorCode.E999,error)
      res.status(500).send(errorObject);
    }
}