import jwt from "jsonwebtoken";

import { config } from "./config";
import User, { IUser } from "./modules/user/UserModel";

export const generateToken = (user: IUser) => `JWT ${jwt.sign({ id: user._id }, config.JWT_SECRET_KEY)}`;

export const decodeToken = (token: string): string | jwt.JwtPayload => {
  const tokenString = token.split("JWT ")[1];
  if (!tokenString) throw new Error('Invalid JWT token format, must be "JWT <token>"');

  const decodedToken = jwt.verify(tokenString, config.JWT_SECRET_KEY);
  return decodedToken;
};

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null };

  try {
    const decodedToken = decodeToken(token);

    const user = await User.findOne({ _id: (decodedToken as { id: string }).id });

    return {
      user,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("[Auth Error]: ", (err as Error).message);
    return { user: null };
  }
};
