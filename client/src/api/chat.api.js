// src/api/chat.api.js
import API from "./axios";

export const chatAPI = {
  // Create or get existing chat
  createChat: async (userId, productId = null) => {
    const response = await API.post("/chats", {
      userId,
      productId,
    });
    return response.data;
  },

  // Get user's chats
  getMyChats: async () => {
    const response = await API.get("/chats");
    return response.data;
  },

  // Get single chat with messages
  getChatById: async (chatId) => {
    const response = await API.get(`/chats/${chatId}`);
    return response.data;
  },

  // Send message
  sendMessage: async (chatId, message) => {
    const response = await API.post(`/chats/${chatId}/messages`, {
      message,
    });
    return response.data;
  },
};

export default chatAPI;
