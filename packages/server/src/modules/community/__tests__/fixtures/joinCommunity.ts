import { getObjectId } from "@entria/graphql-mongo-helpers";

import User from "../../../user/UserModel";
import Community from "../../CommunityModel";

export const joinCommunity = async (joinerId: string, communityId: string) => {
  const joinerObjectId = getObjectId(joinerId);
  const communityObjectId = getObjectId(communityId);

  return Promise.all([
    Community.findByIdAndUpdate(communityObjectId, { $push: { members: joinerObjectId } }),
    User.findByIdAndUpdate(joinerObjectId, { $push: { communities: communityObjectId } }),
  ]);
};
