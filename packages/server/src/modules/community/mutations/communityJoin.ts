import { errorField, getObjectId, successField } from "@entria/graphql-mongo-helpers";
import { GraphQLID, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";

import { GraphQLContext } from "@/graphql/types";

import User from "../../user/UserModel";
import * as CommunityLoader from "../CommunityLoader";
import Community from "../CommunityModel";
import { CommunityConnection } from "../CommunityType";

export const CommunityJoin = mutationWithClientMutationId({
  name: "CommunityJoin",
  inputFields: {
    communityId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ communityId }, context: GraphQLContext) => {
    // TODO: move this to a middleware
    if (!context.user) {
      return {
        error: "user not logged",
      };
    }

    const community = await Community.findOne({ _id: getObjectId(communityId) });

    if (!community) {
      return {
        error: "community not found",
      };
    }

    if (community.members.includes(context.user._id)) {
      return {
        error: "already joined this community",
      };
    }

    await Promise.all([
      Community.findByIdAndUpdate(community._id, {
        $push: { members: context.user._id },
      }),
      User.findByIdAndUpdate(context.user._id, { $push: { communities: community._id } }),
    ]);

    return {
      id: community._id,
      success: "Community joined",
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
          cursor: toGlobalId("Community", community._id),
          node: community,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});
