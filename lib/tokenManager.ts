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
      localStorage.removeItem("userData")
    }
  },

  isAuthenticated: (): boolean => {
    return !!tokenManager.getToken()
  },

  setUserData: (userData: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(userData))
    }
  },

  getUserData: (): any | null => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData")
      return userData ? JSON.parse(userData) : null
    }
    return null
  },

  getUserDisplayName: (): string => {
    const userData = tokenManager.getUserData()
    if (userData) {
      if (userData.firstname && userData.lastname) {
        return `${userData.firstname} ${userData.lastname}`
      } else if (userData.firstname) {
        return userData.firstname
      } else if (userData.email) {
        return userData.email.split("@")[0]
      }
    }
    return "User"
  },
}
