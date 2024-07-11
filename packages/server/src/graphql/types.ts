import mongoose from "mongoose";

import { IUser } from "@/modules/user/UserModel";

import { DataLoaders } from "./loaderRegister";

declare type ObjectId = mongoose.Schema.Types.ObjectId;

export type GraphQLContext = {
  user?: IUser;
  dataloaders: DataLoaders;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoaderFn = (ctx: GraphQLContext, id: string | ObjectId | object) => any;
