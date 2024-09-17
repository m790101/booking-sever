import { Request, Response } from 'express';
import Equipment from '../../models/equipment.model';

export default async function equipmentController(req: Request, res: Response) {
    try{
        const equipments = await Equipment.findAll();
        const equipmentsDto = equipments.map((equip:EquipmentDao)=>{
            return {
                name:equip.name,
                num:equip.num
            }
        })
        res.status(200).send({equipmentList:equipmentsDto})
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}



interface EquipmentDao {
    id:number
    name:string
    num:number
}