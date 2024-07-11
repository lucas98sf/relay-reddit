import { clearInMemoryMongoDB, closeInMemoryMongoDB, createInMemoryMongoDB, createMutation, gql } from "../../../test";
import { createUser } from "../../user/__tests__/fixtures/createUser";

import { createCommunity, communityCreateInput } from "./fixtures/createCommunity";

beforeAll(createInMemoryMongoDB);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe("Community create", () => {
  const mutation = createMutation("CommunityCreate");

  it("should create a community successfully", async () => {
    const user = await createUser();

    const result = await mutation(
      communityCreateInput,
      gql`
        communityEdge {
          node {
            id
            name
            title
            about
            owner {
              _id
              username
            }
          }
        }
      `,
      { user }
    );

    expect(result.success).toBe("Community created");
    expect(result.error).toBeNull();
    expect(result.communityEdge.node.id).toBeDefined();
    expect(result.communityEdge.node.name).toBe(communityCreateInput.name);
    expect(result.communityEdge.node.title).toBe(communityCreateInput.title);
    expect(result.communityEdge.node.about).toBe(communityCreateInput.about);
    expect(result.communityEdge.node.owner._id).toBe(user._id.toString());
  });

  it("should return error when user is not logged in", async () => {
    await createUser();

    const result = await mutation(
      communityCreateInput,
      gql`
        communityEdge {
          node {
            id
          }
        }
      `
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe("user not logged");
    expect(result.communityEdge).toBeNull();
  });

  it("should return error when community name is already in use", async () => {
    const user = await createUser();
    await createCommunity(user.id);

    const result = await mutation(
      communityCreateInput,
      gql`
        communityEdge {
          node {
            id
          }
        }
      `,
      { user }
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe("community name already in use");
    expect(result.communityEdge).toBeNull();
  });
});
