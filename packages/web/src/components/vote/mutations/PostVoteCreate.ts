import { graphql } from 'react-relay';

export const PostVoteCreate = graphql`
  mutation PostVoteCreateMutation($input: VoteCreateInput!) {
    VoteCreate(input: $input) {
      success
      error
      post {
        votesCount
      }
    }
  }
`;
