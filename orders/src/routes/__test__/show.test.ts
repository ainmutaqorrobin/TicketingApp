import request from "supertest";
import { app } from "../../app";
import { API } from "../const";
import { createTicket } from "../../test/setup";

it("fetches the order", async () => {
  const ticket = await createTicket();

  const user = getCookie();
  const { body: order } = await request(app)
    .post(API)
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`${API}/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error if fetch another users order", async () => {
  const ticket = await createTicket();

  const user = getCookie();
  const anotherUser = getCookie();

  const { body: order } = await request(app)
    .post(API)
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`${API}/${order.id}`)
    .set("Cookie", anotherUser)
    .send()
    .expect(401);
});
