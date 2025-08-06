import request from "supertest";
import { app } from "../../app";
import { API } from "./const";

it("response with details about current user info", async () => {
  const authResponse = await request(app)
    .post(API.SIGN_UP)
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");

  if (!cookie) {
    throw new Error("Cookie not set after signup");
  }
  const response = await request(app)
    .get(API.CURRENT_USER)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
