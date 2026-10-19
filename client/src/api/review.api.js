// src/api/review.api.js
import API from "./axios";

export const reviewAPI = {
  // Add review
  createReview: async ({ productId, rating, comment }) => {
    const response = await API.post("/reviews", {
      productId,
      rating,
      comment,
    });
    return response.data;
  },

  // Get reviews for a product
  getProductReviews: async (productId) => {
    const response = await API.get(`/reviews/product/${productId}`);
    return response.data;
  },

  // Update review
  updateReview: async (reviewId, { rating, comment }) => {
    const response = await API.put(`/reviews/${reviewId}`, {
      rating,
      comment,
    });
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId) => {
    const response = await API.delete(`/reviews/${reviewId}`);
    return response.data;
  },
};

export default reviewAPI;
