import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { ApiResponse, UserProfile } from "@/lib/types";

// Middleware to verify JWT token
const authenticateUser = (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);
  return verifyToken(token);
};

// GET - Get user profile
export async function GET(request: NextRequest) {
  try {
    const user = authenticateUser(request);
    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const result = await pool.query(
      "SELECT id, name, email, bio, avatar_url, created_at, updated_at FROM users WHERE id = $1",
      [user.userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const userProfile = result.rows[0];

    return NextResponse.json<ApiResponse<UserProfile>>({
      success: true,
      message: "Profile retrieved successfully",
      data: {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email,
        bio: userProfile.bio,
        avatar_url: userProfile.avatar_url,
        created_at: userProfile.created_at,
        updated_at: userProfile.updated_at,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const user = authenticateUser(request);
    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, bio, avatar_url } = body;

    // Validation
    if (!name || name.trim().length === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Name is required",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "UPDATE users SET name = $1, bio = $2, avatar_url = $3, updated_at = NOW() WHERE id = $4 RETURNING id, name, email, bio, avatar_url, created_at, updated_at",
      [name.trim(), bio || null, avatar_url || null, user.userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const updatedProfile = result.rows[0];

    return NextResponse.json<ApiResponse<UserProfile>>({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: updatedProfile.id,
        name: updatedProfile.name,
        email: updatedProfile.email,
        bio: updatedProfile.bio,
        avatar_url: updatedProfile.avatar_url,
        created_at: updatedProfile.created_at,
        updated_at: updatedProfile.updated_at,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
