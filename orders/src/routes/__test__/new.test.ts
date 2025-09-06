import request from "supertest";
import { app } from "../../app";
import { Types } from "mongoose";
import { API } from "../const";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@robin_project/common";

const createTicket = async () => {
  const ticket = Ticket.build({
    price: 20,
    title: "concert",
  });

  await ticket.save();
  return ticket;
};

it("returns an error if the ticket is not found", async () => {
  const ticketId = new Types.ObjectId();

  await request(app)
    .post(API)
    .set("Cookie", global.getCookie())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
  const ticket = await createTicket();

  const order = Order.build({
    ticket: ticket,
    userId: "user123",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post(API)
    .set("Cookie", global.getCookie())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = await createTicket();

  await request(app)
    .post(API)
    .set("Cookie", global.getCookie())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo("emits an order created event")