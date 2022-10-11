import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { URLResolver as GraphQLURL } from 'graphql-scalars';

import * as PostLoader from '../PostLoader';
import PostModel from '../PostModel';
import { PostConnection } from '../PostType';

import { GraphQLStringWithLength } from '@/graphql/customScalars';
import { GraphQLContext } from '@/graphql/types';

export const PostCreate = mutationWithClientMutationId({
  name: 'PostCreate',
  inputFields: {
    title: {
      type: GraphQLStringWithLength('Title'),
    },
    content: {
      type: GraphQLStringWithLength('Content', 0, 9999),
    },
    image: {
      type: GraphQLURL,
    },
    url: {
      type: GraphQLURL,
    },
  },
  mutateAndGetPayload: async ({ title, content }, context: GraphQLContext) => {
    // TODO: move this to a middleware
    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }

    const post = await new PostModel({
      title,
      content,
      author: context.user._id,
    }).save();

    return {
      id: post._id,
      error: null,
    };
  },
  outputFields: {
    postEdge: {
      type: PostConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const post = await PostLoader.load(context, id);

        if (!post) {
          return null;
        }

        return {
          cursor: toGlobalId('Post', post._id),
          node: post,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});
