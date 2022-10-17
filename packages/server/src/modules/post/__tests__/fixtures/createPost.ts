import Post, { IPost } from '../../PostModel';

export const postCreateInput: Pick<IPost, 'content' | 'image' | 'title' | 'url'> = {
  title: 'Some random post about cats',
  content: 'cats',
  image:
    'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
  url: 'https://en.wikipedia.org/wiki/Cat',
};

export const createPost = async (
  authorId: string,
  communityId: string,
  input = postCreateInput
) => {
  const post = await new Post({ author: authorId, community: communityId, ...input }).save();
  return post;
};
