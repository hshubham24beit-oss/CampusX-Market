import express from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
    createNewChat,
    getMyChats,
    getSingleChat,
    sendNewMessage
} from "./chat.controller.js";


const router = express.Router();


// Create new chat / Get existing chat
router.post(
    "/",
    protect,
    createNewChat
);


// Get logged-in user's chats
router.get(
    "/",
    protect,
    getMyChats
);


// Get single chat with messages
router.get(
    "/:chatId",
    protect,
    getSingleChat
);


// Send message
router.post(
    "/:chatId/messages",
    protect,
    sendNewMessage
);


export default router;