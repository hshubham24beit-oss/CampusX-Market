// src/components/common/SearchBar.jsx
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({
  placeholder = "Search products...",
  onSearch,
  initialValue = "",
  className = "",
}) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-16 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs md:text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-600 focus:bg-white transition"
      />
      <FaSearch className="absolute left-3.5 text-gray-400 text-xs pointer-events-none" />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-10 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
        >
          <FaTimes className="text-xs" />
        </button>
      )}

      <button
        type="submit"
        className="absolute right-1.5 bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 md:p-2 rounded-full transition shadow-xs cursor-pointer"
      >
        <FaSearch className="text-[10px] md:text-xs" />
      </button>
    </form>
  );
}
