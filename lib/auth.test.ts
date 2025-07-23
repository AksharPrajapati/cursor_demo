import {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} from "./auth";

describe("auth utils", () => {
  it("hashes and compares passwords correctly", async () => {
    const password = "test1234";
    const hash = await hashPassword(password);
    expect(typeof hash).toBe("string");
    expect(hash).not.toBe(password);
    expect(await comparePassword(password, hash)).toBe(true);
    expect(await comparePassword("wrong", hash)).toBe(false);
  });

  it("generates and verifies JWT tokens", () => {
    const token = generateToken("user-id", "user@example.com");
    expect(typeof token).toBe("string");
    const payload = verifyToken(token);
    expect(payload).toMatchObject({
      userId: "user-id",
      email: "user@example.com",
    });
  });

  it("returns null for invalid JWT tokens", () => {
    expect(verifyToken("invalid.token")).toBeNull();
  });
});
