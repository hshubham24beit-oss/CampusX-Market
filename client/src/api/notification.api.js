// src/api/notification.api.js
import API from "./axios";

export const notificationAPI = {
  // Get all user notifications
  getMyNotifications: async () => {
    const response = await API.get("/notifications");
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const response = await API.put(`/notifications/${notificationId}`);
    return response.data;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    const response = await API.delete(`/notifications/${notificationId}`);
    return response.data;
  },
};

export default notificationAPI;
