import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import {
    getMyProfile,
    updateMyProfile,
    getUserById
} from "./user.controller.js";

const router = express.Router();

router.get("/profile", protect, getMyProfile);

router.put("/profile", protect, updateMyProfile);

router.get("/:id", getUserById);

export default router;