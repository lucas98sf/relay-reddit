import { createServer } from "http";

import app from "./app";
import { config } from "./config";
import { connectToDatabase } from "./db";

(async () => {
  await connectToDatabase(config.DATABASE_URL);

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
})();
