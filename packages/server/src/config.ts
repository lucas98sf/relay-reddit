/* eslint-disable @typescript-eslint/no-non-null-assertion */
import path from "path";

import dotenvSafe from "dotenv-safe";

const root = path.join.bind(process.cwd());

if (process.env.NODE_ENV !== "test") {
  dotenvSafe.config({
    path: root(".env"),
    sample: root(".env.example"),
  });
}

const ENV = process.env;

export const config = {
  DATABASE_URL: ENV.DATABASE_URL!,
  PORT: ENV.PORT!,
  JWT_SECRET_KEY: ENV.JWT_SECRET_KEY!,
  TOKEN_COOKIE: ENV.TOKEN_COOKIE!,
};
