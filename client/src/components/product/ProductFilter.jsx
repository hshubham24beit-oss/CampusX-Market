// src/components/product/ProductFilter.jsx
import React from "react";
import { FaFilter, FaUndo } from "react-icons/fa";
import { CONDITIONS } from "../../utils/constants";

export default function ProductFilter({
  filters,
  onChange,
  onReset,
  className = "",
}) {
  const handlePriceChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  const handleConditionToggle = (condition) => {
    const newCondition = filters.condition === condition ? "" : condition;
    onChange({ ...filters, condition: newCondition });
  };

  const handleSortChange = (e) => {
    onChange({ ...filters, sort: e.target.value });
  };

  return (
    <div className={`bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FaFilter className="text-indigo-600 text-xs" />
          <h3 className="font-extrabold text-sm text-gray-900">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-indigo-600 transition cursor-pointer"
        >
          <FaUndo className="text-[9px]" /> Reset
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={filters.sort || "latest"}
          onChange={handleSortChange}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 font-semibold focus:outline-none focus:border-indigo-600"
        >
          <option value="latest">Latest First</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
          Price Range (₹)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs text-gray-800 font-semibold focus:outline-none focus:border-indigo-600"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs text-gray-800 font-semibold focus:outline-none focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
          Condition
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS.map((cond) => {
            const isSelected = filters.condition === cond;
            return (
              <button
                key={cond}
                type="button"
                onClick={() => handleConditionToggle(cond)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cond}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
