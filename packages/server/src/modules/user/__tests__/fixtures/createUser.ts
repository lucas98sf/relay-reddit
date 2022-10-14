import User, { IUser } from '../../UserModel';

export const userInput: Pick<IUser, 'username' | 'email' | 'password'> = {
  username: 'test_user',
  password: 'AnyPassword123',
  email: 'user@test.com',
};

export const createUser = async (input = userInput) => {
  const user = await new User({ ...input }).save();
  return user;
};
