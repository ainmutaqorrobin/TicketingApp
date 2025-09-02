import express, { Request, Response } from "express";
import { API } from "./const";
import { requireAuth, validateRequest } from "@robin_project/common";
import { body } from "express-validator";
import { Types } from "mongoose";

const router = express.Router();

router.post(
  API,
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.send({});
  }
);

export default router;
