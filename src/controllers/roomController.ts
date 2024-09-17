import { Request, Response } from 'express';
import Room from '../../models/room.model';

export default async function roomController(req: Request, res: Response) {
    try{
        const rooms = await Room.findAll();
        const roomDto = rooms.map((room:RoomDao)=>{
            return {
                name:room.name
            }
        })
        res.status(200).send({roomList:roomDto})
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}




interface RoomDao {
    id:number
    name:string
}