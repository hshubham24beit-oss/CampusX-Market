import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import {
    getMyProfile,
    updateMyProfile,
    getUserById
} from "./user.controller.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

router.get("/profile", protect, getMyProfile);

router.put(
    "/profile",
    protect,
    upload.single("profileImage"),
    updateMyProfile
);

router.get("/:id", getUserById);

export default router;