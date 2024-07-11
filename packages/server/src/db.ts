import { connect, connection, ConnectOptions } from "mongoose";

export const connectToDatabase = async (mongoUri: string): Promise<void> => {
  connection
    /* eslint-disable */
    .once("open", () => console.log("Connected to MongoDB!"))
    .on("error", (err) => console.log("[MongoDB Error]: ", err))
    .on("close", () => console.log("Connection to MongoDB closed!"));
  /* eslint-enable */

  await connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
};
