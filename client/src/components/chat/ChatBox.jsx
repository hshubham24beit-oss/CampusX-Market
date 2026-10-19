// src/components/chat/ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaPaperPlane,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaComments,
  FaCheckCircle,
} from "react-icons/fa";
import MessageBubble from "./MessageBubble";
import Avatar from "../common/Avatar";
import { formatPrice } from "../../utils/formatPrice";

const QUICK_REPLIES = [
  "Is this still available?",
  "Can we meet on campus?",
  "Is the price negotiable?",
];

export default function ChatBox({
  chat,
  currentUserId,
  onSendMessage,
  onBack,
  sending = false,
}) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-200 blur-2xl opacity-40 rounded-full" />
          <div className="relative w-20 h-20 rounded-[28px] bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center text-3xl shadow-xl shadow-indigo-200">
            <FaComments />
          </div>
        </div>

        <h3 className="font-black text-lg text-gray-900 mt-5">
          Pick a conversation
        </h3>
        <p className="text-xs text-gray-500 max-w-xs mt-1.5 leading-relaxed">
          Chat privately with buyers and sellers, agree on a price, and plan a
          safe campus handover.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["Share pickup details", "Confirm availability", "Negotiate politely"].map(
            (tip) => (
              <span
                key={tip}
                className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-2.5 py-1 rounded-full"
              >
                {tip}
              </span>
            )
          )}
        </div>
      </div>
    );
  }

  // Find the other participant
  const otherUser =
    chat.participants?.find(
      (p) => String(p._id || p) !== String(currentUserId)
    ) || {};

  const otherUserName = otherUser.fullName || "Campus Student";
  const otherUserAvatar = otherUser.profileImage || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || sending) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur px-3 md:px-5 py-3 border-b border-gray-200/80 flex items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl md:hidden cursor-pointer"
              title="Back to conversations"
            >
              <FaArrowLeft />
            </button>
          )}

          <Link
            to={`/profile/${otherUser._id}`}
            className="flex items-center gap-2.5 md:gap-3 min-w-0 group/profile"
            title="View profile"
          >
            <div className="relative shrink-0">
              <Avatar
                src={otherUserAvatar}
                name={otherUserName}
                textClassName="text-sm"
                className="w-10 h-10 md:w-11 md:h-11 rounded-2xl object-cover ring-2 ring-indigo-50 group-hover/profile:ring-indigo-200 transition"
              />
              <span className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute -bottom-0.5 -right-0.5"></span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-gray-900 truncate leading-tight group-hover/profile:text-indigo-600 transition">
                  {otherUserName}
                </h3>
                <FaCheckCircle
                  className="text-emerald-500 text-[10px] shrink-0"
                  title="Verified student"
                />
              </div>
              <p className="text-[10px] md:text-[11px] text-gray-500 font-semibold truncate">
                {otherUser.department || "Student"}
                {otherUser.year ? ` | ${otherUser.year}` : ""}
              </p>
            </div>
          </Link>
        </div>

        {/* Linked Product Badge */}
        {chat.product && (
          <>
            <Link
              to={`/products/${chat.product._id}`}
              className="hidden sm:flex items-center gap-2.5 bg-white border border-gray-200 hover:border-indigo-200 p-1.5 pr-3 rounded-2xl shrink-0 max-w-[240px] transition group"
              title="View product"
            >
              {chat.product.images?.[0] ? (
                <img
                  src={chat.product.images[0]}
                  alt="Product"
                  className="w-9 h-9 rounded-xl object-cover shrink-0"
                />
              ) : (
                <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-400 flex items-center justify-center text-xs shrink-0">
                  <FaComments />
                </span>
              )}
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold text-gray-900 truncate">
                  {chat.product.title}
                </p>
                <p className="text-[10px] font-black text-indigo-600">
                  {formatPrice(chat.product.price)}
                </p>
              </div>
              <FaExternalLinkAlt className="text-[9px] text-gray-300 group-hover:text-indigo-500 transition shrink-0" />
            </Link>

            <Link
              to={`/products/${chat.product._id}`}
              className="sm:hidden w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs shrink-0"
              title="View product"
            >
              <FaExternalLinkAlt />
            </Link>
          </>
        )}
      </div>

      {/* Message Thread */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3.5 bg-[#F7F8FC] bg-[radial-gradient(#dfe3ee_1px,transparent_1px)] [background-size:18px_18px]">
        <div className="flex justify-center pb-1">
          <span className="bg-white/90 border border-gray-200 text-gray-400 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
            Today
          </span>
        </div>

        {chat.messages && chat.messages.length > 0 ? (
          chat.messages.map((msg, idx) => {
            const senderId = msg.sender?._id || msg.sender;
            const isMe = String(senderId) === String(currentUserId);
            return (
              <MessageBubble
                key={msg._id || idx}
                message={msg}
                isMe={isMe}
                senderAvatar={otherUserAvatar}
                senderName={otherUserName}
              />
            );
          })
        ) : (
          <div className="text-center py-10">
            <img
              src={otherUserAvatar}
              alt={otherUserName}
              className="w-14 h-14 rounded-2xl object-cover mx-auto ring-4 ring-white shadow-sm"
            />
            <p className="text-sm font-extrabold text-gray-800 mt-3">
              Say hello to {otherUserName}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              Start with a quick question about the item.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-md mx-auto">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => onSendMessage(reply)}
                  disabled={sending}
                  className="bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 text-gray-600 text-[11px] font-bold px-3 py-2 rounded-xl transition disabled:opacity-50 cursor-pointer"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 md:p-4 bg-white border-t border-gray-200/80 shrink-0"
      >
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-1.5 pl-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 transition">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${otherUserName}...`}
            className="flex-1 bg-transparent py-2 text-xs md:text-sm font-medium text-gray-800 placeholder-gray-400 outline-none"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || sending}
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95 disabled:opacity-40 text-white rounded-xl transition shadow-md shadow-indigo-200 cursor-pointer shrink-0"
            title="Send message"
          >
            <FaPaperPlane className="text-xs" />
          </button>
        </div>
      </form>
    </div>
  );
}
