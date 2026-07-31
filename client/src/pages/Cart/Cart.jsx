import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { FaShieldAlt, FaUndo, FaUserShield } from 'react-icons/fa';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Java Book",
      subtitle: "The Complete Reference",
      price: 350,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Casio fx-991EX",
      subtitle: "Scientific Calculator",
      price: 1200,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=500&auto=format&fit=crop"
    }
  ]);

  const handleIncrease = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <span>/</span>
        <span className="text-indigo-600 font-bold">Cart</span>
      </nav>

      {/* Title */}
      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">
        My Cart <span className="text-gray-500 text-lg font-bold">({totalItemsCount} Items)</span>
      </h2>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            {cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
                onRemove={() => handleRemove(item.id)}
              />
            ))}

            {/* Bottom Sticky Action Bar */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center justify-between mt-6">
              <div>
                <p className="text-xs text-gray-400 font-medium">Total ({totalItemsCount} items)</p>
                <p className="text-xl font-black text-gray-900">₹{subtotal.toLocaleString()}</p>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs px-8 py-3.5 rounded-xl transition shadow-md shadow-indigo-200 cursor-pointer">
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Price Summary & Perks Sidebar */}
          <div className="space-y-6">
            
            {/* Price Details Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
              <h3 className="font-extrabold text-sm text-gray-900 mb-5 border-b border-gray-100 pb-3">
                Price Details
              </h3>
              
              <div className="space-y-3.5 text-xs font-semibold">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-extrabold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-extrabold">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-5 pt-4 flex justify-between items-center">
                <span className="font-extrabold text-sm text-gray-900">Total</span>
                <span className="font-black text-lg text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="space-y-3 text-xs font-bold text-emerald-800 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2.5">
                <FaShieldAlt className="text-emerald-600 text-sm" />
                <span>100% Secure Payments</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaUndo className="text-emerald-600 text-sm" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaUserShield className="text-indigo-600 text-sm" />
                <span className="text-indigo-900">Student Protection</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Empty Cart State */
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-xs max-w-md mx-auto mt-10">
          <span className="text-5xl mb-4 block">🛒</span>
          <h3 className="font-extrabold text-lg text-gray-900 mb-1">Your cart is empty</h3>
          <p className="text-xs text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/products" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md shadow-indigo-200"
          >
            Start Shopping
          </Link>
        </div>
      )}

    </div>
  );
}