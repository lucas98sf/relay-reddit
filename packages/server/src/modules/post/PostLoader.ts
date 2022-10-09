import { createLoader } from '@entria/graphql-mongo-helpers';

import PostModel from './PostModel';

import { registerLoader } from '@/graphql/loaderRegister';

const {
  Wrapper: Post,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: PostModel,
  loaderName: 'PostLoader',
});

export { getLoader, clearCache, load, loadAll };
export default Post;

registerLoader('PostLoader', getLoader);
