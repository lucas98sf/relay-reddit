import { getObjectId } from '@entria/graphql-mongo-helpers';

import Vote, { IVote } from '../../VoteModel';

export const createVote = async (
  authorId: string,
  type: IVote['type'],
  id: { post?: string; comment?: string }
) => {
  const objectId = {
    post: id.post ? getObjectId(id.post) : undefined,
    comment: id.comment ? getObjectId(id.comment) : undefined,
  };

  const vote = await new Vote({ author: getObjectId(authorId), type, ...objectId }).save();
  return vote;
};
