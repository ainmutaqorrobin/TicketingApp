import request from "supertest";
import { Ticket } from "../../models/ticket";
import { API } from "../const";
import { app } from "../../app";
import { createTicket } from "../../test/setup";



it("fetches orders for an particular user", async () => {
  // Create three tickets
  const ticketOne = await createTicket();
  const ticketTwo = await createTicket();
  const ticketThree = await createTicket();

  const userOne = global.getCookie();
  const userTwo = global.getCookie();
  // Create one order as User #1
  await request(app)
    .post(API)
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  // Create two orders as User #2
  const { body: orderOne } = await request(app)
    .post(API)
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post(API)
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  // Make request to get orders for User #2
  const response = await request(app)
    .get(API)
    .set("Cookie", userTwo)
    .expect(200);

  // Make sure we only got orders for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(response.body[1].ticket.id).toEqual(ticketThree.id);
});
