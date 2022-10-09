import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import * as UserLoader from '../user/UserLoader';
// eslint-disable-next-line import/no-cycle
import UserType from '../user/UserType';

import { load } from './PostLoader';
import { IPost } from './PostModel';

import { nodeInterface, registerTypeLoader } from '@/graphql/typeRegister';
import { GraphQLContext } from '@/graphql/types';

const PostType = new GraphQLObjectType<IPost & { _id: string }, GraphQLContext>({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: globalIdField('Post'),
    ...objectIdResolver,
    title: {
      type: GraphQLString,
      resolve: post => post.title,
    },
    content: {
      type: GraphQLString,
      resolve: post => post.content,
    },
    image: {
      type: GraphQLString,
      resolve: post => post.image,
    },
    author: {
      type: UserType,
      resolve: (post, _, context) => UserLoader.load(context, post.author),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default PostType;

registerTypeLoader(PostType, load);

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});
