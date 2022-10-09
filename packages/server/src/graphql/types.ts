import mongoose from 'mongoose';

import { DataLoaders } from './loaderRegister';

import { IUser } from '@/modules/user/UserModel';

declare type ObjectId = mongoose.Schema.Types.ObjectId;

export type GraphQLContext = {
  user?: IUser;
  dataloaders: DataLoaders;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoaderFn = (ctx: GraphQLContext, id: string | ObjectId | object) => any;
