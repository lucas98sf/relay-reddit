import {
  clearInMemoryMongoDB,
  closeInMemoryMongoDB,
  createInMemoryMongoDB,
  createMutation,
  gql,
} from '../../../test';

import { createUser, userLoginInput } from './fixtures/createUser';

beforeAll(createInMemoryMongoDB);
beforeEach(createUser);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe('User login', () => {
  const mutation = createMutation('UserLogin');

  it('should login successfully', async () => {
    const result = await mutation(
      userLoginInput,
      gql`
        me { 
          id 
          username
          email
        }
      `
    );

    expect(result.success).toBe('Logged with success');
    expect(result.error).toBeNull();
    expect(result.me).toBeDefined();
  });

  it('should return error on invalid username', async () => {
    const result = await mutation(
      { ...userLoginInput, password: 'wrong#password' },
      gql`
        me { 
          id 
        }
      `
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe('invalid credentials');
    expect(result.me).toBeNull();
  });

  it('should return error on invalid password', async () => {
    const result = await mutation(
      { ...userLoginInput, username: 'wrong_username' },
      gql`
        me { 
          id 
        }
      `
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe('invalid credentials');
    expect(result.me).toBeNull();
  });
});
