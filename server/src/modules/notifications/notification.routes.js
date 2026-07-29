import express from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
    getMyNotifications,
    readNotification,
    removeNotification
} from "./notification.controller.js";


const router = express.Router();


// Get logged-in user's notifications
router.get(
    "/",
    protect,
    getMyNotifications
);


// Mark notification as read
router.put(
    "/:notificationId",
    protect,
    readNotification
);


// Delete notification
router.delete(
    "/:notificationId",
    protect,
    removeNotification
);


export default router;