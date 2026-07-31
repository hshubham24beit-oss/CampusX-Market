import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WishlistCard from './WishlistCard';

export default function Wishlist() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "iPad Air 5",
      desc: "64GB • Like New",
      price: "42,000",
      img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Dell Wireless Mouse",
      desc: "WM126",
      price: "799",
      img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Mechanical Keyboard",
      desc: "RGB / Red Switch",
      price: "2,199",
      img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Mi Power Bank 3i",
      desc: "20000mAh",
      price: "899",
      img: "https://images.unsplash.com/photo-1609592424009-f806408f2a6a?w=500&auto=format&fit=crop"
    }
  ]);

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleMoveAllToCart = () => {
    alert("Moved all items to Cart!");
    setItems([]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <span>/</span>
        <span className="text-indigo-600 font-bold">Wishlist</span>
      </nav>

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
          My Wishlist <span className="text-gray-500 text-lg font-bold">({items.length} Items)</span>
        </h2>

        {items.length > 0 && (
          <button 
            onClick={handleMoveAllToCart}
            className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold text-xs px-5 py-2.5 rounded-xl transition duration-200 cursor-pointer active:scale-95 shadow-xs"
          >
            Move All To Cart
          </button>
        )}
      </div>

      {/* Wishlist Grid or Empty State */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <WishlistCard
              key={item.id}
              title={item.title}
              desc={item.desc}
              price={item.price}
              img={item.img}
              onRemove={() => handleRemove(item.id)}
              onMoveToCart={() => handleRemove(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-xs max-w-md mx-auto mt-10">
          <span className="text-5xl mb-4 block">❤️</span>
          <h3 className="font-extrabold text-lg text-gray-900 mb-1">Your wishlist is empty</h3>
          <p className="text-xs text-gray-500 mb-6">Explore products and save your favorite items here.</p>
          <Link 
            to="/products" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md shadow-indigo-200"
          >
            Explore Products
          </Link>
        </div>
      )}

    </div>
  );
}