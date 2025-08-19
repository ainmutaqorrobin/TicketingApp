import request from "supertest";
import { app } from "../../app";

const API = "/api/tickets";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post(API).send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post(API).send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post(API)
    .set("Cookie", global.getCookie())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {});
it("returns an error if an invalid price is provided", async () => {});
it("creates a ticket with valid inputs", async () => {});
