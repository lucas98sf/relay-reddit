import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '@/graphql/loaderRegister';

import CommentModel from './CommentModel';

const {
  Wrapper: Comment,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: CommentModel,
  loaderName: 'CommentLoader',
});

export { getLoader, clearCache, load, loadAll };
export default Comment;

registerLoader('CommentLoader', getLoader);
