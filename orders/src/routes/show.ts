import express, { Request, Response } from "express";
import { API } from "./const";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@robin_project/common";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  `${API}/:orderId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    
    res.send(order);
  }
);

export default router;
