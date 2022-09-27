import { Environment, Network, RecordSource, Store, FetchFunction } from 'relay-runtime';

export const fetchGraphQL = async (query?: unknown, variables?: unknown) => {
  const response = await fetch(import.meta.env.BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return response.json();
};

const fetchRelay: FetchFunction = async (params, variables) => {
  // eslint-disable-next-line no-console
  console.log(`Fetching query '${params.name}' with '${JSON.stringify(variables)}'`);
  return fetchGraphQL(params.text as string, variables);
};

export const RelayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
