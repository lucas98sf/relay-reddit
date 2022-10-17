import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';
import { GraphQLID, GraphQLEnumType } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '@/graphql/types';
import * as CommentLoader from '@/modules/comment/CommentLoader';
import CommentModel from '@/modules/comment/CommentModel';
import CommentType from '@/modules/comment/CommentType';
import * as PostLoader from '@/modules/post/PostLoader';
import PostModel from '@/modules/post/PostModel';
import PostType from '@/modules/post/PostType';

import VoteModel from '../VoteModel';

export const VoteCreate = mutationWithClientMutationId({
  name: 'VoteCreate',
  inputFields: {
    postId: {
      type: GraphQLID,
    },
    commentId: {
      type: GraphQLID,
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

    if (!postId && !commentId) {
      return {
        error: 'either postId or commentId are required',
      };
    }

    if (postId && commentId) {
      return {
        error: 'only one of postId or commentId are required',
      };
    }

    type ObjectId = typeof context.user._id;
    let voteTarget: { post: ObjectId } | { comment: ObjectId } | undefined;
    if (postId) {
      const post = await PostModel.findOne({
        _id: getObjectId(postId),
      });

      if (!post) {
        return {
          error: 'post not found',
        };
      }
      voteTarget = { post: post._id };
    } else if (commentId) {
      const comment = await CommentModel.findOne({
        _id: getObjectId(commentId),
      });

      if (!comment) {
        return {
          error: 'comment not found',
        };
      }
      voteTarget = { comment: comment._id };
    }

    const hasVoted = await VoteModel.findOne({
      ...voteTarget,
      user: context.user._id,
    });

    if (hasVoted) {
      if (hasVoted.type !== type) {
        await VoteModel.findByIdAndUpdate(hasVoted._id, {
          type,
        });
        return {
          id: hasVoted._id,
          ...voteTarget,
          success: `Vote updated to ${type}`,
        };
      }
      return {
        id: hasVoted._id,
        ...voteTarget,
        success: 'Already voted',
      };
    }

    const vote = await new VoteModel({
      ...voteTarget,
      type,
      author: context.user._id,
    }).save();

    return {
      id: vote._id,
      error: null,
      ...voteTarget,
      success: `${type} created`,
    };
  },
  outputFields: {
    comment: {
      type: CommentType,
      resolve: async ({ comment }, _, context) => CommentLoader.load(context, comment),
    },
    post: {
      type: PostType,
      resolve: async ({ post }, _, context) => PostLoader.load(context, post),
    },
    ...errorField,
    ...successField,
  },
});
