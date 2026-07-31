import React from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '/src/components/product/products';

export default function Products() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 className="text-2xl font-bold mb-6">All Marketplace Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Product Image */}
              <div className="h-48 rounded-xl overflow-hidden bg-gray-100 mb-3">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tag / Category */}
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">
                {product.category}
              </span>

              {/* Title & Subtitle */}
              <h3 className="font-bold text-gray-900 mt-2 text-sm">{product.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-1">{product.subtitle}</p>
            </div>

            {/* Price & Condition */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="font-black text-indigo-600 text-base">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through ml-2">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                {product.condition}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}