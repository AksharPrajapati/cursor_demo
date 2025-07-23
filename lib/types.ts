export interface User {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserProfile;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
