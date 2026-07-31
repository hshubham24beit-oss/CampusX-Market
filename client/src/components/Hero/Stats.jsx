import React from 'react';

export default function Stats() {
  const stats = [
    { label: 'Active Products', value: '500+' },
    { label: 'Happy Students', value: '1,200+' },
    { label: 'Successful Trades', value: '350+' },
    { label: 'Average Rating', value: '4.9 ★' },
  ];

  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
      <h4 className="font-extrabold text-sm text-gray-900 mb-4">CampusX at a Glance</h4>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-purple-50/60 border border-purple-100 p-3 rounded-2xl text-center">
            <span className="block font-black text-lg text-indigo-600">{stat.value}</span>
            <span className="text-[11px] font-semibold text-gray-600 leading-tight block mt-0.5">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}