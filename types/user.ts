import type { RoleEnum } from "./enums"

export interface User {
  id: number
  firstname?: string
  lastname?: string
  email?: string
  mobile?: string
  password?: string
  role: RoleEnum
  created_at: Date
}

export interface Passkey {
  id: number
  userId: number
  credentialId: string
  publicKey: string
  counter: number
  createdAt: Date
}

// Form types for login/signup
export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupFormData {
  firstname: string
  lastname: string
  email: string
  mobile?: string
  password: string
  confirmPassword: string
}
