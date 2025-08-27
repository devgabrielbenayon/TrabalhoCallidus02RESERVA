import apiClient from '../api/apiClient';

const register = (username, password) => {
  return apiClient.post('/auth/register', {
    username,
    password,
  });
};

const login = async (username, password) => {
  const response = await apiClient.post('/auth/login', {
    username,
    password,
  });
  if (response.data.token) {
    // Armazena o token no localStorage para mantê-lo entre as sessões
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  // Remove o token do localStorage
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;