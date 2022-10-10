import { List } from '@relay-app/ui';
// import { VStack } from '@chakra-ui/react';

import { PostItem } from './PostItem';

type PostListProps = {
  posts: any[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <List bgGradient="linear-gradient(90deg, brand.700 40px, brand.800 40px)">
      {posts.map((post: any, index: number) => (
        <PostItem
          key={post.id}
          isFirst={index === 0}
          isLast={index === posts.length - 1}
          post={post}
        />
      ))}
    </List>
  );
}
