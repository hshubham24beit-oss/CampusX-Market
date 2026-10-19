import API from "./axios";

export const requestAPI = {

  // Get all student requests
  getRequests: async () => {
    const response = await API.get("/requests");
    return response.data;
  },

  // Create a new request
  createRequest: async (requestData) => {
    const response = await API.post("/requests", requestData);
    return response.data;
  },

  // Delete a request
  deleteRequest: async (id) => {
    const response = await API.delete(`/requests/${id}`);
    return response.data;
  },

};