import { graphql } from 'react-relay';

export const AllPosts = graphql`
  query AllPostsQuery {
    posts {
      totalCount
      edges {
        node {
          id
          title
          content
          image
          createdAt
          updatedAt
          community {
            name
          }
          author {
            username
          }
          votesCount
        }
      }
    }
  }
`;
