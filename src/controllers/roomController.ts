import { Request, Response } from 'express';
import sequelize from '../../service/db.service';
import Room from '../../models/dto/room.model';

export default async function roomController(req: Request, res: Response) {
    try{
        const room = await Room.findAll();
        console.log(room)
        // const [results, metadata] = await sequelize.query('SELECT name FROM room');
        // res.status(200).send(results)
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}