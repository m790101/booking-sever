import { Request, Response } from "express";
import Room from "../../models/room.model";
import Treatment from "../../models/treatment.model";

export default async function treatmentController(req: Request, res: Response) {
  try {
    const treatments = await Treatment.findAll();
    const treatmentList = treatments.map((treatment: TreatmentDao) => {
      return {
        name: treatment.name,
        value: treatment.value,
      };
    });
    const treatmentDto = {
      treatmentList,
    };
    res.status(200).send(treatmentDto);
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

interface TreatmentDao {
  id: number;
  name: string;
  value: number;
}
