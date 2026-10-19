import Chat from "./chat.model.js";
import User from "../users/user.model.js";
import { createNotification } from "../notifications/notification.service.js";

// Create or get existing chat
export const createChat = async (
    currentUserId,
    otherUserId,
    productId = null
) => {
    // Check other user exists
    const user = await User.findById(otherUserId);

    if (!user) {
        throw new Error("User not found.");
    }

    // Prevent chatting with yourself
    if (currentUserId.toString() === otherUserId.toString()) {
        throw new Error(
            "You cannot create chat with yourself."
        );
    }

    // Check existing chat between these 2 users
    let chat = await Chat.findOne({
        participants: {
            $all: [currentUserId, otherUserId]
        }
    });

    if (chat) {
        // If product provided and not set or changed, update it
        if (productId) {
            chat.product = productId;
            await chat.save();
        }

        await chat.populate("participants", "fullName department year profileImage");
        await chat.populate("product", "title price images");
        return chat;
    }

    // Create new chat
    chat = await Chat.create({
        participants: [
            currentUserId,
            otherUserId
        ],
        product: productId || null,
        lastMessage: "",
        lastMessageAt: new Date(),
        messages: []
    });

    await chat.populate("participants", "fullName department year profileImage");
    await chat.populate("product", "title price images");

    return chat;
};

// Get all chats of user
export const getUserChats = async (userId) => {
    const chats = await Chat.find({
        participants: userId
    })
    .populate(
        "participants",
        "fullName department year profileImage"
    )
    .populate(
        "product",
        "title price images"
    )
    .sort({
        updatedAt: -1
    });

    return chats;
};

// Get single chat with messages
export const getChatById = async (
    chatId,
    userId
) => {
    const chat = await Chat.findById(chatId)
    .populate(
        "participants",
        "fullName department year profileImage"
    )
    .populate(
        "product",
        "title price images seller"
    )
    .populate(
        "messages.sender",
        "fullName profileImage"
    );

    if (!chat) {
        throw new Error("Chat not found.");
    }

    // Security check
    const isParticipant = chat.participants.some(
        (user) => user._id.toString() === userId.toString()
    );

    if (!isParticipant) {
        throw new Error("You are not part of this chat.");
    }

    return chat;
};

// Send message
export const sendMessage = async (
    chatId,
    senderId,
    message
) => {
    const chat = await Chat.findById(chatId);

    if (!chat) {
        throw new Error("Chat not found.");
    }

    const isParticipant = chat.participants.some(
        (user) => user.toString() === senderId.toString()
    );

    if (!isParticipant) {
        throw new Error("You are not part of this chat.");
    }

    chat.messages.push({
        sender: senderId,
        message
    });

    chat.lastMessage = message;
    chat.lastMessageAt = new Date();

    await chat.save();

    // Find receiver
    const receiverId = chat.participants.find(
        (user) => user.toString() !== senderId.toString()
    );

    // Create notification
    if (receiverId) {
        await createNotification(
            receiverId,
            senderId,
            "message",
            "You received a new message"
        );
    }

    // Populate and return full chat
    await chat.populate("participants", "fullName department year profileImage");
    await chat.populate("product", "title price images");
    await chat.populate("messages.sender", "fullName profileImage");

    return chat;
};