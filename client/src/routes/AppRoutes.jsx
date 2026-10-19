// src/routes/AppRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Public Pages
import Home from "../pages/Home/Home";
import Categories from "../components/Categories/Categories";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/Products/ProductDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/Login/ForgotPassword";
import ResetPassword from "../pages/Login/ResetPassword";
import NotFound from "../pages/NotFound/NotFound";

// Protected Pages
import SellProduct from "../pages/SellProduct/SellProduct";
import Chat from "../pages/Chat/Chat";
import Orders from "../pages/Orders/Orders";
import Profile from "../pages/Profile/Profile";
import Wishlist from "../pages/Wishlist/Wishlist";
import Cart from "../pages/Cart/Cart";
import Requests from "../pages/Requests/Requests";
import Notifications from "../pages/Notifications/Notifications";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>

      {/* ================= PROTECTED ROUTES ================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/products/:id/edit" element={<SellProduct />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Route>

      {/* ================= 404 PAGE ================= */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}