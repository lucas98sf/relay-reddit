import { Box, Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { timeAgo } from '@/util/timeAgoCalculator';

type PostTextProps = {
  post: any;
  link: string;
};

export function PostText({ post, link }: PostTextProps) {
  return (
    <Box>
      <Text as={Link} textStyle="h3" to={link}>
        {post.title}
      </Text>
      <Flex
        alignItems="flex-start"
        color="brand.400"
        textStyle="h4"
        fontSize={['xs']}
        flexDirection={['column', 'row']}
        gap={1}
      >
        <Flex flexDirection="row" gap={1}>
          <Text
            as={Link}
            textStyle="a"
            fontWeight="700"
            lineHeight="20px"
            color="brand.200"
            to={`r/${post.community}`}
          >
            {`r/${post.community}`}
          </Text>
          <Text fontSize="8px" alignSelf="center">
            •
          </Text>
        </Flex>
        <Flex alignSelf="center" flexDirection="row" gap={1}>
          <Text>Posted by</Text>
          <Text as={Link} textStyle="a" to={`u/${post.author}`}>{`u/${post.author}`}</Text>
          <Text>{`${timeAgo(new Date(post.createdAt))} ago`}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
