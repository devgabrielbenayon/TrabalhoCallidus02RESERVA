import apiClient from "../api/apiClient"

const login = async (username, password) => {
  const response = await apiClient.post("/auth/login", { username, password })
  localStorage.setItem("token", response.data.token)
  localStorage.setItem("username", username)
  return response.data
}

const register = async (username, password) => {
  const response = await apiClient.post("/auth/register", { username, password })
  return response.data
}

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("username")
}

const getCurrentUser = async () => {
  const username = localStorage.getItem("username")
  const token = localStorage.getItem("token")

  if (!username || !token) {
    throw new Error("Usuário não autenticado")
  }

  return {
    username: username,
    created_at: new Date().toISOString(),
    id: "user_" + username,
  }
}

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
}

export default authService
