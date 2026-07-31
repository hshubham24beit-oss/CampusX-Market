import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function WishlistCard({ title, desc, price, img, onMoveToCart, onRemove }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs hover:shadow-lg transition duration-200 flex flex-col justify-between relative group">
      {/* Heart Icon (Remove from Wishlist) */}
      <button 
        onClick={onRemove}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2 rounded-full text-red-500 hover:scale-110 transition shadow-xs z-10 cursor-pointer"
        title="Remove from Wishlist"
      >
        <FaHeart className="text-sm" />
      </button>

      <div>
        {/* Product Image */}
        <div className="h-44 rounded-xl overflow-hidden mb-4 bg-gray-50 flex items-center justify-center p-2">
          <img 
            src={img} 
            alt={title} 
            className="h-full object-contain group-hover:scale-105 transition duration-300" 
          />
        </div>

        {/* Product Details */}
        <h3 className="font-extrabold text-sm text-gray-900 leading-snug line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-400 font-medium mt-0.5 mb-3">
          {desc}
        </p>
        <p className="font-black text-lg text-gray-900 mb-4">
          ₹{price}
        </p>
      </div>

      {/* Move to Cart Action Button */}
      <button 
        onClick={onMoveToCart}
        className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold text-xs py-2.5 rounded-xl transition duration-200 cursor-pointer active:scale-95"
      >
        Move to Cart
      </button>
    </div>
  );
}