import React, { createContext, useState, useEffect } from "react";
import { authAPI } from "../api/auth.api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login on page refresh
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await authAPI.getCurrentUser();
        setUser(res.data.user);
      } catch (err) {
        console.error("Session expired:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login
  const login = async (credentials) => {
  const res = await authAPI.login(credentials);

  const token = res.data.data.token;
  const userData = res.data.data.user;

  localStorage.setItem("token", token);
  setUser(userData);

  return res;
};

  // Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    const res = await authAPI.googleLogin({
      token: credentialResponse.credential,
    });

    const token = res.data.data.token;
    const userData = res.data.data.user;

    localStorage.setItem("token", token);
    setUser(userData);

    return res;
  };

  // Refresh current user after profile edits
  const refreshUser = async () => {
    const res = await authAPI.getCurrentUser();
    setUser(res.data.user);
    return res.data.user;
  };

  // Register
  const register = async (data) => {
    const res = await authAPI.register(data);

    // Don't login automatically after registration
    // User should login manually

    return res;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        handleGoogleLogin,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};