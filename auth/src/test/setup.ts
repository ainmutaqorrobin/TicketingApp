import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";
import { API } from "../routes/__test__/const";
import request from "supertest";
import { app } from "../app";

declare global {
  var getCookie: () => Promise<string[]>;
}
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "roykacak";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await connect(mongoUri, {});
});

beforeEach(async () => {
  if (connection.db) {
    const collections = await connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await connection.close();
});

global.getCookie = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post(API.SIGN_UP)
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  if (!cookie) throw new Error("Failed to get cookie from response");

  return cookie;
};
