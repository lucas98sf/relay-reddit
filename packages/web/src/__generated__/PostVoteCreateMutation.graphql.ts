/**
 * @generated SignedSource<<61f8496d0e73260e1abb2dbd7a91e90b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type VoteType = "DOWNVOTE" | "UPVOTE" | "%future added value";
export type VoteCreateInput = {
  clientMutationId?: string | null;
  commentId?: string | null;
  postId?: string | null;
  type?: VoteType | null;
};
export type PostVoteCreateMutation$variables = {
  input: VoteCreateInput;
};
export type PostVoteCreateMutation$data = {
  readonly VoteCreate: {
    readonly error: string | null;
    readonly post: {
      readonly votesCount: number;
    } | null;
    readonly success: string | null;
  } | null;
};
export type PostVoteCreateMutation = {
  response: PostVoteCreateMutation$data;
  variables: PostVoteCreateMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "input",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "input",
        variableName: "input",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "success",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "error",
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "votesCount",
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "PostVoteCreateMutation",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "VoteCreatePayload",
          kind: "LinkedField",
          name: "VoteCreate",
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: "Post",
              kind: "LinkedField",
              name: "post",
              plural: false,
              selections: [v4 /*: any*/],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "PostVoteCreateMutation",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "VoteCreatePayload",
          kind: "LinkedField",
          name: "VoteCreate",
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: "Post",
              kind: "LinkedField",
              name: "post",
              plural: false,
              selections: [
                v4 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "id",
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
      cacheID: "0301f6c06791a3b2830b1f1c55b3380f",
      id: null,
      metadata: {},
      name: "PostVoteCreateMutation",
      operationKind: "mutation",
      text: "mutation PostVoteCreateMutation(\n  $input: VoteCreateInput!\n) {\n  VoteCreate(input: $input) {\n    success\n    error\n    post {\n      votesCount\n      id\n    }\n  }\n}\n",
    },
  };
})();

(node as any).hash = "e8d7e9c78669e0a43a8ac6617204d9c3";

export default node;
