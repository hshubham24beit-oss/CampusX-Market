import React, { useState, useContext, useEffect } from "react";
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaThLarge, FaHeart, FaShoppingCart, FaClipboardList, 
  FaComments, FaPlusCircle, FaUser, FaSearch, FaBell, FaRobot, FaTimes,
  FaBullhorn
} from 'react-icons/fa';
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { notificationAPI } from "../api/notification.api";
import Avatar from "../components/common/Avatar";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
  const [showAiModal, setShowAiModal] = useState(false);
  const [search, setSearch] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    let active = true;

    const fetchUnread = async () => {
      if (!user) {
        setUnreadCount(0);
        return;
      }

      try {
        const res = await notificationAPI.getMyNotifications();
        const notifications = res.data || [];

        if (active) {
          setUnreadCount(
            notifications.filter((item) => !item.isRead).length
          );
        }
      } catch (error) {
        if (active) {
          setUnreadCount(0);
        }
      }
    };

    fetchUnread();

    return () => {
      active = false;
    };
  }, [user, location.pathname]);

  // Smoothly reset scroll position on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F4F6F9] text-gray-800 font-sans antialiased pb-20 md:pb-0">
      
      {/* ==================== DESKTOP LEFT SIDEBAR ==================== */}
      <aside className="w-64 bg-white border-r border-gray-200/80 p-5 flex flex-col justify-between hidden md:flex shrink-0 sticky top-0 h-screen overflow-y-auto z-30">
        <div>
          {/* Logo Header */}
          <div className="flex items-center gap-3 mb-8 px-2 pt-1">
            <div className="bg-indigo-600 text-white font-black text-2xl w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
              M
            </div>
            <div>
              <h1 className="font-extrabold text-xl leading-none text-gray-900 tracking-tight">CampusX</h1>
              <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-widest">Market</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { path: '/', label: 'Home', icon: <FaHome className="text-lg" /> },
              { path: '/categories', label: 'Categories', icon: <FaThLarge className="text-lg" /> },
              { path: '/wishlist', label: 'Wishlist', icon: <FaHeart className="text-lg" /> },
              {
                path: '/cart',
                label: 'Cart',
                icon: <FaShoppingCart className="text-lg" />,
                badge: cartCount > 0 ? cartCount : null,
              },
              { path: '/orders', label: 'My Orders', icon: <FaClipboardList className="text-lg" /> },
              { path: '/requests', label: 'Requests', icon: <FaBullhorn className="text-lg" /> },
              {
                path: '/notifications',
                label: 'Notifications',
                icon: <FaBell className="text-lg" />,
                badge: unreadCount > 0 ? unreadCount : null,
              },
              { path: '/chat', label: 'Chats', icon: <FaComments className="text-lg" /> },
              { path: '/sell', label: 'Sell Product', icon: <FaPlusCircle className="text-lg" /> },
              { path: '/profile', label: 'My Profile', icon: <FaUser className="text-lg" /> },
            ].map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive(link.path) 
                    ? 'bg-gradient-to-r from-indigo-50 to-violet-50/70 text-indigo-600 font-bold' 
                    : 'text-gray-600 hover:bg-indigo-50/50 hover:text-indigo-600'
                }`}
              >
                {isActive(link.path) && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-to-b from-indigo-500 to-violet-500" />
                )}
                <div className="flex items-center gap-3.5">
                  {link.icon} {link.label}
                </div>
                {link.badge && (
                  <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop AI Assistant Widget */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100/60 p-4 rounded-2xl border border-indigo-100 mt-6 shrink-0 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-xs">
                <FaRobot className="text-sm" />
              </div>
              <h4 className="font-bold text-sm text-gray-800">AI Assistant</h4>
            </div>
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
          </div>
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">Get smart suggestions & instant price estimates.</p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200 cursor-pointer">
            Try AI Assistant ✨
          </button>
        </div>
      </aside>

      {/* ==================== RIGHT MAIN CONTAINER ==================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Global Top Navigation Header */}
        <header className="bg-white px-3 md:px-8 py-3.5 flex flex-wrap items-center justify-between border-b border-gray-200/80 sticky top-0 z-20 shadow-xs gap-2 md:gap-3">
          
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 md:hidden shrink-0 order-1 md:order-none">
            <div className="bg-indigo-600 text-white font-black text-lg w-8 h-8 rounded-lg flex items-center justify-center">
              M
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="order-3 md:order-none w-full md:w-auto md:flex-1 md:max-w-xl relative mt-1 md:mt-0">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..." 
              className="w-full pl-4 pr-10 md:pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-600 focus:bg-white transition"
            />
            <button 
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-1.5 md:p-2 rounded-full hover:bg-indigo-700 transition shadow-xs cursor-pointer"
            >
              <FaSearch className="text-[10px] md:text-xs" />
            </button>
          </form>

          {/* Right Header Icons (Mobile Friendly Icons Included) */}
          <div className="order-2 md:order-none flex items-center gap-1.5 sm:gap-2.5 md:gap-6 shrink-0">
            
            {/* Wishlist Header Icon (Visible on Mobile & Desktop) */}
            <Link 
              to="/wishlist" 
              className={`p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition ${isActive('/wishlist') ? 'text-indigo-600 bg-indigo-50' : ''}`}
              title="Wishlist"
            >
              <FaHeart className="text-base md:text-xl" />
            </Link>

            {/* Requests Header Icon (Visible on Mobile & Desktop) */}
            <Link 
              to="/requests" 
              className={`p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition ${isActive('/requests') ? 'text-indigo-600 bg-indigo-50' : ''}`}
              title="Requests"
            >
              <FaBullhorn className="text-base md:text-xl" />
            </Link>

            {/* Chats / Messages Header Icon (Visible on Mobile & Desktop) */}
            <Link 
              to="/chat" 
              className={`relative p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition ${isActive('/chat') ? 'text-indigo-600 bg-indigo-50' : ''}`}
              title="Chats"
            >
              <FaComments className="text-base md:text-xl" />
            </Link>

            {/* Notifications */}
            <Link
              to="/notifications"
              className={`relative p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition ${isActive('/notifications') ? 'text-indigo-600 bg-indigo-50' : ''}`}
              title="Notifications"
            >
              <FaBell className="text-base md:text-xl" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-extrabold min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center border border-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                {/* Profile */}
                <Link to="/profile" className="flex items-center gap-2 md:pl-4 md:border-l border-gray-200">
                    <Avatar
                      src={user?.profileImage}
                      name={user?.fullName}
                      textClassName="text-[11px]"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="hidden sm:block">
                    <p className="text-xs md:text-sm font-extrabold text-gray-900 leading-tight">{user?.fullName}</p>
                    <p className="text-[10px] md:text-xs text-indigo-600 font-bold">{user?.year} {user?.department} ▾</p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="ml-2 md:ml-4 bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition">
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition"
              >
                Login
              </Link>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-8">
          <div key={location.pathname} className="animate-fade-in">
            <Outlet />
          </div>
        </main>

      </div>

      {/* ==================== MOBILE AI ASSISTANT FLOATING BUTTON ==================== */}
      <button 
        onClick={() => setShowAiModal(true)}
        className="fixed bottom-20 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3.5 rounded-full shadow-xl shadow-indigo-300 md:hidden z-30 active:scale-95 transition flex items-center gap-2"
      >
        <FaRobot className="text-lg" />
        <span className="text-xs font-black tracking-wide pr-1">AI Help</span>
      </button>

      {/* ==================== MOBILE AI ASSISTANT MODAL ==================== */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-end justify-center md:hidden p-4">
          <div className="bg-white w-full rounded-3xl p-6 border border-gray-100 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="bg-indigo-600 text-white p-2.5 rounded-xl">
                  <FaRobot className="text-lg" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">CampusX AI Assistant</h3>
                  <p className="text-[11px] text-gray-500 font-medium">Smart price helper & recommendations</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAiModal(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            
            <p className="text-xs text-gray-600 mb-5 leading-relaxed bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
              Need help pricing a book or laptop? Ask our AI assistant for fair market estimates on campus!
            </p>

            <button 
              onClick={() => setShowAiModal(false)}
              className="w-full bg-indigo-600 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md shadow-indigo-200"
            >
              Start AI Chat ✨
            </button>
          </div>
        </div>
      )}

      {/* ==================== MOBILE BOTTOM NAVIGATION BAR ==================== */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200/80 px-2 py-2 flex items-center justify-around md:hidden z-40 shadow-lg">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}
        >
          <FaHome className="text-lg" />
          <span className="text-[10px]">Home</span>
        </Link>

        <Link 
          to="/categories" 
          className={`flex flex-col items-center gap-1 ${isActive('/categories') ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}
        >
          <FaThLarge className="text-lg" />
          <span className="text-[10px]">Categories</span>
        </Link>

        {/* Sell Button */}
        <Link 
          to="/sell" 
          className="flex flex-col items-center justify-center -mt-5 bg-indigo-600 text-white p-3 rounded-full shadow-lg shadow-indigo-200 active:scale-95 transition"
        >
          <FaPlusCircle className="text-xl" />
        </Link>

        {/* Orders Link */}
        <Link 
          to="/orders" 
          className={`flex flex-col items-center gap-1 ${isActive('/orders') ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}
        >
          <FaClipboardList className="text-lg" />
          <span className="text-[10px]">Orders</span>
        </Link>

        {/* Cart Link */}
        <Link 
          to="/cart" 
          className={`flex flex-col items-center gap-1 relative ${isActive('/cart') ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}
        >
          <FaShoppingCart className="text-lg" />
          <span className="text-[10px]">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-1 bg-indigo-600 text-white text-[9px] font-black min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </Link>
      </nav>

    </div>
  );
}