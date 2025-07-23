import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword, generateToken } from "@/lib/auth";
import { SignupRequest, AuthResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Name, email, and password are required",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "Password must be at least 6 characters long",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at, updated_at",
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    return NextResponse.json<AuthResponse>(
      {
        success: true,
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
