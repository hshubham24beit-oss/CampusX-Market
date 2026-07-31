import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaStar, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight, 
  FaRegCalendarAlt, FaComment, FaShoppingCart, 
  FaBolt, FaMapMarkerAlt, FaMoneyBillWave, FaCheck, FaShieldAlt
} from 'react-icons/fa';

// Import allProducts ONCE from your external data file
import { allProducts } from '/src/components/product/products';

export default function ProductDetails() {
  const { id } = useParams();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Match current product from route parameter
  const product = allProducts.find((item) => item.id === Number(id)) || allProducts[0];

  const handlePrevImage = () => {
    setSelectedImgIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImgIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <Link to="/products" className="text-indigo-600 underline mt-4 inline-block">
          Back to all products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Grid: Gallery, Product Details & Seller Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Gallery (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-[380px] md:h-[420px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80 shadow-xs group">
              <img 
                src={product.images[selectedImgIndex] || product.images[0]} 
                alt={product.title} 
                className="w-full h-full object-cover" 
              />

              {/* Wishlist Button */}
              <button 
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2.5 rounded-full text-gray-500 hover:text-red-500 shadow-md transition cursor-pointer z-10"
              >
                {isWishlisted ? <FaHeart className="text-red-500 text-base" /> : <FaRegHeart className="text-base" />}
              </button>

              {/* Navigation Arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full shadow-md text-gray-700 hover:bg-white transition cursor-pointer"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <button 
                    onClick={handleNextImage} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full shadow-md text-gray-700 hover:bg-white transition cursor-pointer"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((imgUrl, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                      selectedImgIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Middle Column: Item Specification Details (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="bg-emerald-100 text-emerald-700 font-bold text-[11px] px-2.5 py-0.5 rounded-md inline-block mb-2">
                Available
              </span>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.title}</h1>
              <p className="text-xs text-gray-500 mt-1 font-medium">{product.subtitle}</p>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mt-3">
                <span className="flex items-center gap-1 text-gray-900 font-bold">
                  <FaStar className="text-amber-400 text-xs" /> {product.rating || "N/A"}
                </span>
                <span className="text-gray-400">({product.reviewCount || 0} reviews)</span>
                <span className="text-gray-300">•</span>
                <span>{product.soldCount || 0} sold</span>
              </div>

              {/* Price Row */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm font-semibold text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold text-xs px-2 py-0.5 rounded-md">
                    {product.discount}
                  </span>
                )}
              </div>
            </div>

            {/* Specifications Table */}
            <div className="space-y-2.5 pt-3 border-t border-gray-200/80 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-medium">Category</span>
                <span className="font-semibold text-gray-800">{product.category}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-medium">Condition</span>
                <span className="font-semibold text-gray-800">{product.condition}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-medium">Seller Type</span>
                <span className="font-semibold text-gray-800">{product.sellerType || "Student"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-medium">Posted On</span>
                <span className="font-semibold text-gray-800">{product.postedDate || "Recently"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-medium">Views</span>
                <span className="font-semibold text-gray-800">{product.views || 0}</span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-3 border-t border-gray-200/80">
              <h4 className="font-bold text-xs text-gray-900 mb-2">Description</h4>
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            {product.tags && (
              <div className="pt-2">
                <h4 className="font-bold text-xs text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Seller Profile & Safety Box (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Seller Card */}
            {product.seller && (
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
                <h4 className="font-bold text-xs text-gray-900">Seller Information</h4>
                
                <div className="flex items-center gap-3">
                  <img src={product.seller.avatar} alt={product.seller.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-extrabold text-sm text-gray-900">{product.seller.name}</h5>
                      {product.seller.isVerified && <FaCheck className="text-[10px] bg-emerald-500 text-white rounded-full p-0.5" />}
                    </div>
                    <p className="text-xs font-semibold text-gray-500">{product.seller.dept}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-700 font-bold mt-1">
                      <FaStar className="text-amber-400 text-xs" /> {product.seller.rating} 
                      <span className="text-gray-400 font-normal">({product.seller.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5">
                  <FaShieldAlt className="text-xs" /> Verified Student
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <Link to="/profile" className="w-full border border-indigo-600 text-indigo-600 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center hover:bg-indigo-50 transition">
                    View Profile
                  </Link>
                  <Link to="/chat" className="w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition">
                    <FaComment /> Chat with Seller
                  </Link>
                </div>
              </div>
            )}

            {/* Safety Tips Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
              <h4 className="font-bold text-xs text-gray-900">Safety Tips</h4>
              <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
                <li className="flex items-center gap-2">
                  <FaCheck className="text-indigo-600 text-xs shrink-0" /> Meet in public places
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-indigo-600 text-xs shrink-0" /> Check item before buying
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-indigo-600 text-xs shrink-0" /> Don't pay in advance
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Section: Purchase Details & Primary CTAs */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
          <h3 className="font-extrabold text-sm text-gray-900">Purchase Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-gray-400 font-medium">Pickup Location</span>
              <div className="flex items-center gap-2 font-bold text-gray-800 pt-1">
                <FaMapMarkerAlt className="text-gray-400 text-sm shrink-0" />
                <span>{product.pickupLocation || "Campus Library"}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-medium">Preferred Time</span>
              <div className="flex items-center gap-2 font-bold text-gray-800 pt-1">
                <FaRegCalendarAlt className="text-gray-400 text-sm shrink-0" />
                <span>{product.preferredTime || "Flexible"}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-medium">Payment Method</span>
              <div className="flex items-center gap-2 font-bold text-gray-800 pt-1">
                <FaMoneyBillWave className="text-gray-400 text-sm shrink-0" />
                <span>{product.paymentMethod || "Cash on Delivery"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <Link 
              to="/cart" 
              className="w-full border border-indigo-600 text-indigo-600 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition"
            >
              <FaShoppingCart /> Add to Cart
            </Link>
            <button 
              type="button" 
              className="w-full bg-indigo-600 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition cursor-pointer"
            >
              <FaBolt /> Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}