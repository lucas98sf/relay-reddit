import Vote, { IVote } from '../../VoteModel';

export const createVote = async (
  authorId: string,
  type: IVote['type'],
  id: { post?: string; comment?: string }
) => {
  const vote = await new Vote({ author: authorId, type, ...id }).save();
  return vote;
};
