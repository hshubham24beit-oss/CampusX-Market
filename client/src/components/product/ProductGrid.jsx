// src/components/product/ProductGrid.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { formatPrice } from "../../utils/formatPrice";
import Avatar from "../common/Avatar";

export default function ProductGrid({
  products = [],
  wishlist = [],
  onWishlistToggle,
  emptyMessage = "No products found",
}) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-12 text-center space-y-3">
        <p className="text-4xl">📦</p>
        <h4 className="font-extrabold text-sm text-gray-800">{emptyMessage}</h4>
        <p className="text-xs text-gray-500">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((item) => {
        const isSaved = wishlist.includes(item._id);
        const imageUrl = item.images?.[0];

        return (
          <Link
            key={item._id}
            to={`/products/${item._id}`}
            className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition duration-300 cursor-pointer relative group flex flex-col justify-between"
          >
            <div>
              {/* Wishlist Button */}
              {onWishlistToggle && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onWishlistToggle(item._id);
                  }}
                  className="absolute top-5 right-5 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-400 hover:text-red-500 transition shadow-xs z-10 active:scale-90"
                >
                  {isSaved ? (
                    <FaHeart className="text-xs text-red-500" />
                  ) : (
                    <FaRegHeart className="text-xs" />
                  )}
                </button>
              )}

              {/* Product Image */}
              <div className="h-44 rounded-xl overflow-hidden mb-3 bg-gray-100 relative">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <span className="text-3xl">📦</span>
                    <span className="text-[10px] mt-1 font-semibold">No Image</span>
                  </div>
                )}

                {/* Condition Badge */}
                {item.condition && (
                  <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                    {item.condition}
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                {item.category?.name && (
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
                    {item.category.name}
                  </span>
                )}
                <h4 className="font-bold text-sm text-gray-900 leading-snug line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Price & Seller */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="font-black text-base text-gray-900 mb-2">
                {formatPrice(item.price)}
              </p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Avatar
                    src={item.seller?.profileImage}
                    name={item.seller?.fullName || "Student"}
                    textClassName="text-[8px]"
                    className="w-5 h-5 rounded-full shrink-0 object-cover"
                  />
                  <p className="font-semibold text-gray-700 truncate text-[11px]">
                    {item.seller?.fullName || "Student"}
                  </p>
                </div>

                <span className="flex items-center gap-1 font-bold text-gray-800 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200 shrink-0 text-[10px]">
                  <FaStar className="text-amber-400 text-[10px]" />
                  {item.totalRatings
                    ? Number(item.averageRating || 0).toFixed(1)
                    : "New"}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
