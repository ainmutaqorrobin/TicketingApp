import request from "supertest";
import { app } from "../../app";
import { API } from "./const";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post(API.SIGN_UP)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns 400 status code with an invalid email", async () => {
  return request(app)
    .post(API.SIGN_UP)
    .send({
      email: "noalias.com",
      password: "password",
    })
    .expect(400);
});

it("returns 400 status code with an invalid password", async () => {
  return request(app)
    .post(API.SIGN_UP)
    .send({
      email: "noalias.com",
      password: "four",
    })
    .expect(400);
});

it("returns 400 status code with missing email and password", async () => {
  await request(app)
    .post(API.SIGN_UP)
    .send({ email: "test@gmail.com" })
    .expect(400);

  await request(app)
    .post(API.SIGN_UP)
    .send({ password: "123123123" })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post(API.SIGN_UP)
    .send({ email: "test@test.com", password: "123123123" })
    .expect(201);

  await request(app)
    .post(API.SIGN_UP)
    .send({ email: "test@test.com", password: "123123123" })
    .expect(400);
});

it("set a cookie after successful signup", async () => {
  const response = await request(app)
    .post(API.SIGN_UP)
    .send({ email: "test@test.com", password: "123123123" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
