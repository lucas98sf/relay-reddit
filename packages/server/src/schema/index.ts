// import { GraphQLSchema } from "graphql";

// import MutationType from "./MutationType";
// import QueryType from "./QueryType";
// // import SubscriptionType from './SubscriptionType';

// export const schema = new GraphQLSchema({
//   query: QueryType,
//   mutation: MutationType,
//   // subscription: SubscriptionType,
// });
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import RelayPlugin from "@pothos/plugin-relay";
import ZodPlugin from "@pothos/plugin-zod";
import { PrismaClient } from "@prisma/client";
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode

const prisma = new PrismaClient({});

const builder = new SchemaBuilder<{
  Context: { user: { id: string; isAdmin: boolean } };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin, RelayPlugin, ZodPlugin],
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: false,
    // use where clause from prismaRelatedConnection for totalCount (defaults to true)
    filterConnectionTotalCount: true,
    // warn when not using a query parameter correctly
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
  relay: {},
});

builder.prismaNode("User", {
  id: { field: "id" },
  fields: (t) => ({
    username: t.exposeString("username"),
    email: t.exposeString("email"),
    avatar: t.exposeString("avatar"),
    posts: t.relation("posts"),
    communities: t.relation("memberOfCommunities"),
    ownedCommunities: t.relation("ownedCommunities"),
  }),
});

builder.prismaNode("Community", {
  id: { field: "id" },
  fields: (t) => ({
    title: t.exposeString("title"),
    name: t.exposeString("name"),
    about: t.exposeString("about"),
  }),
});

builder.prismaNode("Post", {
  id: { field: "id" },
  fields: (t) => ({
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    image: t.exposeString("image"),
    url: t.exposeString("url"),
    comments: t.relation("comments"),
  }),
});

builder.prismaNode("Comment", {
  id: { field: "id" },
  fields: (t) => ({
    title: t.exposeString("content"),
    votes: t.relation("votes"),
  }),
});

builder.prismaNode("Vote", {
  id: { field: "id" },
});

builder.queryType({
  fields: (t) => ({
    me: t.prismaField({
      type: "User",
      resolve: async (query, _root, _args, ctx) =>
        prisma.user.findUnique({
          ...query,
          where: { id: ctx.user?.id },
        }),
    }),
    posts: t.prismaConnection(
      {
        type: "Post",
        cursor: "id",
        resolve: (query) => prisma.post.findMany({ ...query }),
      },
      {}, // optional options for the Connection type
      {} // optional options for the Edge type),
    ),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createPost: t.prismaField({
      type: "Post",
      args: {
        title: t.arg.string({
          validate: {
            minLength: 5,
            maxLength: 100,
          },
        }),
        content: t.arg.string({
          validate: {
            maxLength: 1000,
          },
        }),
        image: t.arg.string({
          validate: {
            url: true,
          },
        }),
        url: t.arg.string({
          validate: {
            url: true,
          },
        }),
        communityId: t.arg.string(),
      },
      resolve: async (query, _root, args, ctx) =>
        prisma.post.create({
          ...query,
          data: {
            ...(args as any),
            authorId: ctx.user.id,
          },
        }),
    }),
  }),
});

export const schema = builder.toSchema();
