// src/api/order.api.js
import API from "./axios";

export const orderAPI = {
  // Create / place order
  createOrder: async (productId, deliveryDetails = {}) => {
    const response = await API.post("/orders", {
      productId,
      deliveryDetails,
    });
    return response.data;
  },

  // Get buyer orders (my purchases)
  getMyOrders: async () => {
    const response = await API.get("/orders/my-orders");
    return response.data;
  },

  // Get seller orders (received orders for my products)
  getReceivedOrders: async () => {
    const response = await API.get("/orders/seller");
    return response.data;
  },

  // Get single order
  getOrderById: async (orderId) => {
    const response = await API.get(`/orders/${orderId}`);
    return response.data;
  },

  // Update order status (accepted, completed, cancelled)
  updateOrderStatus: async (orderId, status) => {
    const response = await API.put(`/orders/${orderId}/status`, {
      status,
    });
    return response.data;
  },
};

export default orderAPI;
