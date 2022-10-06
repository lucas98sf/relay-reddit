import { ArrowUpIcon } from '@chakra-ui/icons';
import { Box, StackDivider, VStack, Image, Text, Button, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type PostItemProps = {
  post: any;
  isLast: boolean;
  isFirst: boolean;
};

function PostItem({ post, isLast, isFirst }: PostItemProps) {
  const link = `/r/${post.community}/${post.id}`;

  return (
    <Box
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
      display="flex"
      flexDirection="row"
      textAlign="left"
    >
      <Box
        w="40px"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexDirection="column"
        pl={1}
        pr={1}
      >
        <IconButton
          variant="unstyled"
          borderRadius="4px"
          aria-label="Upvote"
          icon={<ArrowUpIcon />}
          as={Button}
          h="8"
          display="flex"
          _hover={{
            color: 'red',
          }}
        />
        <Text fontSize="sm" fontWeight="bold">
          {post.votes}
        </Text>
        <IconButton
          variant="unstyled"
          borderRadius="4px"
          aria-label="Downvote"
          icon={<ArrowUpIcon />}
          as={Button}
          h="8"
          display="flex"
          transform="rotate(180deg)"
          _hover={{
            color: 'blue',
          }}
        />
      </Box>
      <Image
        src={post.thumbnail}
        minWidth="100px"
        width="8%"
        height="92%"
        alignSelf="center"
        mr={3}
        ml={3}
        borderRadius="4px"
      />
      <Box>
        <Text as={Link} to={link} fontSize={['md']} fontWeight="bold">
          {post.title}
        </Text>
        <Box
          color="brand.400"
          fontSize={['sm']}
          display="flex"
          flexDirection={['column', 'row']}
          gap={1}
        >
          <Box display="flex" flexDirection="row" gap={1}>
            <Text
              as={Link}
              color="brand.200"
              to={`r/${post.community}`}
              _hover={{
                textDecoration: 'underline',
              }}
            >{`r/${post.community}`}</Text>
            <Text>•</Text>
          </Box>
          <Box display="flex" flexDirection="row" gap={1}>
            <Text>Posted by</Text>
            <Text
              as={Link}
              to={`u/${post.author}`}
              _hover={{
                textDecoration: 'underline',
              }}
            >{`u/${post.author}`}</Text>
            <Text>{`${'2 hours'} ago`}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

type PostListProps = {
  posts: any[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <VStack
      divider={<StackDivider border="2px solid brand.600" />}
      spacing="1px"
      align="stretch"
      borderRadius="4px"
      borderColor="brand.600"
      borderWidth={1}
      margin={0}
      bgGradient="linear-gradient(90deg, brand.700 40px, brand.800 40px)"
      width="100%"
    >
      {posts.map((post: any, index: number) => (
        <PostItem
          key={post.id}
          isFirst={index === 0}
          isLast={index === posts.length - 1}
          post={post}
        />
      ))}
    </VStack>
  );
}
