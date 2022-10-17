import Comment, { IComment } from '../../CommentModel';

export const commentCreateInput: Pick<IComment, 'content'> = {
  content: 'This is a comment',
};

export const createComment = async (
  authorId: string,
  postId: string,
  input = commentCreateInput
) => {
  const comment = await new Comment({ author: authorId, post: postId, ...input }).save();
  return comment;
};
