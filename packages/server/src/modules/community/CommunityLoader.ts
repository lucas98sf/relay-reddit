import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '@/graphql/loaderRegister';

import CommunityModel from './CommunityModel';

const {
  Wrapper: Community,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: CommunityModel,
  loaderName: 'CommunityLoader',
});

export { getLoader, clearCache, load, loadAll };
export default Community;

registerLoader('CommunityLoader', getLoader);
