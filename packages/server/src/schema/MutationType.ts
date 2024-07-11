import { GraphQLObjectType } from "graphql";

import * as CommentMutations from "@/modules/comment/mutations";
import * as CommunityMutations from "@/modules/community/mutations";
import * as PostMutations from "@/modules/post/mutations";
import * as UserMutations from "@/modules/user/mutations";
import * as VoteMutations from "@/modules/vote/mutations";

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
    ...CommentMutations,
    ...CommunityMutations,
    ...VoteMutations,
  }),
});

export default MutationType;
