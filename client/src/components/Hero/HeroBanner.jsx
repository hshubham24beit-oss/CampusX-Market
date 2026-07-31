// src/components/home/HeroBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

export default function HeroBanner({ 
  title = "Buy. Sell. Connect.",
  subtitle = "Only for Pillai College Students.",
  description = "A trusted marketplace for students, by students. Find cheap textbooks, gadgets, and campus essentials.",
  ctaText = "Explore Now",
  ctaLink = "/categories",
  gradient = "from-purple-50/80 via-indigo-50/50 to-purple-100/60",
  borderColor = "border-purple-100/80",
  image = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop"
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${gradient} p-6 sm:p-8 lg:p-10 border ${borderColor} shadow-xs my-2`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Content */}
        <div className="md:col-span-7 lg:col-span-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            {title}
          </h1>
          
          <p className="text-indigo-600 font-extrabold text-sm sm:text-base">
            {subtitle}
          </p>

          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-xl leading-relaxed">
            {description}
          </p>

          <div className="pt-2">
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl transition duration-200 shadow-md shadow-indigo-200 cursor-pointer"
            >
              {ctaText} <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
          <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden shadow-lg border-2 border-white/80">
            <img
              src={image}
              alt={title}
              className="w-full h-44 sm:h-52 object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
}