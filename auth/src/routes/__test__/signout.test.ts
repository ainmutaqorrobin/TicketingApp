import request from "supertest";
import { app } from "../../app";
import { API } from "./const";

it("clear the cookie after signout", async () => {
  await request(app)
    .post(API.SIGN_UP)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app).post(API.SIGN_OUT).send({}).expect(200);

  const cookie = response.get("Set-Cookie");
  if (!cookie) {
    throw new Error("Expected cookie but got undefined.");
  }

  expect(cookie[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
