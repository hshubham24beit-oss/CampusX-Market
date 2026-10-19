import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CategoryCard from "./CategoryCard";
import { categoryAPI } from "../../api/category.api";
import Loader from "../common/Loader";

import {
  FaBook,
  FaLaptop,
  FaCouch,
  FaTshirt,
  FaPen,
  FaEllipsisH,
  FaTableTennis,
  FaStickyNote,
} from "react-icons/fa";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await categoryAPI.getCategories();

      console.log("CATEGORIES:", response);

      if (response.success) {
        setCategories(response.data || []);
      } else {
        setError(
          response.message || "Failed to load categories."
        );
      }
    } catch (err) {
      console.error("Categories Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CATEGORY STYLES
  // =========================

  const getCategoryStyle = (name) => {
    const styles = {
      Books: {
        icon: <FaBook className="text-4xl text-purple-600" />,
        bg: "bg-purple-50 hover:bg-purple-100/80 border-purple-100",
      },

      Electronics: {
        icon: <FaLaptop className="text-4xl text-emerald-600" />,
        bg: "bg-emerald-50 hover:bg-emerald-100/80 border-emerald-100",
      },

      Fashion: {
        icon: <FaTshirt className="text-4xl text-pink-600" />,
        bg: "bg-pink-50 hover:bg-pink-100/80 border-pink-100",
      },

      Furniture: {
        icon: <FaCouch className="text-4xl text-amber-600" />,
        bg: "bg-amber-50 hover:bg-amber-100/80 border-amber-100",
      },

      Notes: {
        icon: <FaStickyNote className="text-4xl text-gray-600" />,
        bg: "bg-gray-100 hover:bg-gray-200/80 border-gray-200",
      },

      Sports: {
        icon: <FaTableTennis className="text-4xl text-teal-600" />,
        bg: "bg-teal-50 hover:bg-teal-100/80 border-teal-100",
      },

      Stationery: {
        icon: <FaPen className="text-4xl text-blue-600" />,
        bg: "bg-blue-50 hover:bg-blue-100/80 border-blue-100",
      },

      Others: {
        icon: <FaEllipsisH className="text-4xl text-gray-600" />,
        bg: "bg-gray-100 hover:bg-gray-200/80 border-gray-200",
      },
    };

    return (
      styles[name] || {
        icon: <FaEllipsisH className="text-4xl text-gray-600" />,
        bg: "bg-gray-100 hover:bg-gray-200/80 border-gray-200",
      }
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <Loader text="Loading categories..." />;
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <p className="text-red-500 font-semibold">
          {error}
        </p>
      </div>
    );
  }

  // =========================
  // RETURN
  // =========================

  return (
    <div className="max-w-7xl mx-auto w-full">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <Link
          to="/"
          className="hover:text-indigo-600 transition"
        >
          Home
        </Link>

        <span>/</span>

        <span className="text-indigo-600 font-bold">
          Categories
        </span>
      </nav>

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
          Browse by Category
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Find exactly what you need from your campus community
        </p>
      </div>

      {/* Categories */}
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">
            📂
          </div>

          <h3 className="font-bold text-gray-800">
            No categories available
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {categories
            .filter((category) => category.name !== "Cycles")
            .map((category) => {
              const style = getCategoryStyle(
                category.name
              );

              return (
                <CategoryCard
                  key={category._id}
                  id={category._id}
                  name={category.name}
                  count="View Products"
                  icon={style.icon}
                  bg={style.bg}
                />
              );
            })}

        </div>
      )}
    </div>
  );
}