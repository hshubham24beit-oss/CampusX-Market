// src/hooks/useProducts.js
import { useState, useEffect, useCallback } from "react";
import { productAPI } from "../api/product.api";

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await productAPI.getProducts(params.category);
      setProducts(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    params,
    setParams,
    refetch: fetchProducts,
  };
};

export default useProducts;
