import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../pages/Orders/OrderCard';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('All');

  const ordersList = [
    {
      id: 1,
      orderId: 'CX1234',
      title: 'iPhone 13',
      price: 35000,
      status: 'Confirmed',
      date: '30 Jul, 2026',
      img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop'
    },
    {
      id: 2,
      orderId: 'CX1233',
      title: 'Java Book',
      price: 350,
      status: 'Delivered',
      date: '25 Jul, 2026',
      img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop'
    },
    {
      id: 3,
      orderId: 'CX1232',
      title: 'Study Table',
      price: 2500,
      status: 'Pending',
      date: '2 Aug, 2026',
      img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&auto=format&fit=crop'
    }
  ];

  const tabs = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

  // Filter items based on active tab
  const filteredOrders = ordersList.filter(order => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Completed') return order.status === 'Delivered';
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <span>/</span>
        <span className="text-indigo-600 font-bold">My Orders</span>
      </nav>

      {/* Page Heading */}
      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">
        My Orders
      </h2>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-3 mb-6 border-b border-gray-200/80 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs md:text-sm font-extrabold rounded-xl transition shrink-0 cursor-pointer ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div>
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-xs max-w-md mx-auto mt-8">
          <span className="text-5xl mb-4 block">📦</span>
          <h3 className="font-extrabold text-lg text-gray-900 mb-1">No orders found</h3>
          <p className="text-xs text-gray-500 mb-6">You don't have any orders under "{activeTab}".</p>
          <Link 
            to="/products" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md shadow-indigo-200"
          >
            Explore Market
          </Link>
        </div>
      )}

    </div>
  );
}