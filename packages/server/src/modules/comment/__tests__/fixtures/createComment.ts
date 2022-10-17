import { getObjectId } from '@entria/graphql-mongo-helpers';

import Comment, { IComment } from '../../CommentModel';

export const commentCreateInput: Pick<IComment, 'content'> = {
  content: 'This is a comment',
};

export const createComment = async (
  authorId: string,
  postId: string,
  input = commentCreateInput
) => {
  const comment = await new Comment({
    author: getObjectId(authorId),
    post: getObjectId(postId),
    ...input,
  }).save();

  return comment;
};
