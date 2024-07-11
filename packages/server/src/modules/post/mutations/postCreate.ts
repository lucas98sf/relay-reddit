import { errorField, getObjectId, successField } from "@entria/graphql-mongo-helpers";
import { GraphQLID, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { URLResolver as GraphQLURL } from "graphql-scalars";

import { GraphQLStringWithLength } from "@/graphql/customScalars";
import { GraphQLContext } from "@/graphql/types";
import Community from "@/modules/community/CommunityModel";

import * as PostLoader from "../PostLoader";
import Post from "../PostModel";
import { PostConnection } from "../PostType";

export const PostCreate = mutationWithClientMutationId({
  name: "PostCreate",
  inputFields: {
    title: {
      type: GraphQLStringWithLength("PostTitle"),
    },
    content: {
      type: GraphQLStringWithLength("PostContent", 0, 9999),
    },
    image: {
      type: GraphQLURL,
    },
    url: {
      type: GraphQLURL,
    },
    communityId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ communityId, title, content, image, url }, context: GraphQLContext) => {
    // TODO: move this to a middleware
    if (!context.user) {
      return {
        error: "user not logged",
      };
    }

    const community = await Community.findOne({
      _id: getObjectId(communityId),
    });

    if (!community) {
      return {
        error: "community not found",
      };
    }

    const post = await new Post({
      title,
      content,
      image,
      url,
      author: context.user._id,
      community: community._id,
    }).save();

    return {
      id: post._id,
      success: "Post created",
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
          cursor: toGlobalId("Post", post._id),
          node: post,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});
