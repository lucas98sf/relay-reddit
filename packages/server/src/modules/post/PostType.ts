import {
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from '@entria/graphql-mongo-helpers';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '@/graphql/typeRegister';
import { GraphQLContext } from '@/graphql/types';

import * as CommentLoader from '../comment/CommentLoader';
import { CommentConnection } from '../comment/CommentType';
import * as CommunityLoader from '../community/CommunityLoader';
import CommunityType from '../community/CommunityType';
import * as UserLoader from '../user/UserLoader';
import UserType from '../user/UserType';

import { load } from './PostLoader';
import { IPost } from './PostModel';

const PostType = new GraphQLObjectType<IPost & { _id: string }, GraphQLContext>({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: globalIdField('Post'),
    ...objectIdResolver,
    title: {
      type: GraphQLString,
      resolve: post => post.title,
    },
    content: {
      type: GraphQLString,
      resolve: post => post.content,
    },
    image: {
      type: GraphQLString,
      resolve: post => post.image,
    },
    url: {
      type: GraphQLString,
      resolve: post => post.url,
    },
    community: {
      type: CommunityType,
      resolve: (post, _, context) => CommunityLoader.load(context, post.community),
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
    author: {
      type: UserType,
      resolve: (post, _, context) => UserLoader.load(context, post.author),
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
