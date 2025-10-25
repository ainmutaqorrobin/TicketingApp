import { Request, Response, Router } from "express";
import { API } from "./const";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@robin_project/common";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";
import { Payment } from "../models/payment";

const router = Router();

router.post(
  API,
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("Token must be provided"),
    body("orderId").not().isEmpty().withMessage("OrderId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    if (order.status === OrderStatus.Cancelled)
      throw new BadRequestError("Cannot pay for cancelled order");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price * 100, // Stripe uses cents
      currency: "usd",
      payment_method: token, // token from client
      confirm: true, // confirm the payment immediately,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    console.log(paymentIntent);

    const payment = Payment.build({
      orderId,
      stripeId: paymentIntent.id,
    });
    await payment.save();

    return res.status(201).send({
      success: true,
      id: payment.id,
      stripeId: paymentIntent.id,
      status: paymentIntent.status,
    });
  }
);

export { router as createChargeRouter };
