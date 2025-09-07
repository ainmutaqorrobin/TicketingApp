import request from "supertest";
import { createTicket } from "../../test/setup";
import { app } from "../../app";
import { API } from "../const";
import { OrderStatus } from "@robin_project/common";
import { Order } from "../../models/order";

it("cancel an order", async () => {
  //create a ticket with Ticket model
  const ticket = await createTicket();
  const user = getCookie();

  //make a request to create an order
  const { body: order } = await request(app)
    .post(API)
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //make a request to cancel the order
  await request(app)
    .delete(`${API}/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  //expectation to make sure the thing is cancelled
  const deletedOrder = await Order.findById(order.id);

  expect(deletedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo("emits an order cancelled event");
