import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLEmailAddress, GraphQLNonEmptyString } from 'graphql-scalars';

import * as UserLoader from '../UserLoader';
import User from '../UserModel';
import UserType from '../UserType';

import { generateToken } from '@/auth';
import { config } from '@/config';

export const UserLogin = mutationWithClientMutationId({
  name: 'UserLogin',
  inputFields: {
    email: {
      type: GraphQLEmailAddress,
    },
    password: {
      type: GraphQLNonEmptyString,
    },
  },
  mutateAndGetPayload: async ({ email, password }, context) => {
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    const defaultErrorMessage = 'Invalid credentials';

    if (!user) return { error: defaultErrorMessage };

    const correctPassword = user.authenticate(password);
    if (!correctPassword) return { error: defaultErrorMessage };

    const token = generateToken(user);
    context.setCookie(config.TOKEN_COOKIE, token);

    return {
      token: generateToken(user),
      id: user._id,
      success: 'Logged with success',
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
