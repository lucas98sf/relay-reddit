import { Context } from 'koa';

export const setCookie = (context: Context) => (cookieName: string, token: string) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };

  context.cookies.set(cookieName, token, options);
};
