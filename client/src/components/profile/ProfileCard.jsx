import React, { useState } from 'react';
import { FaPencilAlt, FaCheckCircle, FaStar, FaLock } from 'react-icons/fa';

export default function ProfileCard() {
  const [profileData, setProfileData] = useState({
    fullName: 'Shubham Hulawale',
    email: 'shubham@student.mes.ac.in',
    department: 'Information Technology',
    year: 'TY',
    phoneNumber: '9876543210',
    bio: 'Passionate about tech and helping fellow students. Always up for a good deal!',
  });

  const [isEditing, setIsEditing] = useState({});

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
      
      {/* User Avatar & Summary Card */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between text-center">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight text-left mb-6">My Profile</h2>

          {/* Avatar & Edit Button */}
          <div className="relative w-28 h-28 mx-auto mb-4">
            <img
              src="https://ui-avatars.com/api/?name=Shubham+Hulawale&background=6C5CE7&color=fff&size=128"
              alt="Shubham Hulawale"
              className="w-full h-full rounded-full object-cover ring-4 ring-indigo-50 shadow-sm"
            />
            <button className="absolute bottom-1 right-1 bg-white border border-gray-200 p-2 rounded-full text-indigo-600 shadow-sm hover:bg-indigo-50 transition cursor-pointer">
              <FaPencilAlt className="text-xs" />
            </button>
          </div>

          {/* Name & Verified Badge */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="text-lg font-black text-gray-900">{profileData.fullName}</h3>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
              <FaCheckCircle className="text-[9px]" /> Verified Student
            </span>
          </div>

          <p className="text-xs text-gray-500 font-bold mb-0.5">
            {profileData.year} IT • {profileData.department}
          </p>
          <p className="text-xs text-gray-400 font-medium mb-4">Pillai College of Engineering</p>

          {/* Rating */}
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-600 mb-6 bg-gray-50 py-2 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1">
              <FaStar className="text-amber-400 text-sm" />
              <span className="text-gray-900 font-black">4.7</span>
              <span className="text-gray-400">(28 reviews)</span>
            </div>
            <span className="text-gray-300">|</span>
            <div>
              <span className="text-gray-900 font-black">18</span> Products Sold
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-2 text-center py-4 border-t border-b border-gray-100">
            <div>
              <p className="text-base font-black text-gray-900">24</p>
              <p className="text-[10px] font-bold text-gray-400 leading-tight">Listed</p>
            </div>
            <div>
              <p className="text-base font-black text-gray-900">18</p>
              <p className="text-[10px] font-bold text-gray-400 leading-tight">Sold</p>
            </div>
            <div>
              <p className="text-base font-black text-gray-900">12</p>
              <p className="text-[10px] font-bold text-gray-400 leading-tight">Reviews</p>
            </div>
            <div>
              <p className="text-base font-black text-gray-900">98%</p>
              <p className="text-[10px] font-bold text-gray-400 leading-tight">Response</p>
            </div>
          </div>
        </div>

        <p className="text-[11px] font-extrabold text-gray-400 mt-6">
          Member since April 2024
        </p>
      </div>

      {/* Editable Information Card */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-3">
          Profile Information
        </h3>

        {/* Full Name */}
        <div className="flex items-center justify-between gap-4 py-1">
          <div className="flex-1">
            <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Full Name</p>
            {isEditing.fullName ? (
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full text-xs font-bold text-gray-900 bg-gray-50 border border-indigo-200 rounded-lg px-2 py-1 mt-1 outline-none"
              />
            ) : (
              <p className="text-xs font-bold text-gray-900 mt-0.5">{profileData.fullName}</p>
            )}
          </div>
          <button
            onClick={() => handleEditToggle('fullName')}
            className="text-indigo-600 border border-indigo-100 hover:bg-indigo-50 font-extrabold text-xs px-3 py-1 rounded-lg transition cursor-pointer shrink-0"
          >
            {isEditing.fullName ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between gap-4 py-1">
          <div>
            <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Email</p>
            <p className="text-xs font-bold text-gray-400 mt-0.5">{profileData.email}</p>
          </div>
          <FaLock className="text-gray-300 text-xs shrink-0" />
        </div>

        {/* Department */}
        <div className="flex items-center justify-between gap-4 py-1">
          <div className="flex-1">
            <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Department</p>
            {isEditing.department ? (
              <input
                type="text"
                value={profileData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full text-xs font-bold text-gray-900 bg-gray-50 border border-indigo-200 rounded-lg px-2 py-1 mt-1 outline-none"
              />
            ) : (
              <p className="text-xs font-bold text-gray-900 mt-0.5">{profileData.department}</p>
            )}
          </div>
          <button
            onClick={() => handleEditToggle('department')}
            className="text-indigo-600 border border-indigo-100 hover:bg-indigo-50 font-extrabold text-xs px-3 py-1 rounded-lg transition cursor-pointer shrink-0"
          >
            {isEditing.department ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Year */}
        <div className="flex items-center justify-between gap-4 py-1">
          <div className="flex-1">
            <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Year</p>
            {isEditing.year ? (
              <input
                type="text"
                value={profileData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                className="w-full text-xs font-bold text-gray-900 bg-gray-50 border border-indigo-200 rounded-lg px-2 py-1 mt-1 outline-none"
              />
            ) : (
              <p className="text-xs font-bold text-gray-900 mt-0.5">{profileData.year}</p>
            )}
          </div>
          <button
            onClick={() => handleEditToggle('year')}
            className="text-indigo-600 border border-indigo-100 hover:bg-indigo-50 font-extrabold text-xs px-3 py-1 rounded-lg transition cursor-pointer shrink-0"
          >
            {isEditing.year ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between gap-4 py-1">
          <div className="flex-1">
            <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Phone Number</p>
            {isEditing.phoneNumber ? (
              <input
                type="text"
                value={profileData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="w-full text-xs font-bold text-gray-900 bg-gray-50 border border-indigo-200 rounded-lg px-2 py-1 mt-1 outline-none"
              />
            ) : (
              <p className="text-xs font-bold text-gray-900 mt-0.5">{profileData.phoneNumber}</p>
            )}
          </div>
          <button
            onClick={() => handleEditToggle('phoneNumber')}
            className="text-indigo-600 border border-indigo-100 hover:bg-indigo-50 font-extrabold text-xs px-3 py-1 rounded-lg transition cursor-pointer shrink-0"
          >
            {isEditing.phoneNumber ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Bio */}
        <div className="flex items-start justify-between gap-4 py-1">
          <div className="flex-1">
            <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Bio</p>
            {isEditing.bio ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows="3"
                className="w-full text-xs font-medium text-gray-900 bg-gray-50 border border-indigo-200 rounded-lg p-2 mt-1 outline-none resize-none"
              />
            ) : (
              <p className="text-xs font-medium text-gray-700 leading-relaxed mt-0.5">{profileData.bio}</p>
            )}
          </div>
          <button
            onClick={() => handleEditToggle('bio')}
            className="text-indigo-600 border border-indigo-100 hover:bg-indigo-50 font-extrabold text-xs px-3 py-1 rounded-lg transition cursor-pointer shrink-0 mt-2"
          >
            {isEditing.bio ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

    </div>
  );
}