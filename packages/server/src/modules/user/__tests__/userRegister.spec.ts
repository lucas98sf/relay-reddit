import { clearInMemoryMongoDB, closeInMemoryMongoDB, createInMemoryMongoDB, createMutation, gql } from "../../../test";

import { createUser, userRegisterInput } from "./fixtures/createUser";

beforeAll(createInMemoryMongoDB);
afterEach(clearInMemoryMongoDB);
afterAll(closeInMemoryMongoDB);

describe("User register", () => {
  const mutation = createMutation("UserRegister");

  it("should create a new user", async () => {
    const result = await mutation(
      userRegisterInput,
      gql`
        me { 
          id 
          username
          email
        }
      `
    );

    expect(result.success).toBe("User registered");
    expect(result.error).toBeNull();
    expect(result.me.id).toBeDefined();
    expect(result.me.username).toBe(userRegisterInput.username);
    expect(result.me.email).toBe(userRegisterInput.email);
  });

  it("should return error and error when username is already in use", async () => {
    await createUser({ ...userRegisterInput, email: "different@email.com" });
    const result = await mutation(
      userRegisterInput,
      gql`
        me { 
          id 
        }
      `
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe("username already in use");
    expect(result.me).toBeNull();
  });

  it("should return error and error when email is already in use", async () => {
    await createUser({ ...userRegisterInput, username: "different_user" });
    const result = await mutation(
      userRegisterInput,
      gql`
        me { 
          id 
        }
      `
    );

    expect(result.success).toBeNull();
    expect(result.error).toBe("email already in use");
    expect(result.me).toBeNull();
  });
});
