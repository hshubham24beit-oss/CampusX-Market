import axiosInstance from "./axios";

export const cartAPI = {
  // Get cart
  getCart: () => axiosInstance.get("/cart"),

  // Add product
  addToCart: (productId, quantity = 1) =>
    axiosInstance.post("/cart", {
      productId,
      quantity,
    }),

  // Update quantity
  updateCart: (productId, quantity) =>
    axiosInstance.put(`/cart/${productId}`, {
      quantity,
    }),

  // Remove single item
  removeFromCart: (productId) =>
    axiosInstance.delete(`/cart/${productId}`),

  // Clear entire cart
  clearCart: () =>
    axiosInstance.delete("/cart"),
};