import { Grid, GridItem } from "@chakra-ui/react";

import { CommunitiesSection } from "@/components/community/CommunitiesSection";
import { CreatePostButton } from "@/components/post/CreatePostButton";
import { PostList } from "@/components/post/PostList";

export function Home() {
  return (
    <Grid
      templateColumns={["4fr", "4fr", "3fr 1fr"]}
      templateRows="1fr auto"
      margin={["1px", "24px"]}
      columnGap="24px"
      rowGap="16px"
    >
      {/* TODO: <nav /> */}
      <GridItem gridArea="1 / 1 / 2 / 2" as="section">
        <CreatePostButton />
      </GridItem>
      <GridItem gridArea="2 / 1 / 3 / 2" as="main">
        <PostList />
      </GridItem>
      <GridItem gridArea={[null, null, "1 / 2 / 3 / 3"]} as="aside">
        <CommunitiesSection />
      </GridItem>
      {/* TODO: <footer /> */}
    </Grid>
  );
}
