import { GET, PUT } from "./route";
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

describe("/api/profile", () => {
  const mockUser = { userId: 1, email: "test@example.com" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return 401 if not authenticated", async () => {
      (authLib.verifyToken as jest.Mock).mockReturnValue(null);
      const req = { headers: { get: () => null } } as unknown as NextRequest;
      const res = await GET(req);
      expect(res.status).toBe(401);
      expect(await res.json()).toMatchObject({
        success: false,
        message: expect.stringContaining("Unauthorized"),
      });
    });

    it("should return 404 if user not found", async () => {
      (authLib.verifyToken as jest.Mock).mockReturnValue(mockUser);
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      const req = {
        headers: { get: () => "Bearer token" },
      } as unknown as NextRequest;
      const res = await GET(req);
      expect(res.status).toBe(404);
      expect(await res.json()).toMatchObject({
        success: false,
        message: expect.stringContaining("not found"),
      });
    });

    it("should return 200 and user profile", async () => {
      (authLib.verifyToken as jest.Mock).mockReturnValue(mockUser);
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [
          {
            id: 1,
            name: "User",
            email: "test@example.com",
            bio: "",
            avatar_url: "",
            created_at: "",
            updated_at: "",
          },
        ],
      });
      const req = {
        headers: { get: () => "Bearer token" },
      } as unknown as NextRequest;
      const res = await GET(req);
      expect(res.status).toBeUndefined(); // 200 is default
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.email).toBe("test@example.com");
    });

    it("should return 500 on internal error", async () => {
      (authLib.verifyToken as jest.Mock).mockReturnValue(mockUser);
      (pool.query as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = {
        headers: { get: () => "Bearer token" },
      } as unknown as NextRequest;
      const res = await GET(req);
      expect(res.status).toBe(500);
      expect(await res.json()).toMatchObject({
        success: false,
        message: expect.stringContaining("Internal"),
      });
    });
  });

  describe("PUT", () => {
    it("should return 401 if not authenticated", async () => {
      (authLib.verifyToken as jest.Mock).mockReturnValue(null);
      const req = { headers: { get: () => null } } as unknown as NextRequest;
      const res = await PUT(req);
      expect(res.status).toBe(401);
      expect(await res.json()).toMatchObject({
        success: false,
        message: expect.stringContaining("Unauthorized"),
      });
    });

    it("should return 400 if name is missing", async () => {
      (authLib.verifyToken as jest.Mock).mockReturnValue(mockUser);
      const req = {
        headers: { get: () => "Bearer token" },
        json: async () => ({ name: "", bio: "", avatar_url: "" }),
      } as unknown as NextRequest;
      const res = await PUT(req);
      expect(res.status).toBe(400);
      expect(await res.json()).toMatchObject({
        success: false,
        message: expect.stringContaining("Name is required"),
      });
    });

    it("should return 404 if user not found on update", async () => {
      (authLib.verifyToken as jest.Mock).mockReturnValue(mockUser);
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      const req = {
        headers: { get: () => "Bearer token" },
        json: async () => ({ name: "User", bio: "", avatar_url: "" }),
      } as unknown as NextRequest;
      const res = await PUT(req);
      expect(res.status).toBe(404);
      expect(await res.json()).toMatchObject({
        success: false,
        message: expect.stringContaining("not found"),
      });
    });

    it("should return 200 and updated profile", async () => {
      (authLib.verifyToken as jest.Mock).mockReturnValue(mockUser);
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [
          {
            id: 1,
            name: "User",
            email: "test@example.com",
            bio: "",
            avatar_url: "",
            created_at: "",
            updated_at: "",
          },
        ],
      });
      const req = {
        headers: { get: () => "Bearer token" },
        json: async () => ({ name: "User", bio: "", avatar_url: "" }),
      } as unknown as NextRequest;
      const res = await PUT(req);
      expect(res.status).toBeUndefined(); // 200 is default
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.email).toBe("test@example.com");
    });

    it("should return 500 on internal error", async () => {
      (authLib.verifyToken as jest.Mock).mockReturnValue(mockUser);
      (pool.query as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = {
        headers: { get: () => "Bearer token" },
        json: async () => ({ name: "User", bio: "", avatar_url: "" }),
      } as unknown as NextRequest;
      const res = await PUT(req);
      expect(res.status).toBe(500);
      expect(await res.json()).toMatchObject({
        success: false,
        message: expect.stringContaining("Internal"),
      });
    });
  });
});
