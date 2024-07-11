import { createLoader } from "@entria/graphql-mongo-helpers";
import { Document } from "mongoose";

import { registerLoader } from "@/graphql/loaderRegister";

import PostModel from "./PostModel";

const {
  Wrapper: Post,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: PostModel as typeof PostModel & Document,
  loaderName: "PostLoader",
});

export { getLoader, clearCache, load, loadAll };
export default Post;

registerLoader("PostLoader", getLoader);
