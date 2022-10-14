import { Flex, Text } from '@chakra-ui/react';
import { UpvoteButton } from '@relay-reddit/ui';

import { shortNumber } from '@/util/numberShortener';

type PostVotesProps = { votes: number };

export function PostVotes({ votes }: PostVotesProps) {
  return (
    <Flex
      w="40px"
      justifyContent="space-around"
      alignItems="center"
      flexDirection="column"
      pl={1}
      pr={1}
    >
      <UpvoteButton aria-label="upvote" direction="up" />
      <Text fontSize="sm" fontWeight="bold">
        {votes ? shortNumber(votes) : 'Vote'}
      </Text>
      <UpvoteButton aria-label="down" direction="down" />
    </Flex>
  );
}
