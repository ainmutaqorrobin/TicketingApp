import request from "supertest";
import { app } from "../../app";
import { API } from "../const";
import { Types } from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new Types.ObjectId().toHexString();
  await request(app).get(`${API}/${id}`).send().expect(404);
});
