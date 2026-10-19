import API from "./axios";

export const userAPI = {

  // Get Logged-in User Profile
  getMyProfile: async () => {
    return API.get("/users/profile");
  },

  // Update Logged-in User Profile
  updateProfile: async (data) => {
    const isFormData = data instanceof FormData;

    return API.put("/users/profile", data, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
    });
  },

  // Get Seller Profile
  getUserById: async (id) => {
    return API.get(`/users/${id}`);
  },

};