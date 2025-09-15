
// Token management
export const tokenManager = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token)
    }
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken")
    }
    return null
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken")
    }
  },

  isAuthenticated: (): boolean => {
    return !!tokenManager.getToken()
  },
}
