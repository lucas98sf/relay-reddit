import { errorField, successField } from "@entria/graphql-mongo-helpers";
import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLNonEmptyString } from "graphql-scalars";

import { generateToken } from "@/auth";
import { config } from "@/config";

import * as UserLoader from "../UserLoader";
import User from "../UserModel";
import UserType from "../UserType";

export const UserLogin = mutationWithClientMutationId({
  name: "UserLogin",
  inputFields: {
    username: {
      type: GraphQLNonEmptyString,
    },
    password: {
      type: GraphQLNonEmptyString,
    },
  },
  mutateAndGetPayload: async ({ username, password }, context) => {
    const caseInsensitiveUsername = new RegExp(username.trim(), "i");
    const user = await User.findOne({ username: caseInsensitiveUsername });

    const defaultErrorMessage = "invalid credentials";

    if (!user) return { error: defaultErrorMessage };

    const correctPassword = user.authenticate(password);
    if (!correctPassword) return { error: defaultErrorMessage };

    const token = generateToken(user);
    context.setCookie(config.TOKEN_COOKIE, token);

    return {
      token: generateToken(user),
      id: user._id,
      success: "Logged with success",
    };
  },
  outputFields: {
    token: {
      type: GraphQLNonEmptyString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: async ({ id }, _, context) => UserLoader.load(context, id),
    },
    ...errorField,
    ...successField,
  },
});
