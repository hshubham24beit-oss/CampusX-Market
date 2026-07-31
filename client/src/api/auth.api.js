// src/api/auth.api.js
import API from './axios';

export const authAPI = {
  login: async (credentials) => {
    return await API.post('/auth/login', credentials);
  },
  register: async (data) => {
    return await API.post('/auth/register', data);
  },
  googleLogin: async (loginData) => {
    return await API.post('/auth/google-login', loginData);
  },
  getCurrentUser: async () => {
    return await API.get('/auth/me');
  },
  logout: async () => {
    return await API.post('/auth/logout');
  }
};