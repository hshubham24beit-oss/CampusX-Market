// src/context/ProductContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts } from '../api/product.api';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const data = await getProducts(category);
      setProducts(data);
    } catch (err) {
      console.warn("Backend not connected yet. Falling back to static mock data.");
      // Fallback or handle error
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);