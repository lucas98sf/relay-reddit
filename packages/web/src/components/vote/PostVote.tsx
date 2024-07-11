import { Flex, Text } from "@chakra-ui/react";
import { VoteButton } from "@relay-reddit/ui";
import { useState } from "react";
import { useMutation } from "react-relay";

import { PostVoteCreateMutation, VoteType } from "@/__generated__/PostVoteCreateMutation.graphql";
import { shortNumber } from "@/util/numberShortener";

import { PostVoteCreate } from "./mutations/PostVoteCreate";

type PostVoteButtonsProps = { votes: number; postId: string };

export function PostVoteButtons({ votes, postId }: PostVoteButtonsProps) {
  const [votesCount, setVotesCount] = useState(votes);

  const [commit] = useMutation<PostVoteCreateMutation>(PostVoteCreate);

  const onSubmit = (e: React.MouseEvent, type: VoteType) => {
    e.preventDefault();

    commit({
      variables: {
        input: {
          postId,
          type,
        },
      },
      onCompleted: (data) => {
        if (data.VoteCreate?.success) setVotesCount(data.VoteCreate?.post?.votesCount || votesCount);
        else console.log(data.VoteCreate?.error);
      },
    });
  };

  return (
    <Flex w="40px" justifyContent="space-around" alignItems="center" flexDirection="column" pl={1} pr={1}>
      <VoteButton aria-label="upvote" direction="up" onClick={(e) => onSubmit(e, "UPVOTE")} />
      <Text fontSize="sm" fontWeight="bold">
        {votes ? shortNumber(votesCount) : "Vote"}
      </Text>
      <VoteButton aria-label="down" direction="down" onClick={(e) => onSubmit(e, "DOWNVOTE")} />
    </Flex>
  );
}
