import { POST } from "./route";
import { NextRequest } from "next/server";
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

describe("POST /api/auth/signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if name, email, or password is missing", async () => {
    const req = {
      json: async () => ({ name: "", email: "", password: "" }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("required"),
    });
  });

  it("should return 400 if password is too short", async () => {
    const req = {
      json: async () => ({
        name: "User",
        email: "test@example.com",
        password: "123",
      }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("Password must be at least"),
    });
  });

  it("should return 409 if user already exists", async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: 1 }] });
    const req = {
      json: async () => ({
        name: "User",
        email: "test@example.com",
        password: "123456",
      }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(409);
    expect(await res.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("already exists"),
    });
  });

  it("should return 201 and token for successful signup", async () => {
    (pool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [] }) // No existing user
      .mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            name: "User",
            email: "test@example.com",
            created_at: "",
            updated_at: "",
          },
        ],
      }); // Inserted user
    (authLib.hashPassword as jest.Mock).mockResolvedValue("hashed");
    (authLib.generateToken as jest.Mock).mockReturnValue("token");
    const req = {
      json: async () => ({
        name: "User",
        email: "test@example.com",
        password: "123456",
      }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.token).toBe("token");
    expect(json.user.email).toBe("test@example.com");
  });

  it("should return 500 on internal error", async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error("DB error"));
    const req = {
      json: async () => ({
        name: "User",
        email: "test@example.com",
        password: "123456",
      }),
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(await res.json()).toMatchObject({
      success: false,
      message: expect.stringContaining("Internal"),
    });
  });
});
