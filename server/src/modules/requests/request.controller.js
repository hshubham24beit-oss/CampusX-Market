import {
  createRequest,
  getRequests,
  deleteRequest,
} from "./request.service.js";

// Create request
export const createRequestController = async (req, res) => {
  try {
    const request = await createRequest(req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: "Request posted successfully",
      data: request,
    });
  } catch (error) {
    console.error("Create Request Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create request",
    });
  }
};

// Get requests
export const getRequestsController = async (req, res) => {
  try {
    const requests = await getRequests();

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Get Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch requests",
    });
  }
};

// Delete request
export const deleteRequestController = async (req, res) => {
  try {
    await deleteRequest(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    console.error("Delete Request Error:", error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};