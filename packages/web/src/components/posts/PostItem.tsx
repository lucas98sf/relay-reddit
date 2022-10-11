import { Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { PostText } from './PostText';
import { PostVotes } from './PostVotes';

type PostItemProps = {
  post: any;
  isLast: boolean;
  isFirst: boolean;
};

export function PostItem({ post, isLast, isFirst }: PostItemProps) {
  const link = `/r/${post.community}/${post.id}`;

  return (
    <Flex
      as={Link}
      to={link}
      h={['12vh', '10vh']}
      pt={2}
      pb={2}
      _hover={{
        boxSizing: 'border-box',
        outline: '1px solid',
        outlineColor: 'brand.400',
        borderTopRadius: isFirst ? '4px' : 0,
        borderBottomRadius: isLast ? '4px' : 0,
      }}
      flexDirection="row"
      textAlign="left"
    >
      <PostVotes votes={post.votes} />
      <Image
        src={post.image}
        minWidth="100px"
        width="8%"
        height="92%"
        alignSelf="center"
        mr={3}
        ml={3}
        borderRadius="4px"
      />
      <PostText link={link} post={post} />
    </Flex>
  );
}
