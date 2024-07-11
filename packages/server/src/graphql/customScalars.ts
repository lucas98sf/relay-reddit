import { RegularExpression } from "graphql-scalars";

export const GraphQLPassword = new RegularExpression("PasswordType", /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/, {
  description: "Minimum eight characters, Maximum 50 characters, at least one letter and one number",
  errorMessage: () => "Password must be at least 8 characters long and contain at least one letter and one number",
});

export const GraphQLUsername = new RegularExpression("UsernameType", /^[a-zA-Z0-9_]{3,30}$/, {
  description: "Minimum 3 characters, Maximum 30 characters, only letters, numbers and underscores",
  errorMessage: () => "Username must be at least 3 characters long and contain only letters, numbers and underscores",
});

export const GraphQLStringWithLength = (name: string, min = 1, max = 300) =>
  new RegularExpression(`${name}Type`, new RegExp(`^.{${min},${max}}$`), {
    description: `Minimum ${min} characters, Maximum ${max} characters`,
    errorMessage: () => `${name} must be at least ${min} characters long and at most ${max} characters`,
  });
