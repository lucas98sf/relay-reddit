import { List } from '@relay-app/ui';
import { graphql, useLazyLoadQuery } from 'react-relay';

import { PostItem } from './PostItem';
import { PostListQuery } from './__generated__/PostListQuery.graphql';

export function PostList() {
  const data = useLazyLoadQuery<PostListQuery>(
    graphql`
      query PostListQuery {
        posts {
          totalCount
          edges {
            node {
              id
              title
              content
              image
              createdAt
              updatedAt
              author {
                id
              }
            }
          }
        }
      }
    `,
    {}
  );

  const posts = data.posts.edges.flatMap(edge => (edge ? edge.node : []));

  return (
    <List bgGradient="linear-gradient(90deg, brand.700 40px, brand.800 40px)">
      {posts.map((post, index: number) => (
        <PostItem
          key={post?.id}
          isFirst={index === 0}
          isLast={index === posts.length - 1}
          post={post}
        />
      ))}
    </List>
  );
}
