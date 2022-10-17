import Community, { ICommunity } from '../../CommunityModel';

export const communityCreateInput: Pick<ICommunity, 'name' | 'title' | 'about'> = {
  name: 'cats',
  title: 'We Love Cats!!',
  about: 'cats are the best',
};

export const createCommunity = async (ownerId: string, input = communityCreateInput) => {
  const community = await new Community({ ...input, owner: ownerId }).save();
  return community;
};
