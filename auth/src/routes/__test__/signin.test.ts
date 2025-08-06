import request from "supertest";
import { app } from "../../app";
import { API } from "./const";

it("fails when email does not exist", async () => {
  await request(app)
    .post(API.SIGN_IN)
    .send({
      email: "noemail",
      password: "password",
    })
    .expect(400);
});

it("fails when giving wrong password", async () => {
  await request(app)
    .post(API.SIGN_UP)
    .send({
      email: "email@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post(API.SIGN_IN)
    .send({ email: "email@test.com", password: "incorrectpassword" })
    .expect(400);
});

it("response with cookie when success signin", async () => {
  await request(app)
    .post(API.SIGN_UP)
    .send({
      email: "email@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post(API.SIGN_IN)
    .send({
      email: "email@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
