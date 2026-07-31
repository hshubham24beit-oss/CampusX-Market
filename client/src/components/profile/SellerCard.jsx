import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaComments, FaListAlt, FaHeart, FaChevronRight } from 'react-icons/fa';

export default function SellerCard() {
  const quickLinks = [
    { label: 'My Orders', icon: <FaShoppingBag className="text-indigo-600 text-sm" />, path: '/orders' },
    { label: 'My Chats', icon: <FaComments className="text-indigo-600 text-sm" />, path: '/chat' },
    { label: 'My Listings', icon: <FaListAlt className="text-indigo-600 text-sm" />, path: '/sell' },
    { label: 'Wishlist', icon: <FaHeart className="text-indigo-600 text-sm" />, path: '/wishlist' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
      <h3 className="text-base font-black text-gray-900 mb-4 border-b border-gray-100 pb-3">
        Quick Links
      </h3>

      <nav className="space-y-1">
        {quickLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/60 transition group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-white transition">
                {link.icon}
              </div>
              <span className="text-xs font-bold text-gray-800 group-hover:text-indigo-600">
                {link.label}
              </span>
            </div>
            <FaChevronRight className="text-[10px] text-gray-300 group-hover:text-indigo-600 transition" />
          </Link>
        ))}
      </nav>
    </div>
  );
}