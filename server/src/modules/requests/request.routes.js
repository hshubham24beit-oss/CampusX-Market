import express from "express";

import {
  createRequestController,
  getRequestsController,
  deleteRequestController,
} from "./request.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Get all active requests
router.get("/", getRequestsController);

// Create a new request
router.post("/", protect, createRequestController);

// Delete own request
router.delete("/:id", protect, deleteRequestController);

export default router;