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

const CommentType = new GraphQLObjectType<IComment & { _id: string }, GraphQLContext>({
  name: 'Comment',
  description: 'Comment data',
  fields: () => ({
    id: globalIdField('Comment'),
    ...objectIdResolver,
    content: {
      type: GraphQLString,
      resolve: comment => comment.content,
    },
    votes: {
      type: new GraphQLNonNull(GraphQLInt),
      // ???
      resolve: comment => VoteModel.countVotes({ comment: comment._id }).then(votes => votes.total),
    },
    post: {
      type: PostType,
      resolve: (comment, _, context) => PostLoader.load(context, comment.post),
    },
    author: {
      type: UserType,
      resolve: (comment, _, context) => UserLoader.load(context, comment.author),
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
