import request from "supertest";
import { app } from "../../app";
import { API } from "../const";
import { Types } from "mongoose";
import { natsWrapper } from "../../nats-wrapper";

const createTicket = (cookie?: string[]) => {
  return request(app)
    .post(API)
    .set("Cookie", cookie ? cookie : global.getCookie())
    .send({ title: "valid ticket", price: 22 });
};

const id = new Types.ObjectId().toHexString();
it("returns a 404 if the provided id does not exist", async () => {
  await request(app)
    .put(`${API}/${id}`)
    .set("Cookie", global.getCookie())
    .send({
      title: "valid title",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app)
    .put(`${API}/${id}`)
    .send({
      title: "valid title",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const responseTicket = await createTicket();

  await request(app)
    .put(`${API}/${responseTicket.body.id}`)
    .set("Cookie", global.getCookie())
    .send({
      title: "new valid title",
      price: 200,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.getCookie(); //to indicate the same user
  const response = await createTicket(cookie);

  //invalid title
  await request(app)
    .put(`${API}/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  //invalid price
  await request(app)
    .put(`${API}/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "valid title", price: -10 })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.getCookie(); //to indicate the same user
  const createdTicketResponse = await createTicket(cookie);

  await request(app)
    .put(`${API}/${createdTicketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "updated title", price: 100 })
    .expect(200);

  const fetchedTicketResponse = await request(app).get(
    `${API}/${createdTicketResponse.body.id}`
  );

  expect(fetchedTicketResponse.body.title).toEqual("updated title");
  expect(fetchedTicketResponse.body.price).toEqual(100);
});

it("publish an event", async () => {
  const cookie = global.getCookie(); //to indicate the same user
  const createdTicketResponse = await createTicket(cookie);

  await request(app)
    .put(`${API}/${createdTicketResponse.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "updated title", price: 100 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
