import request from "supertest";
import { app } from "../../app";
import { API } from "./const";

it("response with details about current user info", async () => {
  const cookie = await getCookie();
  const response = await request(app)
    .get(API.CURRENT_USER)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("response with null if not authenticated", async () => {
  const response = await request(app).get(API.CURRENT_USER).send().expect(200);

  expect(response.body.currentUser).toEqual(null);
});
