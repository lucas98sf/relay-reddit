/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DataLoaders {
  UserLoader: ReturnType<typeof import('@/modules/user/UserLoader').getLoader>;
  PostLoader: ReturnType<typeof import('@/modules/post/PostLoader').getLoader>;
  CommentLoader: ReturnType<typeof import('@/modules/comment/CommentLoader').getLoader>;
  CommunityLoader: ReturnType<typeof import('@/modules/community/CommunityLoader').getLoader>;
  VoteLoader: ReturnType<typeof import('@/modules/vote/VoteLoader').getLoader>;
}

const loaders: {
  [Name in keyof DataLoaders]: () => DataLoaders[Name];
} = {} as any;

const registerLoader = <Name extends keyof DataLoaders>(
  key: Name,
  getLoader: () => DataLoaders[Name]
) => {
  loaders[key] = getLoader as any;
};

const getDataloaders = (): DataLoaders =>
  (Object.keys(loaders) as (keyof DataLoaders)[]).reduce(
    (prev, loaderKey) => ({
      ...prev,
      [loaderKey]: loaders[loaderKey](),
    }),
    {}
  ) as any;

export { registerLoader, getDataloaders };
