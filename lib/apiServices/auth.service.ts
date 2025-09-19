import type { SignupData, AuthResponse, LoginData } from "@/types/user"
import api from "../axios"

export async function signupUser(data: SignupData): Promise<AuthResponse> {
  try {
    const response = await api.post("/auth/register", {
      ...data,
      role: "User",
    })

    return {
      success: true,
      message: response.data.message || "Account created successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network error occurred",
    }
  }
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await api.post("/auth/login", data)

    return {
      success: true,
      message: response.data.data.message || "Login successful",
      token: response.data.data.token,
      user: response.data.data.user,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network error occurred",
    }
  }
}

export async function validateToken(): Promise<AuthResponse> {
  try {
    const response = await api.post("/auth/validate")

    return {
      success: true,
      message: "Token validated successfully",
      user: response.data.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Token validation failed",
    }
  }
}

export async function getUserProfile(): Promise<AuthResponse> {
  try {
    const response = await api.get("/auth/profile")

    return {
      success: true,
      message: "Profile fetched successfully",
      user: response.data.data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch profile",
    }
  }
}
