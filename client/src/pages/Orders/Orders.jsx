// src/pages/Orders/Orders.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import { orderAPI } from "../../api/order.api";
import Loader from "../../components/common/Loader";

export default function Orders() {
  const [viewMode, setViewMode] = useState("buyer"); // "buyer" | "seller"
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res =
        viewMode === "buyer"
          ? await orderAPI.getMyOrders()
          : await orderAPI.getReceivedOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error("Orders fetch error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [viewMode]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      await orderAPI.updateOrderStatus(orderId, newStatus);
      showToast(`Order status updated to ${newStatus}`);
      await fetchOrders();
    } catch (err) {
      console.error("Status update error:", err);
      showToast(err.response?.data?.message || "Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const tabs = ["All", "Pending", "Accepted", "Completed", "Cancelled"];

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "All") return true;
    return order.status?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xl animate-fade-in">
          {toast}
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <Link to="/" className="hover:text-indigo-600 transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-indigo-600 font-bold">Orders</span>
      </nav>

      {/* Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Orders Dashboard
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Track your campus purchases and manage sales orders
          </p>
        </div>

        {/* Buyer / Seller Toggle */}
        <div className="bg-gray-100 p-1 rounded-2xl flex items-center self-start sm:self-auto border border-gray-200/80">
          <button
            onClick={() => setViewMode("buyer")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              viewMode === "buyer"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            🛒 My Purchases
          </button>
          <button
            onClick={() => setViewMode("seller")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              viewMode === "seller"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            📦 My Sales (Received)
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-gray-200/80 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs md:text-sm font-extrabold rounded-xl transition shrink-0 cursor-pointer ${
              activeTab === tab
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-gray-500 hover:text-indigo-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <Loader text="Loading orders..." />
      ) : filteredOrders.length > 0 ? (
        <div>
          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              isSeller={viewMode === "seller"}
              onStatusChange={handleStatusChange}
              updating={updating}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-xs max-w-md mx-auto mt-8">
          <span className="text-5xl mb-4 block">📦</span>
          <h3 className="font-extrabold text-lg text-gray-900 mb-1">
            No orders found
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            {viewMode === "buyer"
              ? `You don't have any purchases under "${activeTab}".`
              : `You haven't received any sales orders under "${activeTab}".`}
          </p>
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