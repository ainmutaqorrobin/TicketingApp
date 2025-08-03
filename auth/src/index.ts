import mongoose from "mongoose";
import { app } from "./app";

const MONGO_SERVICE = "auth-mongo-service:27017";
const DATABASE_NAME = "auth";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is not defined");

  try {
    await mongoose.connect(`mongodb://${MONGO_SERVICE}/${DATABASE_NAME}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("listening auth services on port 3000");
  });
};

start();
