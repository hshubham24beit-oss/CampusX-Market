// src/components/notification/NotificationCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaShoppingCart,
  FaComments,
  FaStar,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

export default function NotificationCard({
  notification,
  onMarkRead,
  onDelete,
}) {
  const getIcon = () => {
    switch (notification.type) {
      case "product":
        return <FaShoppingCart className="text-indigo-600" />;
      case "message":
        return <FaComments className="text-blue-500" />;
      case "review":
        return <FaStar className="text-amber-500" />;
      default:
        return <FaBell className="text-indigo-500" />;
    }
  };

  const getTargetLink = () => {
    if (notification.type === "message") return "/chat";
    if (notification.type === "product") return "/orders";
    if (notification.relatedProduct?._id)
      return `/products/${notification.relatedProduct._id}`;
    return "#";
  };

  const formattedDate = notification.createdAt
    ? new Date(notification.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={`p-4 rounded-2xl border transition duration-200 flex items-start justify-between gap-4 ${
        notification.isRead
          ? "bg-white border-gray-100 hover:border-gray-200"
          : "bg-indigo-50/40 border-indigo-100 shadow-xs"
      }`}
    >
      <div className="flex items-start gap-3.5 min-w-0 flex-1">
        {/* Type Icon */}
        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-center shrink-0 text-base">
          {getIcon()}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <Link to={getTargetLink()} className="block group">
            <p className="text-xs md:text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition leading-snug">
              {notification.message}
            </p>
          </Link>

          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-500 font-medium">
            {notification.sender?.fullName && (
              <>
                <span className="font-semibold text-gray-700">
                  {notification.sender.fullName}
                </span>
                <span>•</span>
              </>
            )}
            <span>{formattedDate}</span>
          </div>

          {notification.relatedProduct?.title && (
            <p className="text-[11px] text-indigo-600 font-semibold mt-1 truncate">
              Product: {notification.relatedProduct.title}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 shrink-0">
        {!notification.isRead && onMarkRead && (
          <button
            onClick={() => onMarkRead(notification._id)}
            title="Mark as read"
            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
          >
            <FaCheck className="text-xs" />
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(notification._id)}
            title="Delete notification"
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
          >
            <FaTrash className="text-xs" />
          </button>
        )}
      </div>
    </div>
  );
}
