// src/pages/Notifications/Notifications.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaCheckDouble, FaTrash } from "react-icons/fa";
import { notificationAPI } from "../../api/notification.api";
import NotificationCard from "../../components/notification/NotificationCard";
import Loader from "../../components/common/Loader";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationAPI.getMyNotifications();
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Notifications error:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      showToast("Marked as read");
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    for (const n of unread) {
      try {
        await notificationAPI.markAsRead(n._id);
      } catch (e) {
        console.error(e);
      }
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast("All marked as read");
  };

  const handleDelete = async (id) => {
    try {
      await notificationAPI.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      showToast("Notification deleted");
    } catch (err) {
      console.error(err);
    }
  };

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xl animate-fade-in">
          {toast}
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <Link to="/" className="hover:text-indigo-600 transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-indigo-600 font-bold">Notifications</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Notifications
            {unreadCount > 0 && (
              <span className="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                {unreadCount} new
              </span>
            )}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Updates on your products, orders, reviews, and messages
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 bg-indigo-50/50 px-3.5 py-2 rounded-xl transition cursor-pointer self-start sm:self-auto"
          >
            <FaCheckDouble className="text-xs" /> Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
            filter === "all"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
            filter === "unread"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <Loader text="Loading notifications..." />
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-xs max-w-md mx-auto">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
            <FaBell />
          </div>
          <h3 className="font-extrabold text-base text-gray-900 mb-1">
            No notifications
          </h3>
          <p className="text-xs text-gray-500">
            {filter === "unread"
              ? "You have caught up with all notifications!"
              : "You don't have any notifications yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onMarkRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
