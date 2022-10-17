import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GraphQLStringWithLength } from '@/graphql/customScalars';
import { GraphQLContext } from '@/graphql/types';
import * as PostLoader from '@/modules/post/PostLoader';
import Post from '@/modules/post/PostModel';
import PostType from '@/modules/post/PostType';

import * as CommentLoader from '../CommentLoader';
import Comment from '../CommentModel';
import { CommentConnection } from '../CommentType';

export const CommentCreate = mutationWithClientMutationId({
  name: 'CommentCreate',
  inputFields: {
    postId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    content: {
      type: GraphQLStringWithLength('CommentContent', 1, 9999),
    },
  },
  mutateAndGetPayload: async ({ postId, content }, context: GraphQLContext) => {
    // TODO: move this to a middleware
    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }

    const post = await Post.findOne({
      _id: getObjectId(postId),
    });

    if (!post) {
      return {
        error: 'post not found',
      };
    }

    const comment = await new Comment({
      content,
      post: post._id,
      author: context.user._id,
    }).save();

    return {
      id: comment._id,
      success: 'Comment created',
    };
  },
  outputFields: {
    commentEdge: {
      type: CommentConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const comment = await CommentLoader.load(context, id);

        if (!comment) {
          return null;
        }

        return {
          cursor: toGlobalId('Comment', comment._id),
          node: comment,
        };
      },
    },
    post: {
      type: PostType,
      resolve: async ({ post }, _, context) => PostLoader.load(context, post),
    },
    ...errorField,
    ...successField,
  },
});
