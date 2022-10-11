import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLEmailAddress, GraphQLNonEmptyString, GraphQLURL } from 'graphql-scalars';

import * as UserLoader from '../UserLoader';
import User from '../UserModel';
import UserType from '../UserType';

import { generateToken } from '@/auth';
import { config } from '@/config';
import { GraphQLPassword, GraphQLUsername } from '@/graphql/customScalars';

export const UserRegister = mutationWithClientMutationId({
  name: 'UserRegister',
  inputFields: {
    username: {
      type: GraphQLUsername,
    },
    email: {
      type: GraphQLEmailAddress,
    },
    password: {
      type: GraphQLPassword,
    },
    avatar: {
      type: GraphQLURL,
    },
  },
  mutateAndGetPayload: async ({ username, email, password, avatar }, context) => {
    const hasUser = (await User.countDocuments({ email: email.trim().toLowerCase() })) > 0;
    // console.log({ username, email, password }, hasUser);
    if (hasUser) return { error: 'Email already in use' };

    const user = await new User({
      username,
      email,
      password,
      avatar,
    }).save();

    const token = generateToken(user);

    context.setCookie(config.TOKEN_COOKIE, token);

    return {
      token,
      id: user._id,
      success: 'User registered',
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
