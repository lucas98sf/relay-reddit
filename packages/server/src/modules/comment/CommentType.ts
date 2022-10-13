import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';
import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '@/graphql/typeRegister';
import { GraphQLContext } from '@/graphql/types';

import * as PostLoader from '../post/PostLoader';
import PostType from '../post/PostType';
import * as UserLoader from '../user/UserLoader';
import UserType from '../user/UserType';
import VoteModel from '../vote/VoteModel';

import { load } from './CommentLoader';
import { IComment } from './CommentModel';

const CommentType = new GraphQLObjectType<IComment, GraphQLContext>({
  name: 'Comment',
  description: 'Comment data',
  fields: () => ({
    id: globalIdField('Comment'),
    ...objectIdResolver,
    content: {
      type: GraphQLString,
      resolve: ({ content }) => content,
    },
    post: {
      type: PostType,
      resolve: ({ post }, _, context) => PostLoader.load(context, post),
    },
    author: {
      type: UserType,
      resolve: ({ author }, _, context) => UserLoader.load(context, author),
    },
    votesCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async ({ _id }) => (await VoteModel.countVotes({ comment: _id }))?.total,
      description: 'Total votes count (upvotes - downvotes)',
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default CommentType;

registerTypeLoader(CommentType, load);

export const CommentConnection = connectionDefinitions({
  name: 'Comment',
  nodeType: CommentType,
});
