import type { RoleEnum } from "./enums"

export interface User {
  id: number
  firstname?: string
  lastname?: string
  email?: string
  mobile?: string
  password?: string
  avatar?: string
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

export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupData {
  email: string
  password: string
  role?: string
  [key: string]: any 
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    id: number
    firstname?: string
    lastname?: string
    email: string
    mobile?: string
    avatar?: string
    role: string
    [key: string]: any
  }
}
