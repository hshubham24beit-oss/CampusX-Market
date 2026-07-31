import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { 
  FaBook, FaLaptop, FaCouch, FaTshirt, 
  FaPen, FaBicycle, FaEllipsisH, FaTableTennis 
} from 'react-icons/fa';

export default function Categories() {
  const categoriesList = [
    { 
      name: "Books", 
      count: "120+ items", 
      icon: <FaBook className="text-4xl text-purple-600" />,
      bg: "bg-purple-50 hover:bg-purple-100/80 border-purple-100"
    },
    { 
      name: "Electronics", 
      count: "85+ items", 
      icon: <FaLaptop className="text-4xl text-emerald-600" />,
      bg: "bg-emerald-50 hover:bg-emerald-100/80 border-emerald-100"
    },
    { 
      name: "Furniture", 
      count: "60+ items", 
      icon: <FaCouch className="text-4xl text-amber-600" />,
      bg: "bg-amber-50 hover:bg-amber-100/80 border-amber-100"
    },
    { 
      name: "Fashion", 
      count: "75+ items", 
      icon: <FaTshirt className="text-4xl text-pink-600" />,
      bg: "bg-pink-50 hover:bg-pink-100/80 border-pink-100"
    },
    { 
      name: "Stationery", 
      count: "40+ items", 
      icon: <FaPen className="text-4xl text-blue-600" />,
      bg: "bg-blue-50 hover:bg-blue-100/80 border-blue-100"
    },
    { 
      name: "Sports", 
      count: "35+ items", 
      icon: <FaTableTennis className="text-4xl text-teal-600" />,
      bg: "bg-teal-50 hover:bg-teal-100/80 border-teal-100"
    },
    { 
      name: "Cycles", 
      count: "20+ items", 
      icon: <FaBicycle className="text-4xl text-indigo-600" />,
      bg: "bg-indigo-50 hover:bg-indigo-100/80 border-indigo-100"
    },
    { 
      name: "Others", 
      count: "50+ items", 
      icon: <FaEllipsisH className="text-4xl text-gray-600" />,
      bg: "bg-gray-100 hover:bg-gray-200/80 border-gray-200"
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <span>/</span>
        <span className="text-indigo-600 font-bold">Categories</span>
      </nav>

      {/* Page Heading */}
      <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">
        All Categories
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoriesList.map((cat, idx) => (
          <CategoryCard 
            key={idx}
            name={cat.name}
            count={cat.count}
            icon={cat.icon}
            bg={cat.bg}
          />
        ))}
      </div>
    </div>
  );
}