// src/api/product.api.js

import API from "./axios";

export const productAPI = {
  // Get all products
  getProducts: async (params = {}) => {
    const searchParams = new URLSearchParams();

    if (typeof params === "string") {
      if (params && params !== "All") {
        searchParams.set("category", params);
      }
    } else {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.set(key, value);
        }
      });
    }

    const query = searchParams.toString();

    const response = await API.get(`/products${query ? `?${query}` : ""}`);
    return response.data;
  },

  // Get single product
  getProductById: async (id) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
  },

  // Create product
  createProduct: async (productData) => {
    const response = await API.post("/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await API.put(`/products/${id}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await API.delete(`/products/${id}`);
    return response.data;
  },
};