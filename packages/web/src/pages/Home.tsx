import { Grid, GridItem } from '@chakra-ui/react';

import { Communities } from '@/components/Communities';
import { PostList } from '@/components/posts/PostList';
import { CreatePostButton } from '@/components/posts/createPost/Button';

const posts = [
  {
    id: 1,
    title: 'eu gosto de banana',
    community: 'banana',
    thumbnail:
      'https://previews.123rf.com/images/gestionetotale2/gestionetotale21409/gestionetotale2140900272/32079423-i-love-banana.jpg',
    votes: 92,
    author: 'bananalover',
    createdAt: new Date('2021-07-01T00:00:00.000Z'),
  },
  {
    id: 2,
    title: 'eu ODEIO banana',
    community: 'banana',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ERmJ5hQ9S_kgCHnogzbWL-ntxYbq-lgPuKdsjCV34f8QtRSkWk_-KeDvUsRLwoXVnlQ&usqp=CAU',
    votes: -49,
    author: 'bananahater',
    createdAt: new Date('2022-09-10T00:00:00.000Z'),
  },
  {
    id: 3,
    title: 'eu gosto de cachorros',
    community: 'cachorros',
    thumbnail:
      'https://www.washingtonpost.com/resizer/uwlkeOwC_3JqSUXeH8ZP81cHx3I=/arc-anglerfish-washpost-prod-washpost/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg',
    votes: 2500,
    author: 'doglover',
    createdAt: new Date('2019-07-01T00:00:00.000Z'),
  },
  {
    id: 4,
    title: 'gatos > cachorros',
    community: 'gatos',
    thumbnail:
      'https://www.thesprucepets.com/thmb/SGUow1jS5efhv8Blo6P9CIs6aDY=/640x640/filters:no_upscale():max_bytes(150000):strip_icc()/39148843_1129848570496560_1413993569890336768_n-5b81fddd46e0fb002c27d43a.jpg',
    votes: 1237,
    author: 'catlover',
    createdAt: new Date('2022-10-10T14:44:00.000Z'),
  },
];

export function Home() {
  return (
    <Grid
      templateColumns={['4fr', '4fr', '3fr 1fr']}
      templateRows="1fr auto"
      margin={['1px', '24px']}
      columnGap="24px"
      rowGap="16px"
    >
      {/* <nav /> */}
      <GridItem gridArea="1 / 1 / 2 / 2" as="section">
        <CreatePostButton />
      </GridItem>
      <GridItem gridArea="2 / 1 / 3 / 2" as="main">
        <PostList />
      </GridItem>
      <GridItem gridArea={[null, null, '1 / 2 / 3 / 3']} as="aside">
        <Communities />
      </GridItem>
      {/* <footer /> */}
    </Grid>
  );
}
