import { createLoader } from "@entria/graphql-mongo-helpers";
import { Document } from "mongoose";

import { registerLoader } from "@/graphql/loaderRegister";

import CommunityModel from "./CommunityModel";

const {
  Wrapper: Community,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: CommunityModel as typeof CommunityModel & Document,
  loaderName: "CommunityLoader",
});

export { getLoader, clearCache, load, loadAll };
export default Community;

registerLoader("CommunityLoader", getLoader);
