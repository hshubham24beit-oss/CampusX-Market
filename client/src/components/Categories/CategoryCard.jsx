import React from 'react';

export default function CategoryCard({ name, count, icon, bg }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col items-center justify-center text-center group">
      <div className={`p-5 rounded-2xl ${bg} transition duration-300 mb-4 flex items-center justify-center w-20 h-20 group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="font-extrabold text-base text-gray-900 group-hover:text-indigo-600 transition">
        {name}
      </h3>
      <p className="text-xs font-medium text-gray-400 mt-1">
        {count}
      </p>
    </div>
  );
}