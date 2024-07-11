import { graphql } from "graphql";

import { schema } from "@/schema";

import { getContext, ContextVars } from "../getContext";

// Used to improve DX on tests
export const gql = (strings: TemplateStringsArray) => strings[0];

export type MutationOutput = {
  success: string | null;
  error: string | null;
  [key: string]: any;
};

export const createMutation =
  (mutationName: string) => async (variables: Record<string, string>, outputFields: string, ctx?: ContextVars) => {
    const source = `mutation ${mutationName}($input: ${mutationName}Input!) {
      ${mutationName}(input: $input) {
        error
        success
        ${outputFields}
      }
    }`;
    // console.log({ source });

    const variableValues = { input: variables };

    const contextValue = await getContext({
      setCookie: () => {},
      ...ctx,
    });

    return graphql({
      schema,
      source,
      variableValues,
      contextValue,
    }).then((result) => {
      if (result.errors) {
        throw result.errors[0];
      }
      const output = result.data?.[mutationName] as MutationOutput;

      // eslint-disable-next-line no-console
      console.log(`Mutation ${mutationName} output data:`, JSON.stringify(output, null, 2));

      return output;
    });
  };
