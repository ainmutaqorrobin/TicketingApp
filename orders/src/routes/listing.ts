import express, { Request, Response } from "express";
import { API } from "./const";
import { requireAuth } from "@robin_project/common";
import { Order } from "../models/order";
const router = express.Router();

router.get(API, requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  res.send(orders);
});

export default router;
