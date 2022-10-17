import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GraphQLStringWithLength, GraphQLUsername } from '@/graphql/customScalars';
import { GraphQLContext } from '@/graphql/types';

import * as CommunityLoader from '../CommunityLoader';
import Community from '../CommunityModel';
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

    const hasCommunityName =
      (await Community.countDocuments({ name: new RegExp(name.trim(), 'i') })) > 0;
    if (hasCommunityName) return { error: 'community name already in use' };

    const community = await new Community({
      name,
      title,
      about,
      owner: context.user._id,
    }).save();

    return {
      id: community._id,
      success: 'Community created',
    };
  },
  outputFields: {
    communityEdge: {
      type: CommunityConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const community = await CommunityLoader.load(context, id);

        if (!community) {
          return null;
        }

        return {
          cursor: toGlobalId('Community', community._id),
          node: community,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});
