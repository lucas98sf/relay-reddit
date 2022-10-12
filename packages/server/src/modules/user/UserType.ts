import {
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '@/graphql/typeRegister';
import { GraphQLContext } from '@/graphql/types';

import * as PostLoader from '../post/PostLoader';
import { PostConnection } from '../post/PostType';

import { load } from './UserLoader';
import { IUser } from './UserModel';

const UserType = new GraphQLObjectType<IUser, GraphQLContext>({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    ...objectIdResolver,
    username: {
      type: GraphQLString,
      resolve: ({ username }) => username,
    },
    email: {
      type: GraphQLString,
      resolve: ({ email }) => email,
    },
    avatar: {
      type: GraphQLString,
      resolve: ({ avatar }) => avatar,
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
