import { GraphQLObjectType } from 'graphql';

import * as PostMutations from '@/modules/post/mutations';
import * as UserMutations from '@/modules/user/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
  }),
});

export default MutationType;
