import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";
import errorHandle from "../utils/errorHandler";
import { ErrorCode, ErrorMessage } from "../utils/errorCode.enum";

// Validation middleware
const addReservationValidator: RequestHandler[] = [
  body("name").trim().notEmpty(),
  body("room").notEmpty(),
  body("timeSlot").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObject = errorHandle(ErrorCode.E002, ErrorMessage.E002);
      return res.status(200).send(errorObject);
    }
    next();
  },
];

export { addReservationValidator };
