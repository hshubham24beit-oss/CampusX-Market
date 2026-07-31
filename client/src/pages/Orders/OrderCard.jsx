import React from 'react';

export default function OrderCard({ order }) {
  // Status Badge Colors
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'delivered':
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 transition duration-200 hover:border-gray-300">
      
      {/* Product Thumbnail & Details */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-xl overflow-hidden p-2 flex items-center justify-center shrink-0 border border-gray-100">
          <img 
            src={order.img} 
            alt={order.title} 
            className="h-full object-contain" 
          />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
            ORDER #{order.orderId}
          </span>
          <h3 className="font-extrabold text-sm md:text-base text-gray-900 truncate">
            {order.title}
          </h3>
          <p className="font-black text-sm md:text-base text-gray-900 mt-1 sm:hidden">
            ₹{order.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Price (Desktop) */}
      <div className="hidden sm:block text-left shrink-0">
        <p className="font-black text-base text-gray-900">
          ₹{order.price.toLocaleString()}
        </p>
      </div>

      {/* Status & Delivery Date */}
      <div className="flex sm:flex-col items-center sm:items-start justify-between shrink-0 gap-1">
        <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${getStatusBadge(order.status)}`}>
          {order.status}
        </span>
        <span className="text-[11px] text-gray-500 font-medium">
          {order.status === 'Delivered' ? `Delivered on: ${order.date}` : `Expected delivery: ${order.date}`}
        </span>
      </div>

      {/* Action Button */}
      <div className="shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 flex justify-end">
        <button className="w-full sm:w-auto border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold text-xs px-5 py-2.5 rounded-xl transition duration-200 cursor-pointer active:scale-95">
          {order.status === 'Delivered' ? 'View Details' : 'Track Order'}
        </button>
      </div>

    </div>
  );
}