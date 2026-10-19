import API from "./axios";

export const authAPI = {
  // Register User
  register: async (data) => {
    const payload = {
      fullName: data.name || data.fullName,
      email: data.email,
      password: data.password,
      department: data.department,
      year: data.year,
      phone: data.phone,
    };

    return API.post("/auth/register", payload);
  },

  // Login User
  login: async (credentials) => {
    return API.post("/auth/login", credentials);
  },

  // Google Login
  googleLogin: async (loginData) => {
    return API.post("/auth/google-login", loginData);
  },

  // Forgot Password
  forgotPassword: async (email) => {
    return API.post("/auth/forgot-password", { email });
  },

  // Reset Password
  resetPassword: async (token, password) => {
    return API.post("/auth/reset-password", { token, password });
  },

  // Get Logged-in User
  getCurrentUser: async () => {
    return API.get("/auth/me");
  },

  // Logout
  logout: async () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
};