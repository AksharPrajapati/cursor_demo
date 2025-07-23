import { POST } from "./route";
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import * as authLib from "@/lib/auth";

jest.mock("@/lib/db");
jest.mock("@/lib/auth");

// mock NextResponse.json
jest.mock("next/server", () => ({
  ...jest.requireActual("next/server"),
  NextResponse: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json: (data: any, init?: ResponseInit) => {
      return {
        ...new Response(JSON.stringify(data), init),
        json: async () => data,
        status: init?.status,
      } as unknown as Response;
    },
  },
}));

describe("POST /api/auth/login", () => {
  const mockJson = jest.fn();
  const mockResponse = { json: mockJson };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if email or password is missing", async () => {
    const req = {
      json: async () => ({ email: "", password: "" }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("required"),
    });
  });

  it("should return 401 if user is not found", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const req = {
      json: async () => ({ email: "test@example.com", password: "pass" }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("Invalid"),
    });
  });

  it("should return 401 if password is invalid", async () => {
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 1, email: "test@example.com", password_hash: "hash" }],
    });
    (authLib.comparePassword as jest.Mock).mockResolvedValue(false);
    const req = {
      json: async () => ({ email: "test@example.com", password: "wrong" }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("Invalid"),
    });
  });

  it("should return 200 and token for valid credentials", async () => {
    (pool.query as jest.Mock).mockResolvedValue({
      rows: [
        {
          id: 1,
          name: "User",
          email: "test@example.com",
          password_hash: "hash",
          created_at: "",
          updated_at: "",
        },
      ],
    });
    (authLib.comparePassword as jest.Mock).mockResolvedValue(true);
    (authLib.generateToken as jest.Mock).mockReturnValue("token");
    const req = {
      json: async () => ({ email: "test@example.com", password: "correct" }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBeUndefined(); // 200 is default
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.token).toBe("token");
    expect(json.user.email).toBe("test@example.com");
  });

  it("should return 500 on internal error", async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error("DB error"));
    const req = {
      json: async () => ({ email: "test@example.com", password: "pass" }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(await res.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("Internal"),
    });
  });
});
