import { graphql } from 'graphql';

import { getContext } from '../../../getContext';
import { schema } from '../../../schema';
import {
  clearInMemoryMongoDB,
  closeInMemoryMongoDB,
  createInMemoryMongoDB,
  gql,
} from '../../../test';

import { createUser } from './fixtures/createUser';

beforeAll(createInMemoryMongoDB);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe('Queries', () => {
  it('should query the logged in user', async () => {
    const user = await createUser();

    const query = gql`
      query {
        me {
          _id
          username
          email
          avatar
        }
      }
    `;

    const contextValue = await getContext({ user });

    const result = await graphql({
      schema,
      source: query,
      contextValue,
    });

    expect(result?.data?.me).toEqual({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      avatar: null,
    });
  });
});
