import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from '@entria/graphql-mongo-helpers';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs, globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '@/graphql/typeRegister';
import { GraphQLContext } from '@/graphql/types';

import * as PostLoader from '../post/PostLoader';
import { PostConnection } from '../post/PostType';
import * as UserLoader from '../user/UserLoader';
import UserType from '../user/UserType';

import { load } from './CommunityLoader';
import { ICommunity } from './CommunityModel';

const CommunityType = new GraphQLObjectType<ICommunity, GraphQLContext>({
  name: 'Community',
  description: 'Community data',
  fields: () => ({
    id: globalIdField('Community'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name,
    },
    title: {
      type: GraphQLString,
      resolve: ({ title }) => title,
    },
    about: {
      type: GraphQLString,
      resolve: ({ about }) => about,
    },
    owner: {
      type: UserType,
      resolve: ({ owner }, _, context) => UserLoader.load(context, owner),
    },
    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (community, args, context) =>
        PostLoader.loadAll(
          context,
          withFilter(args, {
            community: community._id,
          })
        ),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default CommunityType;

registerTypeLoader(CommunityType, load);

export const CommunityConnection = connectionDefinitions({
  name: 'Community',
  nodeType: CommunityType,
});
