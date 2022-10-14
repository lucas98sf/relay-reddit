import { getContext } from '../../../getContext';
import {
  clearInMemoryMongoDB,
  closeInMemoryMongoDB,
  createInMemoryMongoDB,
  createMutation,
  gql,
} from '../../../test';
import User from '../UserModel';

import { userInput } from './fixtures/createUser';

beforeAll(createInMemoryMongoDB);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe('User register', () => {
  const mutation = createMutation('UserRegister');
  it('should create a new user', async () => {
    const result = await mutation(
      userInput,
      gql`
        me { 
          id 
        }
      `
    );

    expect(result.success).toBe('User registered');
    expect(result.error).toBe(null);
    expect(result.me.id).toBeDefined();
  });
  it('should throw and error when username is already in use', async () => {});
  it('should throw and error when email is already in use', async () => {});
});
