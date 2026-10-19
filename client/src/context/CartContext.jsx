// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { cartAPI } from "../api/cart.api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      const res = await cartAPI.getCart();
      const items = res.data?.data?.items || res.data?.items || [];
      // Filter out items where product is null (deleted products)
      const validItems = items.filter((item) => item && item.product);
      setCartItems(validItems);
    } catch (err) {
      console.error("Cart fetch error:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await cartAPI.addToCart(productId, quantity);
    await fetchCart();
    return res;
  };

  const updateQuantity = async (productId, quantity) => {
    const res = await cartAPI.updateCart(productId, quantity);
    await fetchCart();
    return res;
  };

  const removeFromCart = async (productId) => {
    const res = await cartAPI.removeFromCart(productId);
    await fetchCart();
    return res;
  };

  const clearCart = async () => {
    const res = await cartAPI.clearCart();
    setCartItems([]);
    return res;
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.product?._id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        ),
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
