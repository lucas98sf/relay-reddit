import { createLoader } from "@entria/graphql-mongo-helpers";
import { Document } from "mongoose";

import { registerLoader } from "@/graphql/loaderRegister";

import UserModel from "./UserModel";

const {
  Wrapper: User,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: UserModel as typeof UserModel & Document,
  loaderName: "UserLoader",
});

export { getLoader, clearCache, load, loadAll };
export default User;

registerLoader("UserLoader", getLoader);
