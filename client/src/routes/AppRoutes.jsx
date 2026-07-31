// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

import Home from '../pages/Home/Home';
import Categories from '../components/Categories/Categories';
import Products from '../pages/Products/Products';
import ProductDetails from '../pages/Products/ProductDetails';
import SellProduct from '../pages/SellProduct/SellProduct';
import Chat from '../pages/Chat/Chat';
import Orders from '../pages/Orders/Orders';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import NotFound from '../pages/NotFound/NotFound';
import Wishlist from '../pages/Wishlist/Wishlist';
import Cart from '../pages/Cart/Cart';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes (Standalone) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected App Routes - Requires Auth */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}