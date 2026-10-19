// src/pages/Products/Products.jsx
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaFilter, FaTimes } from "react-icons/fa";
import { productAPI } from "../../api/product.api";
import { categoryAPI } from "../../api/category.api";
import { wishlistAPI } from "../../api/wishlist.api";
import ProductFilter from "../../components/product/ProductFilter";
import ProductGrid from "../../components/product/ProductGrid";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [filters, setFilters] = useState({
    condition: "",
    minPrice: "",
    maxPrice: "",
    sort: "latest",
  });

  // Fetch Category Name if ID provided
  useEffect(() => {
    if (categoryId) {
      fetchCategoryName();
    } else {
      setCategoryName("");
    }
  }, [categoryId]);

  const fetchCategoryName = async () => {
    try {
      const response = await categoryAPI.getCategories();
      if (response.success) {
        const cat = response.data?.find(
          (item) => String(item._id) === String(categoryId)
        );
        if (cat) setCategoryName(cat.name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Wishlist
  const fetchWishlist = async () => {
    if (!localStorage.getItem("token")) {
      setWishlist([]);
      return;
    }

    try {
      const res = await wishlistAPI.getWishlist();
      const productIds = res.data?.products?.map((p) => p._id || p) || [];
      setWishlist(productIds);
    } catch {
      setWishlist([]);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await productAPI.getProducts({
        category: categoryId || undefined,
        search: searchQuery || undefined,
        limit: 50,
      });
      if (response.success) {
        setProducts(response.data || []);
      } else {
        setProducts([]);
        setError(response.message || "Failed to load products.");
      }
    } catch (err) {
      console.error("Products Error:", err);
      setProducts([]);
      setError(
        err.response?.data?.message || "Unable to load marketplace products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [categoryId, searchQuery]);

  // Wishlist Toggle
  const handleWishlistToggle = async (productId) => {
    try {
      if (wishlist.includes(productId)) {
        await wishlistAPI.removeFromWishlist(productId);
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await wishlistAPI.addToWishlist(productId);
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  // Search handler
  const handleSearch = (query) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set("search", query);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setFilters({
      condition: "",
      minPrice: "",
      maxPrice: "",
      sort: "latest",
    });
  };

  // Client-side filtering & sorting
  const filteredProducts = products
    .filter((item) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // Condition filter
      if (filters.condition && item.condition !== filters.condition) {
        return false;
      }

      // Min Price
      if (filters.minPrice && Number(item.price) < Number(filters.minPrice)) {
        return false;
      }

      // Max Price
      if (filters.maxPrice && Number(item.price) > Number(filters.maxPrice)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "priceLow") return Number(a.price) - Number(b.price);
      if (filters.sort === "priceHigh") return Number(b.price) - Number(a.price);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
            <Link to="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-indigo-600 font-bold">
              {categoryName || "Marketplace"}
            </span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            {categoryName ? `${categoryName} Products` : "Marketplace Products"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Browse verified second-hand student items on campus
          </p>
        </div>

        {/* Search & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <SearchBar
            initialValue={searchQuery}
            onSearch={handleSearch}
            placeholder="Search items..."
            className="w-full sm:w-72"
          />

          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="lg:hidden p-2.5 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition cursor-pointer shrink-0"
          >
            <FaFilter className="text-sm" />
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <ProductFilter
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center lg:hidden p-4">
            <div className="bg-white w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-extrabold text-sm text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-2 text-gray-400 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <ProductFilter
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
              />
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-full bg-indigo-600 text-white font-bold text-xs py-3 rounded-xl shadow-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid Area */}
        <div className="lg:col-span-3">
          {loading ? (
            <Loader text="Loading marketplace products..." />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 p-8 rounded-3xl text-center text-red-600 font-semibold text-xs">
              {error}
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              wishlist={wishlist}
              onWishlistToggle={handleWishlistToggle}
              emptyMessage={
                searchQuery
                  ? `No products found matching "${searchQuery}"`
                  : "No products available under selected filters."
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}