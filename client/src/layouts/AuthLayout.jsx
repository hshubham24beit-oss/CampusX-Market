// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-center items-center p-4">
      <Outlet />
    </div>
  );
}
