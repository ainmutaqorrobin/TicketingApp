import request from "supertest";
import { app } from "../../app";
import { API } from "../const";
import { Types } from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "@robin_project/common";
import { stripe } from "../../stripe";

jest.mock("../../stripe");

it("return 404 when purchase an order that does not exist", async () => {
  await request(app)
    .post(API)
    .set("Cookie", getCookie())
    .send({ token: "test", orderId: new Types.ObjectId().toHexString() })
    .expect(404);
});

it("return 401 when purchase an order that does not belong to the user", async () => {
  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    userId: new Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.AwaitingPayment,
  });

  await order.save();

  await request(app)
    .post(API)
    .set("Cookie", getCookie())
    .send({ token: "test", orderId: order.id })
    .expect(401);
});

it("return 400 when purchase cancelled order", async () => {
  const userId = new Types.ObjectId().toHexString();

  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });

  await order.save();

  await request(app)
    .post(API)
    .set("Cookie", getCookie(userId))
    .send({ token: "test", orderId: order.id })
    .expect(400);
});

it("returns a 204 with valid inputs", async () => {
  const userId = new Types.ObjectId().toHexString();

  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });

  await order.save();

  await request(app)
    .post(API)
    .set("Cookie", getCookie(userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];

  expect(chargeOptions.source).toEqual("tok_visa");
  expect(chargeOptions.amount).toEqual(20 * 100);
  expect(chargeOptions.currency).toEqual("usd");
});
