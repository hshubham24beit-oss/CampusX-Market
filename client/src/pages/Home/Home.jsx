import React, { useState } from 'react';
import { 
  FaHeart, FaRegHeart, FaShieldAlt, FaStar, FaBolt, 
  FaTag, FaComments, FaFire, FaCheckCircle
} from 'react-icons/fa';
import Hero from '../../components/Hero/Hero';
import { Link, useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();

  // State for Category Filtering & Wishlist Items
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState([]);

  // Product Master Data (with category & condition tags)
  const allProducts = [
    { 
      id: 1,
      title: "iPhone 13", 
      desc: "128GB • Like New", 
      price: "35,000", 
      seller: "Shubham K.", 
      dept: "TY IT", 
      rating: "4.9", 
      category: "Electronics",
      condition: "Like New",
      img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop" 
    },
    { 
      id: 2,
      title: "Java Complete Reference", 
      desc: "Eleventh Edition • Good", 
      price: "350", 
      seller: "Ankita P.", 
      dept: "SY CE", 
      rating: "4.8", 
      category: "Books",
      condition: "Good",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop" 
    },
    { 
      id: 3,
      title: "Dell Inspiron 15", 
      desc: "8GB RAM • 512GB SSD", 
      price: "28,000", 
      seller: "Rohit S.", 
      dept: "TY IT", 
      rating: "4.7", 
      category: "Electronics",
      condition: "Used",
      img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop" 
    },
    { 
      id: 4,
      title: "Casio fx-991EX", 
      desc: "Scientific Calculator", 
      price: "1,200", 
      seller: "Aman T.", 
      dept: "SY IT", 
      rating: "4.9", 
      category: "Stationery",
      condition: "Like New",
      img: "https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=500&auto=format&fit=crop" 
    },
  ];

  const categories = [
    { name: 'All', icon: '🔥', bg: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { name: 'Books', icon: '📚', bg: 'bg-purple-50 border-purple-100' },
    { name: 'Electronics', icon: '💻', bg: 'bg-emerald-50 border-emerald-100' },
    { name: 'Furniture', icon: '🪑', bg: 'bg-amber-50 border-amber-100' },
    { name: 'Stationery', icon: '✏️', bg: 'bg-blue-50 border-blue-100' },
    { name: 'Sports', icon: '🏸', bg: 'bg-teal-50 border-teal-100' },
    { name: 'Others', icon: '💬', bg: 'bg-gray-100 border-gray-200' },
  ];

  const trendingItems = [
    { id: 2, name: "Engineering Maths Book", price: "450", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop" },
    { id: 1, name: "boAt Airdopes 131", price: "999", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop" },
    { id: 3, name: "Study Table", price: "2,500", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=150&auto=format&fit=crop" },
  ];

  // UX Logic: Wishlist toggle
  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // UX Logic: Filter products by selected category
  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-4 md:p-8 flex gap-8 overflow-y-auto max-w-7xl mx-auto w-full">
      
      {/* Central Main Feed */}
      <div className="flex-1 space-y-8 min-w-0 w-full">
        
        {/* Dynamic Sliding Hero Carousel */}
        <Hero />

        {/* Interactive Shop by Category */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-gray-900">Shop by Category</h3>
            {selectedCategory !== 'All' && (
              <button 
                onClick={() => setSelectedCategory('All')}
                className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
              >
                Clear Filter ✕
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((cat, idx) => {
              const isActive = selectedCategory === cat.name;
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`${cat.bg} p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition border duration-200 select-none ${
                    isActive ? 'ring-2 ring-indigo-600 scale-105 shadow-md' : 'hover:-translate-y-1 hover:shadow-xs'
                  }`}
                >
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="text-xs font-bold text-gray-800">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Items with Wishlist & Category Filter */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-gray-900">Recommended for You</h3>
              {selectedCategory !== 'All' && (
                <span className="bg-indigo-100 text-indigo-700 font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {selectedCategory}
                </span>
              )}
            </div>
            <Link to="/products" className="text-xs text-indigo-600 font-bold hover:underline">View all</Link>
          </div>

          {filteredProducts.length === 0 ? (
            /* Empty State UX */
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center space-y-2">
              <p className="text-2xl">📦</p>
              <h4 className="font-bold text-sm text-gray-800">No items found in {selectedCategory}</h4>
              <p className="text-xs text-gray-500">Be the first student to list a product here!</p>
              <button 
                onClick={() => setSelectedCategory('All')} 
                className="mt-2 text-xs bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                Show All Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((item) => {
                const isSaved = wishlist.includes(item.id);
                return (
                  <Link 
                    key={item.id} 
                    to={`/products/${item.id}`}
                    className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs hover:shadow-lg transition duration-200 cursor-pointer relative group flex flex-col justify-between"
                  >
                    <div>
                      {/* Interactive Wishlist Button */}
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault(); // Prevents navigating to product page when clicking heart
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                        className="absolute top-5 right-5 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-400 hover:text-red-500 transition shadow-xs z-10 active:scale-90"
                      >
                        {isSaved ? (
                          <FaHeart className="text-xs text-red-500 animate-pulse" />
                        ) : (
                          <FaRegHeart className="text-xs" />
                        )}
                      </button>

                      <div className="h-40 rounded-xl overflow-hidden mb-3 bg-gray-100 relative">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        
                        {/* Item Condition Badge */}
                        <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                          {item.condition}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-gray-900 leading-snug line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="font-black text-base text-gray-900 mb-2">₹{item.price}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.seller)}&background=random`} className="w-5 h-5 rounded-full shrink-0" alt="" />
                          <span className="font-semibold text-gray-700 truncate">{item.seller}</span>
                          <span className="text-gray-400 text-[10px] shrink-0">{item.dept}</span>
                        </div>
                        <span className="flex items-center gap-1 font-bold text-gray-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 shrink-0">
                          <FaStar className="text-amber-400 text-xs" /> {item.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3.5">
            <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl text-lg"><FaShieldAlt /></div>
            <div>
              <h5 className="font-bold text-xs text-gray-900">Safe & Secure</h5>
              <p className="text-[11px] text-gray-500">100% student verified</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3.5">
            <div className="bg-pink-100 text-pink-700 p-3 rounded-xl text-lg"><FaTag /></div>
            <div>
              <h5 className="font-bold text-xs text-gray-900">Best Prices</h5>
              <p className="text-[11px] text-gray-500">Student deals in campus</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3.5">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-xl text-lg"><FaComments /></div>
            <div>
              <h5 className="font-bold text-xs text-gray-900">Easy Chat</h5>
              <p className="text-[11px] text-gray-500">Chat directly with sellers</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3.5">
            <div className="bg-amber-100 text-amber-700 p-3 rounded-xl text-lg"><FaBolt /></div>
            <div>
              <h5 className="font-bold text-xs text-gray-900">Quick Deals</h5>
              <p className="text-[11px] text-gray-500">Fast campus meetups</p>
            </div>
          </div>
        </div>

      </div>

      {/* Right Sidebar Widgets */}
      <aside className="w-80 space-y-6 shrink-0 hidden lg:block">
        
        {/* Verification Widget */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <FaShieldAlt className="text-emerald-600 text-base" />
            <h4 className="font-bold text-sm text-emerald-950">Verified Platform</h4>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed mb-3">Only Pillai College students can buy and sell items here.</p>
          <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-xs">
            <FaCheckCircle className="text-xs" /> Student Verified
          </span>
        </div>

        {/* Trending Items */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-sm flex items-center gap-2 text-gray-900">
              Trending Now <FaFire className="text-amber-500" />
            </h4>
          </div>
          <div className="space-y-4">
            {trendingItems.map((item, idx) => (
              <Link 
                key={idx} 
                to={`/products/${item.id}`}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-xl transition"
              >
                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100 border border-gray-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-xs text-gray-800 truncate">{item.name}</h5>
                  <p className="text-xs font-black text-gray-900 mt-0.5">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Seller Box */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-5 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <h4 className="font-extrabold text-sm text-indigo-950">Want to sell something?</h4>
            <p className="text-xs text-indigo-700 mt-1 leading-relaxed">List your product and reach thousands of students.</p>
            <Link to="/sell" className="inline-block mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs cursor-pointer">
              Sell Now
            </Link>
          </div>
          <span className="text-4xl shrink-0 ml-2">🏪</span>
        </div>

      </aside>

    </div>
  );
}