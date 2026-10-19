// src/api/category.api.js

import API from "./axios";

export const categoryAPI = {

  // Get all categories
  getCategories: async () => {
    const response = await API.get("/categories");
    return response.data;
  },

  // Create category
  createCategory: async (categoryData) => {
    const response = await API.post(
      "/categories",
      categoryData
    );

    return response.data;
  },

  // Update category
  updateCategory: async (id, categoryData) => {
    const response = await API.put(
      `/categories/${id}`,
      categoryData
    );

    return response.data;
  },

  // Delete category
  deleteCategory: async (id) => {
    const response = await API.delete(
      `/categories/${id}`
    );

    return response.data;
  },

};