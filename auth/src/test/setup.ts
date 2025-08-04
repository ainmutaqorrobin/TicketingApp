import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";

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
