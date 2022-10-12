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

const communityType = new GraphQLObjectType<ICommunity & { _id: string }, GraphQLContext>({
  name: 'Community',
  description: 'Community data',
  fields: () => ({
    id: globalIdField('Community'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: community => community.name,
    },
    title: {
      type: GraphQLString,
      resolve: community => community.title,
    },
    about: {
      type: GraphQLString,
      resolve: community => community.about,
    },
    owner: {
      type: UserType,
      resolve: (community, _, context) => UserLoader.load(context, community.owner),
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

export default communityType;

registerTypeLoader(communityType, load);

export const CommunityConnection = connectionDefinitions({
  name: 'community',
  nodeType: communityType,
});
