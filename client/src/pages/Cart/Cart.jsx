import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaUndo,
  FaUserShield,
} from "react-icons/fa";

import CartItem from "./CartItem";
import { cartAPI } from "../../api/cart.api";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // ==========================
  // Fetch Cart
  // ==========================

  const fetchCart = async () => {

    try {

      setLoading(true);

      const response = await cartAPI.getCart();

      console.log(JSON.stringify(response.data, null, 2));

      setCartItems(response.data.data.items || []);

    } catch (error) {

      console.error(error);

      setCartItems([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCart();

  }, []);

  // ==========================
  // Remove Product
  // ==========================

  const handleRemove = async (productId) => {

    try {

      await cartAPI.removeFromCart(productId);

      fetchCart();

    } catch (error) {

      console.error(error);

    }

  };

  // ==========================
  // Update Quantity
  // ==========================

  const handleUpdateQuantity = async (productId, quantity) => {

    try {

      await cartAPI.updateCart(productId, quantity);

      fetchCart();

    } catch (error) {

      console.error(error);

    }

  };

  // ==========================
  // Clear Cart
  // ==========================

  const handleClearCart = async () => {

    try {

      await cartAPI.clearCart();

      fetchCart();

    } catch (error) {

      console.error(error);

    }

  };

  // ==========================
  // Price Calculations
  // ==========================

  const subtotal = cartItems.reduce(

    (total, item) =>
      total + (item.product?.price || 0) * (item.quantity || 1),

    0

  );

  const totalItemsCount = cartItems.length;

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return <Loader text="Loading your cart..." />;
  }

  // ==========================
  // Return
  // ==========================

  return (    <div className="max-w-7xl mx-auto w-full">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <span>/</span>
        <span className="text-indigo-600 font-bold">Cart</span>
      </nav>

      {/* Title */}
      <div className="flex items-center justify-between mb-6">

  <h2 className="text-2xl font-black text-gray-900">
    My Cart
    <span className="text-gray-500 text-lg ml-2">
      ({totalItemsCount} Items)
    </span>
  </h2>

  {cartItems.length > 0 && (
    <button
      onClick={handleClearCart}
      className="flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-5 py-2 rounded-xl font-bold text-sm transition"
    >
      🗑 Clear Cart
    </button>
  )}

</div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onRemove={() => handleRemove(item.product._id)}
                onUpdateQuantity={(quantity) =>
                  handleUpdateQuantity(item.product._id, quantity)
                }
                onCheckout={() =>
                navigate(`/products/${item.product._id}?checkout=true`)
              }
              />
            ))}
            
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