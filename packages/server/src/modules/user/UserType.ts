import {
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import * as PostLoader from '../post/PostLoader';
// eslint-disable-next-line import/no-cycle
import { PostConnection } from '../post/PostType';

import { load } from './UserLoader';
import { IUser } from './UserModel';

import { nodeInterface, registerTypeLoader } from '@/graphql/typeRegister';
import { GraphQLContext } from '@/graphql/types';

const UserType = new GraphQLObjectType<IUser & { _id: string }, GraphQLContext>({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (user, args, context) =>
        PostLoader.loadAll(
          context,
          withFilter(args, {
            author: user._id,
          })
        ),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;

registerTypeLoader(UserType, load);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
