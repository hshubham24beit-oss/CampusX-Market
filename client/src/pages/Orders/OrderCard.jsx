// src/pages/Orders/OrderCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import Avatar from "../../components/common/Avatar";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaComments,
  FaUser,
} from "react-icons/fa";

export default function OrderCard({
  order,
  isSeller = false,
  onStatusChange,
  updating = false,
}) {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <FaCheckCircle className="text-xs" />,
          label: "Accepted",
        };
      case "completed":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <FaCheckCircle className="text-xs" />,
          label: "Completed",
        };
      case "pending":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <FaClock className="text-xs" />,
          label: "Pending",
        };
      case "cancelled":
        return {
          bg: "bg-red-50 text-red-700 border-red-200",
          icon: <FaTimesCircle className="text-xs" />,
          label: "Cancelled",
        };
      default:
        return {
          bg: "bg-gray-50 text-gray-700 border-gray-200",
          icon: null,
          label: status || "Unknown",
        };
    }
  };

  const statusInfo = getStatusBadge(order.status);
  const product = order.product;
  const otherParty = isSeller ? order.buyer : order.seller;

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs mb-4 hover:shadow-md transition duration-200">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-gray-400 uppercase tracking-wider text-[11px]">
            ORDER #{order._id?.slice(-6).toUpperCase()}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 font-medium">{formattedDate}</span>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.bg}`}
        >
          {statusInfo.icon}
          {statusInfo.label}
        </span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 py-4 items-center">
        {/* Product Details (6 cols) */}
        <div className="md:col-span-6 flex items-center gap-4 min-w-0">
          <div className="w-18 h-18 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center shrink-0 border border-gray-100">
            {product?.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaBoxOpen className="text-2xl text-gray-300" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-extrabold text-sm md:text-base text-gray-900 truncate">
              {product?.title || "Product listing"}
            </h3>
            <p className="font-black text-indigo-600 text-base mt-0.5">
              {formatPrice(order.price)}
            </p>
            {product?._id && (
              <Link
                to={`/products/${product._id}`}
                className="text-xs text-indigo-600 font-bold hover:underline inline-block mt-1"
              >
                View Product Details →
              </Link>
            )}
          </div>
        </div>

        {/* Counterparty info (3 cols) */}
        <div className="md:col-span-3 text-xs space-y-1">
          <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">
            {isSeller ? "Buyer" : "Seller"}
          </p>
          {otherParty?._id ? (
            <Link
              to={`/profile/${otherParty._id}`}
              className="flex items-center gap-2 group/counterparty"
              title="View profile"
            >
              <Avatar
                src={otherParty?.profileImage}
                name={otherParty?.fullName || "Student"}
                textClassName="text-[9px]"
                className="w-6 h-6 rounded-full object-cover ring-2 ring-white group-hover/counterparty:ring-indigo-100 transition"
              />
              <span className="font-bold text-gray-800 truncate group-hover/counterparty:text-indigo-600 transition">
                {otherParty?.fullName || "Campus Student"}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Avatar
                src={otherParty?.profileImage}
                name={otherParty?.fullName || "Student"}
                textClassName="text-[9px]"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-bold text-gray-800 truncate">
                {otherParty?.fullName || "Campus Student"}
              </span>
            </div>
          )}
          {otherParty?.department && (
            <p className="text-[11px] text-gray-500 font-medium">
              {otherParty.department} {otherParty.year ? `• ${otherParty.year}` : ""}
            </p>
          )}
        </div>

        {/* Actions (3 cols) */}
        <div className="md:col-span-3 flex flex-col items-start md:items-end justify-center gap-2">
          {/* Seller Status Controls */}
          {isSeller && order.status === "pending" && (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                disabled={updating}
                onClick={() => onStatusChange(order._id, "accepted")}
                className="flex-1 md:flex-initial bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer disabled:opacity-60"
              >
                Accept
              </button>
              <button
                disabled={updating}
                onClick={() => onStatusChange(order._id, "cancelled")}
                className="flex-1 md:flex-initial border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer disabled:opacity-60"
              >
                Decline
              </button>
            </div>
          )}

          {isSeller && order.status === "accepted" && (
            <button
              disabled={updating}
              onClick={() => onStatusChange(order._id, "completed")}
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs disabled:opacity-60"
            >
              ✓ Mark as Completed
            </button>
          )}

          {/* Chat & Profile with Counterparty */}
          {otherParty?._id && (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Link
                to={`/profile/${otherParty._id}`}
                className="inline-flex flex-1 md:flex-initial items-center justify-center gap-1.5 text-xs font-bold text-gray-600 hover:text-indigo-700 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-100 px-3.5 py-2 rounded-xl transition"
              >
                <FaUser className="text-xs" /> Profile
              </Link>

              <Link
                to={`/chat?seller=${otherParty._id}&product=${product?._id || ""}`}
                className="inline-flex flex-1 md:flex-initial items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50/60 hover:bg-indigo-50 px-3.5 py-2 rounded-xl transition"
              >
                <FaComments className="text-xs" /> Chat
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Delivery / Pickup Notes footer */}
      {order.deliveryDetails && (order.deliveryDetails.address || order.deliveryDetails.phone) && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs text-gray-600">
          {order.deliveryDetails.address && (
            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>
                <strong className="text-gray-700">Pickup Note:</strong>{" "}
                {order.deliveryDetails.address}
              </span>
            </div>
          )}
          {order.deliveryDetails.phone && (
            <div className="flex items-center gap-1.5">
              <FaPhoneAlt className="text-gray-400" />
              <span>
                <strong className="text-gray-700">Phone:</strong>{" "}
                {order.deliveryDetails.phone}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}