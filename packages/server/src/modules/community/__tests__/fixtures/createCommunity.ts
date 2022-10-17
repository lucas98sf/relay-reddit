import { getObjectId } from '@entria/graphql-mongo-helpers';

import User from '../../../user/UserModel';
import Community, { ICommunity } from '../../CommunityModel';

export const communityCreateInput: Pick<ICommunity, 'name' | 'title' | 'about'> = {
  name: 'cats',
  title: 'We Love Cats!!',
  about: 'cats are the best',
};

export const createCommunity = async (ownerId: string, input = communityCreateInput) => {
  const ownerObjectId = getObjectId(ownerId);

  const community = new Community({ ...input, owner: ownerObjectId, members: [ownerObjectId] });

  await Promise.all([
    community.save(),
    User.findByIdAndUpdate(ownerObjectId, { $push: { communities: community._id } }),
  ]);

  return community;
};
