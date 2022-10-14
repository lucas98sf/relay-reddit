import { createLoader } from '@entria/graphql-mongo-helpers';
import { Document } from 'mongoose';

import { registerLoader } from '@/graphql/loaderRegister';

import CommentModel from './CommentModel';

const {
  Wrapper: Comment,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: CommentModel as typeof CommentModel & Document,
  loaderName: 'CommentLoader',
});

export { getLoader, clearCache, load, loadAll };
export default Comment;

registerLoader('CommentLoader', getLoader);
