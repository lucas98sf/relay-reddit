import { Grid, GridItem } from '@chakra-ui/react';

import { Communities, PostList } from '../components';

const posts = [
  {
    id: 1,
    title: 'eu gosto de banana',
    community: 'banana',
    thumbnail:
      'https://previews.123rf.com/images/gestionetotale2/gestionetotale21409/gestionetotale2140900272/32079423-i-love-banana.jpg',
    votes: 92,
    author: 'bananalover',
  },
  {
    id: 2,
    title: 'eu ODEIO banana',
    community: 'banana',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ERmJ5hQ9S_kgCHnogzbWL-ntxYbq-lgPuKdsjCV34f8QtRSkWk_-KeDvUsRLwoXVnlQ&usqp=CAU',
    votes: -49,
    author: 'bananahater',
  },
  {
    id: 3,
    title: 'eu gosto de cachorros',
    community: 'cachorros',
    thumbnail:
      'https://www.washingtonpost.com/resizer/uwlkeOwC_3JqSUXeH8ZP81cHx3I=/arc-anglerfish-washpost-prod-washpost/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg',
    votes: 2500,
    author: 'doglover',
  },
  {
    id: 4,
    title: 'gatos > cachorros',
    community: 'gatos',
    thumbnail:
      'https://www.thesprucepets.com/thmb/SGUow1jS5efhv8Blo6P9CIs6aDY=/640x640/filters:no_upscale():max_bytes(150000):strip_icc()/39148843_1129848570496560_1413993569890336768_n-5b81fddd46e0fb002c27d43a.jpg',
    votes: 1237,
    author: 'catlover',
  },
];

export function Home() {
  return (
    <Grid
      templateColumns={['4fr', '4fr', '3fr 1fr']}
      margin={['1px', '24px']}
      columnGap="24px"
      rowGap={['2px', '16x']}
      height="100vh"
    >
      {/* <header> */}
      {/* <nav /> */}
      {/* </header> */}
      {/* <section /> */}
      {/* <main> */}
      <GridItem>
        {/* <section> */}
        <PostList posts={posts} />
        {/* </section> */}
      </GridItem>
      {/* <aside> */}
      <GridItem>
        <Communities />
      </GridItem>
      {/* </aside>
      </main>
      <footer /> */}
    </Grid>
  );
}
