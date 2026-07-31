import React from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

export default function FeaturedProducts({ products = [] }) {
  // Default fallback items if no backend data is passed yet
  const dummyProducts = [
    { id: 1, title: 'MacBook Air M2', price: '72000', condition: 'Like New', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
    { id: 2, title: 'iPhone 13', price: '38000', condition: 'Good', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400' },
    { id: 3, title: 'Java Programming', price: '350', condition: 'New', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400' },
    { id: 4, title: 'Gaming Chair', price: '4500', condition: 'Used', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400' },
    { id: 5, title: 'Canon DSLR', price: '28000', condition: 'Like New', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400' },
    { id: 6, title: 'Study Table', price: '1800', condition: 'Good', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400' },
    { id: 7, title: 'Football Kit', price: '900', condition: 'New', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400' },
    { id: 8, title: 'Wireless Headphones', price: '2500', condition: 'Like New', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  ];

  const displayList = products.length > 0 ? products : dummyProducts;

  return (
    <section className="featured-section">
      <div className="section-header">
        <div>
          <h2>Featured Products</h2>
          <p className="section-subtitle">Discover the latest products posted by students.</p>
        </div>
        <Link to="/products" className="view-all-btn">
          View All &rarr;
        </Link>
      </div>

      <div className="products-grid">
        {displayList.map((item) => (
          <ProductCard key={item._id || item.id} product={item} />
        ))}
      </div>
    </section>
  );
}