import { createLoader } from "@entria/graphql-mongo-helpers";
import { Document } from "mongoose";

import { registerLoader } from "@/graphql/loaderRegister";

import { voteFilterMapping } from "./VoteFilterInputType";
import VoteModel from "./VoteModel";

const {
  Wrapper: Vote,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: VoteModel as typeof VoteModel & Document,
  loaderName: "VoteLoader",
  filterMapping: voteFilterMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Vote;

registerLoader("VoteLoader", getLoader);
