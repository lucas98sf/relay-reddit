import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '@/graphql/loaderRegister';

import VoteModel from './VoteModel';

const {
  Wrapper: Vote,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: VoteModel,
  loaderName: 'VoteLoader',
});

export { getLoader, clearCache, load, loadAll };
export default Vote;

registerLoader('VoteLoader', getLoader);
