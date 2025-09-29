import { Request, Response, Router } from "express";
import { Ticket } from "../models/ticket";
import { API } from "./const";

const router = Router();

router.get(API, async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  res.send(tickets);
});

export { router as ListingTicketRouter };
