import { dbConfig, jwtConfig } from "./database";

describe("config/database", () => {
  it("should export dbConfig with required properties", () => {
    expect(dbConfig).toHaveProperty("user");
    expect(dbConfig).toHaveProperty("host");
    expect(dbConfig).toHaveProperty("database");
    expect(dbConfig).toHaveProperty("password");
    expect(dbConfig).toHaveProperty("port");
  });
  it("should export jwtConfig with required properties", () => {
    expect(jwtConfig).toHaveProperty("secret");
    expect(jwtConfig).toHaveProperty("expiresIn");
  });
});
