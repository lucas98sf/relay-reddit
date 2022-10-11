import { Environment, Network, RecordSource, Store, Observable } from 'relay-runtime';

export const fetchGraphQL = async (query?: unknown, variables?: unknown) => {
  // eslint-disable-next-line no-console
  console.log(`Fetching query '${query}' with ${JSON.stringify(variables) ?? 'no variables'}`);

  const API_URL = `http://localhost:3000/graphql`;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authetication: `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDA2ODYwNjBlMDA1MDk3MGM4Yzc4ZSIsImlhdCI6MTY2NTQ0OTUyN30.Z23aq-mT-AsGY98CPl3b1mwi24m6zvEDODYrJ6O-Adg`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(res => res.json());

  return response;
};

export const RelayEnvironment = new Environment({
  network: Network.create((params, variables) =>
    Observable.create(sink => {
      fetchGraphQL(params.text, variables).then(payload => {
        sink.next(payload);
        sink.complete();
      });
    })
  ),
  store: new Store(new RecordSource()),
});
