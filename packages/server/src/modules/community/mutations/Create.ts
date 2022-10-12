import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GraphQLStringWithLength, GraphQLUsername } from '@/graphql/customScalars';
import { GraphQLContext } from '@/graphql/types';

import * as CommunityLoader from '../CommunityLoader';
import CommunityModel from '../CommunityModel';
import { CommunityConnection } from '../CommunityType';

export const CommunityCreate = mutationWithClientMutationId({
  name: 'CommunityCreate',
  inputFields: {
    name: {
      type: GraphQLUsername,
    },
    title: {
      type: GraphQLStringWithLength('CommunityTitle', 1, 50),
    },
    about: {
      type: GraphQLStringWithLength('CommunityAbout', 1, 300),
    },
  },
  mutateAndGetPayload: async ({ name, title, about }, context: GraphQLContext) => {
    // TODO: move this to a middleware
    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }

    const Community = await new CommunityModel({
      name,
      title,
      about,
      owner: context.user._id,
    }).save();

    return {
      id: Community._id,
      error: null,
    };
  },
  outputFields: {
    CommunityEdge: {
      type: CommunityConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const Community = await CommunityLoader.load(context, id);

        if (!Community) {
          return null;
        }

        return {
          cursor: toGlobalId('Community', Community._id),
          node: Community,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});
