import request from "supertest";
import { app } from "../../app";
import { API } from "../const";

const createTicket = () => {
  return request(app)
    .post(API)
    .set("Cookie", global.getCookie())
    .send({ title: "valid ticket", price: 22 });
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  const response = await request(app).get(API).send().expect(200);
  expect(response.body.length).toEqual(3);
});
