/**
 * @generated SignedSource<<82d526b0aa873eb71ddf463fffb25c57>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
export type AllPostsQuery$variables = {};
export type AllPostsQuery$data = {
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly author: {
          readonly username: string | null;
        } | null;
        readonly community: {
          readonly name: string | null;
        } | null;
        readonly content: string | null;
        readonly createdAt: string | null;
        readonly id: string;
        readonly image: string | null;
        readonly title: string | null;
        readonly updatedAt: string | null;
        readonly votesCount: number;
      } | null;
    } | null>;
    readonly totalCount: number | null;
  };
};
export type AllPostsQuery = {
  response: AllPostsQuery$data;
  variables: AllPostsQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "totalCount",
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "content",
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "image",
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "createdAt",
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "updatedAt",
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "username",
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "votesCount",
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "AllPostsQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "PostConnection",
          kind: "LinkedField",
          name: "posts",
          plural: false,
          selections: [
            v0 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: "PostEdge",
              kind: "LinkedField",
              name: "edges",
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Post",
                  kind: "LinkedField",
                  name: "node",
                  plural: false,
                  selections: [
                    v1 /*: any*/,
                    v2 /*: any*/,
                    v3 /*: any*/,
                    v4 /*: any*/,
                    v5 /*: any*/,
                    v6 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: "Community",
                      kind: "LinkedField",
                      name: "community",
                      plural: false,
                      selections: [v7 /*: any*/],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "User",
                      kind: "LinkedField",
                      name: "author",
                      plural: false,
                      selections: [v8 /*: any*/],
                      storageKey: null,
                    },
                    v9 /*: any*/,
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "AllPostsQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "PostConnection",
          kind: "LinkedField",
          name: "posts",
          plural: false,
          selections: [
            v0 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: "PostEdge",
              kind: "LinkedField",
              name: "edges",
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Post",
                  kind: "LinkedField",
                  name: "node",
                  plural: false,
                  selections: [
                    v1 /*: any*/,
                    v2 /*: any*/,
                    v3 /*: any*/,
                    v4 /*: any*/,
                    v5 /*: any*/,
                    v6 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: "Community",
                      kind: "LinkedField",
                      name: "community",
                      plural: false,
                      selections: [v7 /*: any*/, v1 /*: any*/],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "User",
                      kind: "LinkedField",
                      name: "author",
                      plural: false,
                      selections: [v8 /*: any*/, v1 /*: any*/],
                      storageKey: null,
                    },
                    v9 /*: any*/,
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "74595ac9dc7be36e68f2296c2af25d5f",
      id: null,
      metadata: {},
      name: "AllPostsQuery",
      operationKind: "query",
      text: "query AllPostsQuery {\n  posts {\n    totalCount\n    edges {\n      node {\n        id\n        title\n        content\n        image\n        createdAt\n        updatedAt\n        community {\n          name\n          id\n        }\n        author {\n          username\n          id\n        }\n        votesCount\n      }\n    }\n  }\n}\n",
    },
  };
})();

(node as any).hash = "754d6488398db2c5f89d43c68552646e";

export default node;
