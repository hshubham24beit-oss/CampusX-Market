// src/components/product/ProductImages.jsx
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductImages({ images = [], title = "Product" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const validImages = Array.isArray(images) && images.length > 0 ? images : [];

  const handlePrev = () => {
    if (validImages.length <= 1) return;
    setSelectedIndex((prev) =>
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (validImages.length <= 1) return;
    setSelectedIndex((prev) =>
      prev === validImages.length - 1 : 0 : prev + 1
    );
  };

  if (validImages.length === 0) {
    return (
      <div className="h-80 md:h-96 rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-400">
        <span className="text-5xl mb-2">📦</span>
        <p className="text-xs font-bold text-gray-500">No images provided</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Large Image */}
      <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-xs group">
        <img
          src={validImages[selectedIndex]}
          alt={`${title} - view ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        {validImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-gray-700 shadow-md flex items-center justify-center hover:bg-white transition cursor-pointer"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-gray-700 shadow-md flex items-center justify-center hover:bg-white transition cursor-pointer"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                selectedIndex === idx
                  ? "border-indigo-600 ring-2 ring-indigo-100"
                  : "border-gray-200 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
