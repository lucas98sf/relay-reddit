import User, { IUser } from '../../UserModel';

export const userRegisterInput: Pick<IUser, 'username' | 'email' | 'password'> = {
  username: 'test_user',
  password: 'AnyPassword123',
  email: 'user@test.com',
};

export const userLoginInput: Pick<IUser, 'username' | 'password'> = {
  username: 'test_user',
  password: 'AnyPassword123',
};

export const createUser = async (input = userRegisterInput) => {
  const user = await new User({ ...input }).save();
  return user;
};
