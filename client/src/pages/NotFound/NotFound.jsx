import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCompass } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F9] px-4 py-16">
      <div className="w-full max-w-lg text-center animate-fade-up">
        <div className="relative mx-auto w-24 h-24 mb-6 animate-float">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 blur-xl opacity-30" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
            <FaCompass className="text-4xl" />
          </div>
        </div>

        <p className="text-6xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent leading-none">
          404
        </p>

        <h1 className="mt-4 text-xl md:text-2xl font-black text-gray-900 tracking-tight">
          This page wandered off campus
        </h1>

        <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
          The page you are looking for doesn&apos;t exist or may have been moved
          to a new spot.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-md shadow-indigo-200 active:scale-95"
          >
            <FaHome className="text-xs" />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white border border-gray-200 hover:border-indigo-200 hover:text-indigo-700 text-gray-700 font-extrabold text-xs px-6 py-3 rounded-xl transition"
          >
            Browse products
          </Link>
        </div>
      </div>
    </div>
  );
}
