import Request from "./request.model.js";

// Create request
export const createRequest = async (data, userId) => {
  const request = await Request.create({
    productName: data.productName,
    category: data.category,
    description: data.description || "",
    requester: userId,
  });

  return request;
};

// Get active requests
export const getRequests = async () => {
  const requests = await Request.find({
    status: "active",
  })
    .populate("requester", "fullName department year profileImage")
    .sort({ createdAt: -1 });

  return requests;
};

// Delete own request
export const deleteRequest = async (requestId, userId) => {
  const request = await Request.findOne({
    _id: requestId,
    requester: userId,
  });

  if (!request) {
    throw new Error("Request not found or you are not the owner");
  }

  await request.deleteOne();

  return true;
};