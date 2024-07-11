import { clearInMemoryMongoDB, closeInMemoryMongoDB, createInMemoryMongoDB, createMutation, gql } from "../../../test";
import { createComment } from "../../comment/__tests__/fixtures/createComment";
import { createCommunity } from "../../community/__tests__/fixtures/createCommunity";
import { createPost } from "../../post/__tests__/fixtures/createPost";
import { createUser } from "../../user/__tests__/fixtures/createUser";

import { createVote } from "./fixtures/createVote";

beforeAll(createInMemoryMongoDB);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe("Vote create", () => {
  const mutation = createMutation("VoteCreate");

  it("should add a upvote to a post/comment successfully", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    const comment = await createComment(user.id, post.id);

    const postResult = await mutation(
      { postId: post.id, type: "UPVOTE" },
      gql`
        post {
            id
            _id
            author {
              _id
            }
            votesCount
          }
      `,
      { user }
    );

    expect(postResult.success).toBe("UPVOTE created");
    expect(postResult.error).toBeNull();
    expect(postResult.post.id).toBeDefined();
    expect(postResult.post._id).toBe(post._id.toString());
    expect(postResult.post.votesCount).toBe(1);

    const commentResult = await mutation(
      { commentId: comment.id, type: "UPVOTE" },
      gql`
        comment {
            id
            _id
            author {
              _id
            }
            votesCount
          }
      `,
      { user }
    );

    expect(commentResult.success).toBe("UPVOTE created");
    expect(commentResult.error).toBeNull();
    expect(commentResult.comment.id).toBeDefined();
    expect(commentResult.comment._id).toBe(comment._id.toString());
    expect(commentResult.comment.votesCount).toBe(1);
  });

  it("should add a downvote to a post/comment successfully", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    const comment = await createComment(user.id, post.id);

    const postResult = await mutation(
      { postId: post.id, type: "DOWNVOTE" },
      gql`
        post {
            id
            _id
            author {
              _id
            }
            votesCount
          }
      `,
      { user }
    );

    expect(postResult.success).toBe("DOWNVOTE created");
    expect(postResult.error).toBeNull();
    expect(postResult.post.id).toBeDefined();
    expect(postResult.post._id).toBe(post._id.toString());
    expect(postResult.post.votesCount).toBe(-1);

    const commentResult = await mutation(
      { commentId: comment.id, type: "DOWNVOTE" },
      gql`
        comment {
            id
            _id
            author {
              _id
            }
            votesCount
          }
      `,
      { user }
    );

    expect(commentResult.success).toBe("DOWNVOTE created");
    expect(commentResult.error).toBeNull();
    expect(commentResult.comment.id).toBeDefined();
    expect(commentResult.comment._id).toBe(comment._id.toString());
    expect(commentResult.comment.votesCount).toBe(-1);
  });

  it("should return error when user is not logged in", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    const comment = await createComment(user.id, post.id);

    const postResult = await mutation(
      { postId: post.id, type: "UPVOTE" },
      gql`
        post {
            id
          }
      `
    );

    expect(postResult.success).toBeNull();
    expect(postResult.error).toBe("user not logged");
    expect(postResult.post).toBeNull();

    const commentResult = await mutation(
      { commentId: comment.id, type: "UPVOTE" },
      gql`
      comment {
            id
          }
      `
    );

    expect(commentResult.success).toBeNull();
    expect(commentResult.error).toBe("user not logged");
    expect(commentResult.comment).toBeNull();
  });

  it("should return error when no postId or commentId are provided", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    await createComment(user.id, post.id);

    const result = await mutation(
      { type: "UPVOTE" },
      gql`
        post {
            id
          }
        comment {
            id
          }
      `,
      { user }
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe("either postId or commentId are required");
    expect(result.post).toBeNull();
    expect(result.comment).toBeNull();
  });

  it("should return error when both postId and commentId are provided", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    const comment = await createComment(user.id, post.id);

    const result = await mutation(
      { postId: post.id, commentId: comment.id, type: "UPVOTE" },
      gql`
        post {
            id
          }
        comment {
            id
          }
      `,
      { user }
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe("only one of postId or commentId are required");
    expect(result.post).toBeNull();
    expect(result.comment).toBeNull();
  });

  it("should return error when post/comment is not found", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    await createComment(user.id, post.id);

    const postResult = await mutation(
      { postId: "random_id", type: "UPVOTE" },
      gql`
        post {
            id
          }
      `,
      { user }
    );

    expect(postResult.success).toBeNull();
    expect(postResult.error).toBe("post not found");
    expect(postResult.post).toBeNull();

    const commentResult = await mutation(
      { commentId: "random_id", type: "UPVOTE" },
      gql`
      comment {
            id
          }
      `,
      { user }
    );

    expect(commentResult.success).toBeNull();
    expect(commentResult.error).toBe("comment not found");
    expect(commentResult.comment).toBeNull();
  });

  it("should return error when post/comment is already upvoted", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    const comment = await createComment(user.id, post.id);

    await createVote(user.id, "UPVOTE", { post: post.id });
    const postResult = await mutation(
      { postId: post.id, type: "UPVOTE" },
      gql`
        post {
            id
          }
      `,
      { user }
    );

    expect(postResult.success).toBeNull();
    expect(postResult.error).toBe("you already voted");

    await createVote(user.id, "UPVOTE", { comment: comment.id });
    const commentResult = await mutation(
      { commentId: comment.id, type: "UPVOTE" },
      gql`
        comment {
            id
          }
      `,
      { user }
    );

    expect(commentResult.success).toBeNull();
    expect(commentResult.error).toBe("you already voted");
  });

  it("should return error when post/comment is already downvoted", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    const comment = await createComment(user.id, post.id);

    await createVote(user.id, "DOWNVOTE", { post: post.id });
    const postResult = await mutation(
      { postId: post.id, type: "DOWNVOTE" },
      gql`
        post {
            id
          }
      `,
      { user }
    );

    expect(postResult.success).toBeNull();
    expect(postResult.error).toBe("you already voted");

    await createVote(user.id, "DOWNVOTE", { comment: comment.id });
    const commentResult = await mutation(
      { commentId: comment.id, type: "DOWNVOTE" },
      gql`
        comment {
            id
          }
      `,
      { user }
    );

    expect(commentResult.success).toBeNull();
    expect(commentResult.error).toBe("you already voted");
  });

  it("should update a upvote to downvote on a post/comment successfully", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    const comment = await createComment(user.id, post.id);

    await createVote(user.id, "UPVOTE", { post: post.id });
    const postResult = await mutation(
      { postId: post.id, type: "DOWNVOTE" },
      gql`
        post {
            id
            votesCount
          }
      `,
      { user }
    );

    expect(postResult.success).toBe("Vote updated to DOWNVOTE");
    expect(postResult.error).toBeNull();
    expect(postResult.post).toBeDefined();
    expect(postResult.post.votesCount).toBe(-1);

    await createVote(user.id, "UPVOTE", { comment: comment.id });
    const commentResult = await mutation(
      { commentId: comment.id, type: "DOWNVOTE" },
      gql`
        comment {
            id
            votesCount
          }
      `,
      { user }
    );

    expect(commentResult.success).toBe("Vote updated to DOWNVOTE");
    expect(commentResult.error).toBeNull();
    expect(commentResult.comment).toBeDefined();
    expect(commentResult.comment.votesCount).toBe(-1);
  });

  it("should update a downvote to upvote on a post/comment successfully", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);
    const comment = await createComment(user.id, post.id);

    await createVote(user.id, "DOWNVOTE", { post: post.id });
    const postResult = await mutation(
      { postId: post.id, type: "UPVOTE" },
      gql`
        post {
            id
            votesCount
          }
      `,
      { user }
    );

    expect(postResult.success).toBe("Vote updated to UPVOTE");
    expect(postResult.error).toBeNull();
    expect(postResult.post).toBeDefined();
    expect(postResult.post.votesCount).toBe(1);

    await createVote(user.id, "DOWNVOTE", { comment: comment.id });
    const commentResult = await mutation(
      { commentId: comment.id, type: "UPVOTE" },
      gql`
        comment {
            id
            votesCount
          }
      `,
      { user }
    );

    expect(commentResult.success).toBe("Vote updated to UPVOTE");
    expect(commentResult.error).toBeNull();
    expect(commentResult.comment).toBeDefined();
    expect(commentResult.comment.votesCount).toBe(1);
  });
});
