import {
  clearInMemoryMongoDB,
  closeInMemoryMongoDB,
  createInMemoryMongoDB,
} from '../../../test/inMemoryDb';
import User from '../UserModel';

import { createUser, userInput } from './fixtures/createUser';

beforeAll(createInMemoryMongoDB);
beforeEach(createUser);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe('User login', () => {
  it('should login successfully', async () => {});

  it('should throw on invalid username', async () => {});

  it('should throw on invalid password', async () => {});
});
