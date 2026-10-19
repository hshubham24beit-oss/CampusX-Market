import React from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "../../components/common/Avatar";

export default function WishlistCard({
  id,
  title,
  desc,
  price,
  img,
  condition,
  seller,
  category,
  onMoveToCart,
  onRemove,
}) {
  return (
    <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs hover:shadow-lg transition duration-200 relative group">

      {/* =========================
          PRODUCT LINK
      ========================= */}
      <Link to={`/products/${id}`}>

        {/* Product Image */}
        <div className="h-44 rounded-xl overflow-hidden mb-4 bg-gray-50 flex items-center justify-center relative">

          {img ? (
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <span className="text-4xl">📦</span>
              <span className="text-xs mt-1 font-semibold">
                No Image
              </span>
            </div>
          )}

          {/* Condition */}
          {condition && (
            <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white font-bold text-[10px] px-2 py-1 rounded-md">
              {condition}
            </span>
          )}

        </div>

        {/* Product Title */}
        <h3 className="font-extrabold text-sm text-gray-900 leading-snug line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-400 font-medium mt-1 mb-2 line-clamp-2">
          {desc || "No description available"}
        </p>

        {/* Category */}
        {category?.name && (
          <span className="inline-block bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-md mb-3">
            {category.name}
          </span>
        )}

        {/* Price */}
        <p className="font-black text-lg text-gray-900 mb-3">
          ₹{Number(price).toLocaleString("en-IN")}
        </p>

        {/* Seller */}
        {seller && (
          <div className="flex items-center gap-2 mb-4 pt-3 border-t border-gray-100">

            <Avatar
              src={seller.profileImage}
              name={seller.fullName || "User"}
              textClassName="text-[10px]"
              className="w-7 h-7 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-700 truncate">
                {seller.fullName || "Unknown Seller"}
              </p>

              <p className="text-[10px] text-gray-400">
                {seller.department || ""}
                {seller.year ? ` • ${seller.year}` : ""}
              </p>
            </div>

          </div>
        )}

      </Link>

      {/* =========================
          ACTION BUTTONS
      ========================= */}
      <div className="flex gap-2 mt-2">

        {/* REMOVE BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (onRemove) {
              onRemove();
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs py-2.5 rounded-xl transition duration-200 active:scale-95"
        >
          <FaTrash className="text-[10px]" />
          Remove
        </button>

        {/* MOVE TO CART */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (onMoveToCart) {
              onMoveToCart();
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold text-xs py-2.5 rounded-xl transition duration-200 active:scale-95"
        >
          🛒
          Move to Cart
        </button>

      </div>

    </div>
  );
}