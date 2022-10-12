import Router from '@koa/router';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
  Request,
} from 'graphql-helix';
import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

import { getUser } from './auth';
import { config } from './config';
import { getContext } from './getContext';
import { schema } from './schema';
import { setCookie } from './util/setCookie';

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(logger());

app.on('error', err => {
  // eslint-disable-next-line
  console.log('[App Error]: ', err);
});

const router = new Router();

router.all('/graphql', async ctx => {
  const { user } = await getUser(ctx.header.authorization);

  const request: Request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL({
      shouldPersistHeaders: true,
      headers: JSON.stringify({ authorization: ctx.cookies.get(config.TOKEN_COOKIE) }),
    });
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () =>
        getContext({ req: request, user, koaContext: ctx, setCookie: setCookie(ctx) }),
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
});

router.get('/', async ctx => {
  ctx.body = 'Welcome!';
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
