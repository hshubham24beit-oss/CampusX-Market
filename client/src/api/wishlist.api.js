import API from "./axios";

export const wishlistAPI = {
  // Get logged-in user's wishlist
  getWishlist: async () => {
    const response = await API.get("/wishlist");
    return response.data;
  },

  // Add product to wishlist
  addToWishlist: async (productId) => {
    const response = await API.post("/wishlist", {
      productId,
    });
    return response.data;
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId) => {
    const response = await API.delete(`/wishlist/${productId}`);
    return response.data;
  },

  // Clear complete wishlist
  clearWishlist: async () => {
    const response = await API.delete("/wishlist");
    return response.data;
  },
};