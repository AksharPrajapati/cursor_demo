import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth";
import { LoginRequest, AuthResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Find user by email
    const result = await pool.query(
      "SELECT id, name, email, password_hash, created_at, updated_at FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    return NextResponse.json<AuthResponse>({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
