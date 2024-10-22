import {
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from "@entria/graphql-mongo-helpers";
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { globalIdField } from "graphql-relay";

import { nodeInterface, registerTypeLoader } from "@/graphql/typeRegister";
import { GraphQLContext } from "@/graphql/types";
import * as CommunityLoader from "@/modules/community/CommunityLoader";

import * as CommentLoader from "../comment/CommentLoader";
import { CommentConnection } from "../comment/CommentType";
import { CommunityConnection } from "../community/CommunityType";
import * as PostLoader from "../post/PostLoader";
import { PostConnection } from "../post/PostType";

import { load } from "./UserLoader";
import { IUser } from "./UserModel";

const UserType = new GraphQLObjectType<IUser, GraphQLContext>({
  name: "User",
  description: "User data",
  fields: () => ({
    id: globalIdField("User"),
    ...objectIdResolver,
    username: {
      type: GraphQLString,
      resolve: ({ username }) => username,
    },
    email: {
      type: GraphQLString,
      resolve: ({ email }) => email,
    },
    avatar: {
      type: GraphQLString,
      resolve: ({ avatar }) => avatar,
    },
    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (user, args, context) =>
        PostLoader.loadAll(
          context,
          withFilter(args, {
            author: user._id,
          })
        ),
    },
    comments: {
      type: new GraphQLNonNull(CommentConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (user, args, context) =>
        CommentLoader.loadAll(
          context,
          withFilter(args, {
            author: user._id,
          })
        ),
    },
    communities: {
      type: new GraphQLNonNull(CommunityConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (user, args, context) =>
        CommunityLoader.loadAll(
          context,
          withFilter(args, {
            members: user._id,
          })
        ),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;

registerTypeLoader(UserType, load);

export const UserConnection = connectionDefinitions({
  name: "User",
  nodeType: UserType,
});
