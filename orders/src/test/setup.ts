import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection, Types } from "mongoose";
import { sign } from "jsonwebtoken";
import { Ticket } from "../models/ticket";

jest.mock("../nats-wrapper");

declare global {
  var getCookie: () => string[];
}

export const createTicket = async () => {
  const id = new Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    id: id,
    price: 20,
    title: "concert",
  });

  await ticket.save();
  return ticket;
};

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "roykacak";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
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

global.getCookie = () => {
  //Build a JWT payload {id, email}
  const payload = {
    id: new Types.ObjectId().toHexString(),
    email: "fake@test.com",
  };

  // Create the JWT
  const token = sign(payload, process.env.JWT_KEY!);
  // Build session object. {  jwt: MY_JWT }
  const session = { jwt: token };
  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //  Return a string that is the cookie with the encoded data
  return [`session=${base64}`];
};
