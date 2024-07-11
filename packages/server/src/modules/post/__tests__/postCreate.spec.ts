import { clearInMemoryMongoDB, closeInMemoryMongoDB, createInMemoryMongoDB, createMutation, gql } from "../../../test";
import { createCommunity } from "../../community/__tests__/fixtures/createCommunity";
import { createUser } from "../../user/__tests__/fixtures/createUser";

import { postCreateInput } from "./fixtures/createPost";

beforeAll(createInMemoryMongoDB);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe("Post create", () => {
  const mutation = createMutation("PostCreate");

  it("should create a post successfully", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);

    const result = await mutation(
      { ...postCreateInput, communityId: community.id },
      gql`
        postEdge {
          node {
            id
            title
            content
            image
            url
            author {
              _id
            }
            community {
              _id
            }
          }
        }
      `,
      { user }
    );

    expect(result.success).toBe("Post created");
    expect(result.error).toBeNull();
    expect(result.postEdge.node.id).toBeDefined();
    expect(result.postEdge.node.title).toBe(postCreateInput.title);
    expect(result.postEdge.node.content).toBe(postCreateInput.content);
    expect(result.postEdge.node.image).toBe(postCreateInput.image);
    expect(result.postEdge.node.url).toBe(postCreateInput.url);
    expect(result.postEdge.node.author._id).toBe(user._id.toString());
    expect(result.postEdge.node.community._id).toBe(community._id.toString());
  });

  it("should return error user is not logged in", async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);

    const result = await mutation(
      { ...postCreateInput, communityId: community.id },
      gql`
        postEdge {
          node {
            id
          }
        }
      `
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe("user not logged");
    expect(result.postEdge).toBeNull();
  });

  it("should return error when community is not found", async () => {
    const user = await createUser();
    await createCommunity(user.id);

    const result = await mutation(
      { ...postCreateInput, communityId: "random_id" },
      gql`
        postEdge {
          node {
            id
          }
        }
      `,
      { user }
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe("community not found");
    expect(result.postEdge).toBeNull();
  });
});
