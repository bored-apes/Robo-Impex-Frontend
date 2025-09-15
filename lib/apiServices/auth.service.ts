import { SignupData, AuthResponse, LoginData } from "@/types/user";
import api from "../axios";

export async function signupUser(data: SignupData): Promise<AuthResponse> {
  try {
    const response = await api.post("/auth/register", {
      ...data,
      role: "User",
    });

    return {
      success: true,
      message: response.data.message || "Account created successfully",
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await api.post("/auth/login", data);

    return {
      success: true,
      message: response.data.message || "Login successful",
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}