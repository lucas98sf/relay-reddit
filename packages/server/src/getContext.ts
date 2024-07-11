import { Request } from "graphql-helix";
import { Context } from "koa";

import { getDataloaders } from "./graphql/loaderRegister";
import { GraphQLContext } from "./graphql/types";
import { IUser } from "./modules/user/UserModel";

export type ContextVars = {
  user?: IUser | null;
  req?: Request;
  koaContext?: Context;
  setCookie?: (cookieName: string, token: string) => void;
};

export const getContext = async (ctx: ContextVars) => {
  const dataloaders = getDataloaders();

  return {
    req: ctx.req,
    dataloaders,
    user: ctx.user,
    koaContext: ctx.koaContext,
    setCookie: ctx.setCookie,
  } as GraphQLContext;
};
