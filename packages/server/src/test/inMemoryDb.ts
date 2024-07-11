/* eslint-disable no-console */
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection } from "mongoose";

let mongoServer: MongoMemoryServer;
let connection: Connection;

export const createInMemoryMongoDB = async () => {
  mongoServer = await MongoMemoryServer.create();

  connection = (await mongoose.connect(mongoServer.getUri())).connection;

  connection.on("error", (err) => console.log("[In-Memory MongoDB Error]: ", err));
  // .once('open', () => console.log('Connected to In-Memory MongoDB!'))
  // .on('close', () => console.log('Connection to In-Memory MongoDB closed!'))
};

export const clearInMemoryMongoDB = async () => {
  await connection.dropDatabase();
  // console.log('Dropped In-Memory MongoDB Database!');
};

export const closeInMemoryMongoDB = async () => {
  await connection.destroy();
  await mongoServer.stop();
};
