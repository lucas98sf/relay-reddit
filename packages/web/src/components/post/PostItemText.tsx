import { Box, Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { timeAgo } from '@/util/timeAgoCalculator';

type PostItemTextProps = {
  post: any;
  link: string;
};

export function PostItemText({
  post: { title, community, author, createdAt },
  link,
}: PostItemTextProps) {
  return (
    <Box>
      <Text as={Link} textStyle="h3" to={link}>
        {title}
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
            to={`r/${community.name}`}
          >
            {`r/${community.name}`}
          </Text>
          <Text fontSize="8px" alignSelf="center">
            •
          </Text>
        </Flex>
        <Flex alignSelf="center" flexDirection="row" gap={1}>
          <Text>Posted by</Text>
          <Text as={Link} textStyle="a" to={`u/${author.username}`}>{`u/${author.username}`}</Text>
          <Text>{`${timeAgo(new Date(createdAt))} ago`}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
