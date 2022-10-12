import { FILTER_CONDITION_TYPE, getObjectId } from '@entria/graphql-mongo-helpers';
import { GraphQLID, GraphQLInputObjectType, GraphQLEnumType } from 'graphql';

export const voteFilterMapping = {
  user: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
  post: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
  comment: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const VoteFilterInputType = new GraphQLInputObjectType({
  name: 'voteFilter',
  description: 'Used to filter votes',
  fields: () => ({
    user: {
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
    post: {
      type: GraphQLID,
    },
    comment: {
      type: GraphQLID,
    },
  }),
});

export default VoteFilterInputType;
