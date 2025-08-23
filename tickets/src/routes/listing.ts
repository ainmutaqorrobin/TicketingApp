import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { API } from "./const";

const router = express.Router();

router.get(API, async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  res.send(tickets);
});

export default router;
