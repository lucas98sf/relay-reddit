import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';
import { GraphQLID, GraphQLNonNull, GraphQLEnumType } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '@/graphql/types';
import * as CommentLoader from '@/modules/comment/CommentLoader';
import CommentType from '@/modules/comment/CommentType';
import * as PostLoader from '@/modules/post/PostLoader';
import PostModel from '@/modules/post/PostModel';
import PostType from '@/modules/post/PostType';

import VoteModel from '../VoteModel';

export const VoteCreate = mutationWithClientMutationId({
  name: 'VoteCreate',
  inputFields: {
    postId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    commentId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    type: {
      type: new GraphQLEnumType({
        name: 'VoteType',
        values: {
          UPVOTE: { value: 'UPVOTE' },
          DOWNVOTE: { value: 'DOWNVOTE' },
        },
      }),
    },
  },
  mutateAndGetPayload: async ({ postId, commentId, type }, context: GraphQLContext) => {
    // TODO: move this to a middleware
    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }

    const noIdError = {
      error: 'postId or commentId is required',
    };

    if (!postId && !commentId) {
      return noIdError;
    }

    let idQuery: { post: string } | { comment: string } | null = null;
    if (postId) {
      const post = await PostModel.findOne({
        _id: getObjectId(postId),
      });

      if (!post) {
        return {
          error: 'post not found',
        };
      }
      idQuery = { post: post._id };
    } else if (commentId) {
      const comment = await PostModel.findOne({
        _id: getObjectId(commentId),
      });

      if (!comment) {
        return {
          error: 'comment not found',
        };
      }
      idQuery = { comment: comment._id };
    }

    if (!idQuery) {
      return noIdError;
    }

    const hasLiked = await VoteModel.findOne({
      ...idQuery,
      user: context.user._id,
    });

    if (hasLiked) {
      return {
        id: Object.values(idQuery)[0],
        success: 'Already liked',
      };
    }

    const vote = await new VoteModel({
      ...idQuery,
      type,
      author: context.user._id,
    }).save();

    return {
      id: vote._id,
      error: null,
    };
  },
  outputFields: {
    comment: {
      type: CommentType,
      resolve: async ({ id }, _, context) => CommentLoader.load(context, id),
    },
    post: {
      type: PostType,
      resolve: async ({ id }, _, context) => PostLoader.load(context, id),
    },
    ...errorField,
    ...successField,
  },
});
