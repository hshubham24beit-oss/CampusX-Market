import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '/src/components/product/products'; 
// (or '/src/pages/product/products' if your folder is inside src/pages)

export default function ProductCard({ product, onWishlistToggle, isWishlisted }) {
  const navigate = useNavigate();

  // Fallback placeholder if product image fails or is missing
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
  };

  return (
    <div className="product-card" onClick={() => navigate(`/products/${product._id || product.id}`)}>
      <div className="product-image-wrapper">
        <img 
          src={product.image || product.images?.[0] || 'https://via.placeholder.com/300x200?text=Product'} 
          alt={product.title} 
          onError={handleImageError}
          className="product-img"
        />
        <button 
          className="wishlist-btn" 
          onClick={(e) => {
            e.stopPropagation();
            if (onWishlistToggle) onWishlistToggle(product._id || product.id);
          }}
        >
          {isWishlisted ? <FaHeart className="liked" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="product-info">
        <h4 className="product-title">{product.title}</h4>
        <p className="product-price">₹{product.price}</p>
        {product.condition && (
          <span className="product-condition">{product.condition}</span>
        )}
      </div>
    </div>
  );
}