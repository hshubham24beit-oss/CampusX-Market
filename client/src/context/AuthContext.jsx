// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth.api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await authAPI.getCurrentUser();
          setUser(res.data?.user || res.user || res.data);
        } catch (err) {
          console.error('Session expired or invalid token:', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    const res = await authAPI.login(credentials);
    const token = res.data?.token || res.token;
    const userData = res.data?.user || res.user;
    if (token) {
      localStorage.setItem('token', token);
      setUser(userData);
    }
    return res;
  };

  const register = async (data) => {
    const res = await authAPI.register(data);
    const token = res.data?.token || res.token;
    const userData = res.data?.user || res.user;
    if (token) {
      localStorage.setItem('token', token);
      setUser(userData);
    }
    return res;
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const payload = {
      token: credentialResponse.credential,
      department: "OTHER",
      year: "FY"
    };
    const res = await authAPI.googleLogin(payload);
    const token = res.data?.token || res.token;
    const userData = res.data?.user || res.user;
    if (token) {
      localStorage.setItem('token', token);
      setUser(userData);
    }
    return res;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, register, handleGoogleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};