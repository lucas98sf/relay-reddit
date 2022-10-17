import {
  clearInMemoryMongoDB,
  closeInMemoryMongoDB,
  createInMemoryMongoDB,
  createMutation,
  gql,
} from '../../../test';
import { createUser, userRegisterInput } from '../../user/__tests__/fixtures/createUser';

import { createCommunity } from './fixtures/createCommunity';
import { joinCommunity } from './fixtures/joinCommunity';

beforeAll(createInMemoryMongoDB);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe('Community join', () => {
  const mutation = createMutation('CommunityJoin');

  it('should join a community successfully', async () => {
    const ownerUser = await createUser();
    const joinerUser = await createUser({
      ...userRegisterInput,
      username: 'joiner',
      email: 'joiner@user.com',
    });
    const community = await createCommunity(ownerUser.id);

    const result = await mutation(
      { communityId: community.id },
      gql`
        communityEdge {
          node {
            id
            members {
              edges {
                node {
                  _id
                }
              }
            }
          }
        }
      `,
      { user: joinerUser }
    );

    expect(result.success).toBe('Community joined');
    expect(result.error).toBeNull();
    expect(result.communityEdge.node.members.edges.length).toBe(2);
    expect(
      result.communityEdge.node.members.edges.some(
        ({ node }) => node._id === joinerUser._id.toString()
      )
    ).toBe(true);
  });

  it('should return error when user is not logged in', async () => {
    const ownerUser = await createUser();
    const community = await createCommunity(ownerUser.id);

    const result = await mutation(
      { communityId: community.id },
      gql`
        communityEdge {
          node {
            id
          }
        }
      `
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe('user not logged');
    expect(result.communityEdge).toBeNull();
  });

  it('should return error when community is already joined', async () => {
    const ownerUser = await createUser();
    const joinerUser = await createUser({
      ...userRegisterInput,
      username: 'joiner',
      email: 'joiner@user.com',
    });
    const community = await createCommunity(ownerUser.id);

    await joinCommunity(joinerUser.id, community.id);

    const result = await mutation(
      { communityId: community.id },
      gql`
        communityEdge {
          node {
            id
          }
        }
      `,
      { user: joinerUser }
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe('already joined this community');
    expect(result.communityEdge).toBeNull();
  });

  it('should return error when trying to join community as owner', async () => {
    const ownerUser = await createUser();
    const community = await createCommunity(ownerUser.id);

    const result = await mutation(
      { communityId: community.id },
      gql`
        communityEdge {
          node {
            id
          }
        }
      `,
      { user: ownerUser }
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe('already joined this community');
    expect(result.communityEdge).toBeNull();
  });
});
