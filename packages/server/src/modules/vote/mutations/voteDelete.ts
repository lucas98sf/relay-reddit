import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';
import { GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '@/graphql/types';

import VoteModel from '../VoteModel';

export const VoteDelete = mutationWithClientMutationId({
  name: 'VoteDelete',
  // TODO: should be by postid or commentid
  inputFields: {
    voteId: {
      type: GraphQLID,
    },
  },
  mutateAndGetPayload: async ({ voteId }, context: GraphQLContext) => {
    // TODO: move this to a middleware
    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }

    const vote = await VoteModel.findOneAndDelete({
      _id: getObjectId(voteId),
    });

    if (!vote) {
      return {
        error: 'vote not found',
      };
    }

    return {
      id: vote._id,
      success: 'Vote deleted',
    };
  },
  outputFields: {
    ...errorField,
    ...successField,
  },
});
