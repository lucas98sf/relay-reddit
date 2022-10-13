import {
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from '@entria/graphql-mongo-helpers';
import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '@/graphql/typeRegister';
import { GraphQLContext } from '@/graphql/types';

import * as CommentLoader from '../comment/CommentLoader';
import { CommentConnection } from '../comment/CommentType';
import * as CommunityLoader from '../community/CommunityLoader';
import CommunityType from '../community/CommunityType';
import * as UserLoader from '../user/UserLoader';
import UserType from '../user/UserType';
import VoteModel from '../vote/VoteModel';

import { load } from './PostLoader';
import { IPost } from './PostModel';

const PostType = new GraphQLObjectType<IPost, GraphQLContext>({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: globalIdField('Post'),
    ...objectIdResolver,
    title: {
      type: GraphQLString,
      resolve: ({ title }) => title,
    },
    content: {
      type: GraphQLString,
      resolve: ({ content }) => content,
    },
    image: {
      type: GraphQLString,
      resolve: ({ image }) => image,
    },
    url: {
      type: GraphQLString,
      resolve: ({ url }) => url,
    },
    community: {
      type: CommunityType,
      resolve: ({ community }, _, context) => CommunityLoader.load(context, community),
    },
    author: {
      type: UserType,
      resolve: ({ author }, _, context) => UserLoader.load(context, author),
    },
    votesCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async ({ _id }) => (await VoteModel.countVotes({ post: _id }))?.total,
      description: 'Total votes count (upvotes - downvotes)',
    },
    comments: {
      type: new GraphQLNonNull(CommentConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (post, args, context) =>
        CommentLoader.loadAll(
          context,
          withFilter(args, {
            post: post._id,
          })
        ),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default PostType;

registerTypeLoader(PostType, load);

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});
