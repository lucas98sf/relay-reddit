import {
  clearInMemoryMongoDB,
  closeInMemoryMongoDB,
  createInMemoryMongoDB,
  createMutation,
  gql,
} from '../../../test';
import { createCommunity } from '../../community/__tests__/fixtures/createCommunity';
import { createPost } from '../../post/__tests__/fixtures/createPost';
import { createUser } from '../../user/__tests__/fixtures/createUser';

beforeAll(createInMemoryMongoDB);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe('Comment create', () => {
  const mutation = createMutation('CommentCreate');

  it('should create a comment successfully', async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);

    const content = 'This is a comment';
    const result = await mutation(
      { postId: post.id, content },
      gql`
        commentEdge {
          node {
            id
            content
            author {
              _id
            }
            post {
              _id
            }
          }
        }
      `,
      { user }
    );

    expect(result.success).toBe('Comment created');
    expect(result.error).toBeNull();
    expect(result.commentEdge.node.id).toBeDefined();
    expect(result.commentEdge.node.content).toBe(content);
    expect(result.commentEdge.node.post._id).toBe(post._id.toString());
    expect(result.commentEdge.node.author._id).toBe(user._id.toString());
  });

  it('should return error when user is not logged in', async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    const post = await createPost(user.id, community.id);

    const result = await mutation(
      { postId: post.id, content: 'This is a comment' },
      gql`
        commentEdge {
          node {
            id
          }
        }
      `
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe('user not logged');
    expect(result.commentEdge).toBeNull();
  });

  it('should return error when post is not found', async () => {
    const user = await createUser();
    const community = await createCommunity(user.id);
    await createPost(user.id, community.id);

    const result = await mutation(
      { postId: 'random_id', content: 'This is a comment' },
      gql`
        commentEdge {
          node {
            id
          }
        }
      `,
      { user }
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe('post not found');
    expect(result.commentEdge).toBeNull();
  });
});
