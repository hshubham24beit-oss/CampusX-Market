// src/components/chat/MessageBubble.jsx
import React from "react";
import { FaCheckDouble } from "react-icons/fa";
import Avatar from "../common/Avatar";

export default function MessageBubble({ message, isMe, senderAvatar, senderName }) {
  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={`flex items-end gap-2 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMe && (
        <Avatar
          src={senderAvatar}
          name={senderName || "Sender"}
          textClassName="text-[10px]"
          className="w-7 h-7 rounded-xl object-cover shrink-0 mb-1 ring-2 ring-white shadow-sm"
        />
      )}

      <div
        className={`max-w-[82%] sm:max-w-[65%] px-4 py-2.5 text-xs md:text-sm ${
          isMe
            ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl rounded-br-md shadow-md shadow-indigo-200/60 font-medium"
            : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-md shadow-sm font-medium"
        }`}
      >
        <p className="leading-relaxed whitespace-pre-wrap break-words">
          {message.message}
        </p>
        <div
          className={`flex items-center gap-1 justify-end mt-1.5 text-[10px] ${
            isMe ? "text-indigo-100/90" : "text-gray-400"
          }`}
        >
          <span>{formattedTime}</span>
          {isMe && <FaCheckDouble className="text-[9px]" />}
        </div>
      </div>
    </div>
  );
}
