import { List } from "@relay-reddit/ui";
import { useLazyLoadQuery } from "react-relay";

import { AllPostsQuery } from "@/__generated__/AllPostsQuery.graphql";

import { PostItem } from "./PostItem";
import { AllPosts } from "./queries/AllPosts";

export function PostList() {
  const data = useLazyLoadQuery<AllPostsQuery>(AllPosts, {});

  const posts = data.posts.edges.flatMap((edge) => (edge ? edge.node : []));

  return (
    <List bgGradient="linear-gradient(90deg, brand.700 40px, brand.800 40px)">
      {posts.map((post, index: number) => (
        <PostItem key={post?.id} isFirst={index === 0} isLast={index === posts.length - 1} post={post} />
      ))}
    </List>
  );
}
