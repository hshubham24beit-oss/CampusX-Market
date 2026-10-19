// src/pages/Chat/Chat.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaComments, FaTimes, FaChevronRight } from "react-icons/fa";
import { chatAPI } from "../../api/chat.api";
import { AuthContext } from "../../context/AuthContext";
import ChatBox from "../../components/chat/ChatBox";
import Avatar from "../../components/common/Avatar";
import Loader from "../../components/common/Loader";

const formatChatTime = (value) => {
  if (!value) return "";

  const date = new Date(value);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};

export default function Chat() {
  const [searchParams] = useSearchParams();
  const sellerParam = searchParams.get("seller");
  const productParam = searchParams.get("product");

  const { user } = useContext(AuthContext);

  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingActiveChat, setLoadingActiveChat] = useState(false);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Poll timer ref
  const pollRef = useRef(null);

  // 1. Fetch user's chats
  const fetchChats = async () => {
    try {
      const res = await chatAPI.getMyChats();
      const chatList = res.data || [];
      setChats(chatList);
      return chatList;
    } catch (err) {
      console.error("Fetch chats error:", err);
      return [];
    } finally {
      setLoadingChats(false);
    }
  };

  // 2. Initial load and check for ?seller= URL params
  useEffect(() => {
    const initChats = async () => {
      setLoadingChats(true);
      const chatList = await fetchChats();

      if (sellerParam) {
        try {
          const res = await chatAPI.createChat(sellerParam, productParam || null);
          const newOrExistingChat = res.data;
          await fetchChats();
          setSelectedChatId(newOrExistingChat._id);
          setShowMobileChat(true);
        } catch (err) {
          console.error("Create chat from seller param error:", err);
        }
      } else if (chatList.length > 0 && !selectedChatId) {
        setSelectedChatId(chatList[0]._id);
      }
    };

    initChats();
  }, [sellerParam, productParam]);

  // 3. Fetch active chat whenever selectedChatId changes
  const fetchActiveChat = async (chatId, isSilent = false) => {
    if (!chatId) return;
    try {
      if (!isSilent) setLoadingActiveChat(true);
      const res = await chatAPI.getChatById(chatId);
      setActiveChat(res.data);
    } catch (err) {
      console.error("Fetch active chat error:", err);
    } finally {
      if (!isSilent) setLoadingActiveChat(false);
    }
  };

  useEffect(() => {
    if (selectedChatId) {
      fetchActiveChat(selectedChatId);
    } else {
      setActiveChat(null);
    }
  }, [selectedChatId]);

  // 4. Polling for new messages in active chat
  useEffect(() => {
    if (!selectedChatId) return;

    if (pollRef.current) clearInterval(pollRef.current);

    pollRef.current = setInterval(() => {
      fetchActiveChat(selectedChatId, true);
    }, 4000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [selectedChatId]);

  // 5. Send message
  const handleSendMessage = async (messageText) => {
    if (!selectedChatId || !messageText.trim()) return;

    try {
      setSending(true);
      const res = await chatAPI.sendMessage(selectedChatId, messageText.trim());
      setActiveChat(res.data);
      // Refresh chat list so lastMessage updates
      fetchChats();
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setSending(false);
    }
  };

  const handleSelectContact = (chatId) => {
    setSelectedChatId(chatId);
    setShowMobileChat(true);
  };

  // Filter conversations
  const filteredChats = chats.filter((c) => {
    if (!searchQuery.trim()) return true;
    const otherUser = c.participants?.find(
      (p) => String(p._id || p) !== String(user?._id)
    );
    return otherUser?.fullName
      ?.toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex bg-white rounded-[28px] border border-gray-200/80 shadow-lg shadow-indigo-100/40 overflow-hidden">
      {/* ==================== LEFT SIDEBAR: CONVERSATIONS LIST ==================== */}
      <div
        className={`w-full md:w-[340px] lg:w-[380px] border-r border-gray-200/80 flex flex-col bg-white shrink-0 ${
          showMobileChat ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 px-5 pt-5 pb-4 text-white">
          <div className="absolute -top-12 -right-8 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-8 w-40 h-40 rounded-full bg-fuchsia-400/20 blur-2xl" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center text-base">
                <FaComments />
              </span>
              <div>
                <h2 className="text-lg font-black tracking-tight leading-tight">
                  Messages
                </h2>
                <p className="text-[11px] text-indigo-100/90 font-medium">
                  Campus buyer-seller chats
                </p>
              </div>
            </div>

            <span className="bg-white/15 border border-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-sm">
              {chats.length}
            </span>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-100/80 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-9 py-2.5 bg-white/15 border border-white/20 rounded-xl text-xs font-semibold text-white placeholder-indigo-100/70 outline-none focus:bg-white/20 focus:border-white/40 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-100/80 hover:text-white transition cursor-pointer"
                title="Clear search"
              >
                <FaTimes className="text-[10px]" />
              </button>
            )}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loadingChats ? (
            <div className="p-8">
              <Loader text="Loading conversations..." />
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl mb-3">
                <FaComments />
              </div>
              <p className="text-sm font-extrabold text-gray-800">
                {searchQuery ? "No matching chats" : "No conversations yet"}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                {searchQuery
                  ? "Try a different name."
                  : "Start a chat from any product page to connect with a seller."}
              </p>

              {!searchQuery && (
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 mt-4 bg-indigo-50 text-indigo-600 border border-indigo-100 text-[11px] font-extrabold px-3 py-2 rounded-xl hover:bg-indigo-100 transition"
                >
                  Browse products
                  <FaChevronRight className="text-[9px]" />
                </Link>
              )}
            </div>
          ) : (
            filteredChats.map((c) => {
              const otherUser =
                c.participants?.find(
                  (p) => String(p._id || p) !== String(user?._id)
                ) || {};
              const otherUserName = otherUser.fullName || "Student";
              const otherUserAvatar = otherUser.profileImage || "";

              const isSelected = selectedChatId === c._id;
              const lastMsg =
                c.lastMessage ||
                (c.messages && c.messages.length > 0
                  ? c.messages[c.messages.length - 1].message
                  : "Started a conversation");

              return (
                <button
                  key={c._id}
                  type="button"
                  onClick={() => handleSelectContact(c._id)}
                  className={`w-full p-3 flex items-center gap-3 text-left cursor-pointer transition rounded-2xl border ${
                    isSelected
                      ? "bg-indigo-50/80 border-indigo-100 shadow-sm"
                      : "bg-white border-transparent hover:bg-gray-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <Avatar
                      src={otherUserAvatar}
                      name={otherUserName}
                      textClassName="text-sm"
                      className={`w-11 h-11 rounded-2xl object-cover ${
                        isSelected ? "ring-2 ring-indigo-200" : ""
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h4 className="font-extrabold text-xs md:text-sm text-gray-900 truncate">
                        {otherUserName}
                      </h4>
                      {c.lastMessageAt && (
                        <span
                          className={`text-[10px] font-semibold shrink-0 ${
                            isSelected ? "text-indigo-500" : "text-gray-400"
                          }`}
                        >
                          {formatChatTime(c.lastMessageAt)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <p className="text-[11px] text-gray-500 truncate font-medium">
                        {lastMsg}
                      </p>
                      {isSelected && (
                        <FaChevronRight className="text-[9px] text-indigo-400 ml-auto shrink-0" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ==================== RIGHT PANEL: ACTIVE CHAT ==================== */}
      <div
        className={`flex-1 flex flex-col bg-[#F7F8FC] min-w-0 ${
          showMobileChat ? "flex" : "hidden md:flex"
        }`}
      >
        {loadingActiveChat ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader text="Opening chat..." />
          </div>
        ) : (
          <ChatBox
            chat={activeChat}
            currentUserId={user?._id}
            onSendMessage={handleSendMessage}
            onBack={() => setShowMobileChat(false)}
            sending={sending}
          />
        )}
      </div>
    </div>
  );
}