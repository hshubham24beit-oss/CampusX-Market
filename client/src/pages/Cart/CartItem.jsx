import React from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs flex items-center justify-between gap-4 mb-4 transition duration-200 hover:border-gray-300">
      {/* Product Image & Information */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden p-2 flex items-center justify-center shrink-0 border border-gray-100">
          <img 
            src={item.img} 
            alt={item.title} 
            className="h-full object-contain" 
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-extrabold text-sm text-gray-900 truncate">
            {item.title}
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5 mb-2">
            {item.subtitle}
          </p>
          <p className="font-black text-base text-gray-900">
            ₹{item.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Quantity Selector & Trash Button */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
          <button 
            onClick={onDecrease} 
            className="p-2.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition cursor-pointer"
          >
            <FaMinus className="text-xs" />
          </button>
          <span className="px-3 font-extrabold text-sm text-gray-800">
            {item.quantity}
          </span>
          <button 
            onClick={onIncrease} 
            className="p-2.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition cursor-pointer"
          >
            <FaPlus className="text-xs" />
          </button>
        </div>

        <button 
          onClick={onRemove}
          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
          title="Remove item"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>
    </div>
  );
}