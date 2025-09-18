"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { tokenManager } from "@/lib/tokenManager";
import { validateToken, getUserProfile } from "@/lib/apiServices/auth.service";

interface User {
  id: number;
  firstname?: string;
  lastname?: string;
  email: string;
  mobile?: string;
  avatar?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && tokenManager.isAuthenticated();

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      try {
        const token = tokenManager.getToken();
        const storedUserData = tokenManager.getUserData();

        if (token && storedUserData) {
          // Validate token with server
          const validationResponse = await validateToken();

          if (validationResponse.success && validationResponse.user) {
            setUser(validationResponse.user as User);
            // Update stored user data if server returned updated info
            tokenManager.setUserData(validationResponse.user);
          } else {
            // Token is invalid, clear everything
            tokenManager.removeToken();
            setUser(null);
          }
        } else {
          // No token or user data
          setUser(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear invalid auth state
        tokenManager.removeToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token: string, userData: User) => {
    tokenManager.setToken(token);
    tokenManager.setUserData(userData);
    setUser(userData);
  };

  const logout = () => {
    tokenManager.removeToken();
    setUser(null);
  };

  const updateUser = (userData: User) => {
    tokenManager.setUserData(userData);
    setUser(userData);
  };

  const refreshUser = async () => {
    try {
      const response = await getUserProfile();
      if (response.success && response.user) {
        updateUser(response.user as User);
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
