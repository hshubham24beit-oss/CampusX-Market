import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaPencilAlt,
  FaCheckCircle,
  FaStar,
  FaLock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaCalendarAlt,
  FaBookOpen,
  FaCheck,
  FaShoppingBag,
  FaPlusCircle,
  FaHeart,
  FaComments,
  FaShieldAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { userAPI } from "../../api/user.api";
import { DEPARTMENTS, YEARS } from "../../utils/constants";
import Avatar from "../common/Avatar";

export default function ProfileCard({ profileId }) {
    const { user, refreshUser } = useAuth();
    const fileInputRef = useRef(null);

const [profileData, setProfileData] = useState({
  fullName: "",
  email: "",
  department: "",
  year: "",
  phone: "",
  bio: "",
  profileImage: "",
});

const [loading, setLoading] = useState(true);

const isOwnProfile = !profileId;

useEffect(() => {
  const loadProfile = async () => {
    try {
      setLoading(true);

      // Own Profile
      if (!profileId) {
        if (!user) return;

        setProfileData({
          fullName: user.fullName || "",
          email: user.email || "",
          department: user.department || "",
          year: user.year || "",
          phone: user.phone || "",
          bio: user.bio || "",
          profileImage: user.profileImage || "",
        });
      }

      // Seller Profile
      else {
        const response = await userAPI.getUserById(profileId);
        

        console.log("Seller Response:", response.data);

        setProfileData(response.data.data);
      }
    } catch (error) {
      console.error("Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (user || profileId) {
    loadProfile();
  }
}, [profileId, user]);

const [isEditing, setIsEditing] = useState({});

const handleEditToggle = async (field) => {

  if (!isOwnProfile) {
    return;
  }

  if (isEditing[field]) {

    try {

      await userAPI.updateProfile(profileData);

      const response = await userAPI.getMyProfile();

      setProfileData(response.data.data);

      await refreshUser();

    } catch (error) {

      console.error(error);

    }

  }

  setIsEditing((prev) => ({
    ...prev,
    [field]: !prev[field],
  }));

};

const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];

  if (!file || !isOwnProfile) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await userAPI.updateProfile(formData);

    setProfileData(response.data.data);

    await refreshUser();
  } catch (error) {
    console.error("Profile image upload failed:", error);
  } finally {
    e.target.value = "";
  }
};
const handleChange = (field, value) => {
  setProfileData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const departmentLabel =
  DEPARTMENTS.find((item) => item.value === profileData.department)?.label ||
  profileData.department ||
  "Not set";

const yearLabel =
  YEARS.find((item) => item.value === profileData.year)?.label ||
  profileData.year ||
  "Not set";

const memberSince = profileData.createdAt
  ? new Date(profileData.createdAt).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    })
  : "CampusX Market Member";

const editButtonClass =
  "inline-flex items-center gap-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 font-extrabold text-[11px] px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0";

if (loading) {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-52 rounded-3xl bg-gray-100" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 rounded-3xl bg-gray-100" />
        <div className="h-80 rounded-3xl bg-gray-100" />
      </div>
    </div>
  );
}

if (!profileData) {
  return (
    <div className="bg-white rounded-3xl p-10 text-center border border-gray-200">
      <p className="text-sm font-bold text-gray-700">Profile not found.</p>
    </div>
  );
}

return (
  <div className="space-y-6">
    {/* Hero */}
    <div className="relative overflow-hidden bg-white rounded-3xl border border-gray-200/80 shadow-xs">
      <div className="relative h-36 md:h-44 bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600">
        <div className="absolute -top-16 right-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />

        <div className="relative flex items-center justify-between px-6 md:px-8 pt-5">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
            <FaUser className="text-[10px]" />
            {isOwnProfile ? "My Profile" : "Seller Profile"}
          </span>

          {isOwnProfile && (
            <Link
              to="/sell"
              className="hidden sm:inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 text-[11px] font-extrabold px-3.5 py-2 rounded-xl transition shadow-sm"
            >
              <FaPlusCircle className="text-[10px]" />
              Sell an item
            </Link>
          )}
        </div>
      </div>

      <div className="px-5 md:px-8 pb-6 sm:pt-5">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          <div className="relative shrink-0 self-center sm:self-auto -mt-12 md:-mt-14">
            <Avatar
              src={profileData.profileImage}
              name={profileData.fullName || "Student"}
              textClassName="text-3xl md:text-4xl"
              className="w-24 h-24 md:w-28 md:h-28 rounded-3xl object-cover ring-4 ring-white shadow-lg"
            />

            {isOwnProfile && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border border-gray-200 rounded-full text-indigo-600 shadow-md hover:bg-indigo-50 transition cursor-pointer flex items-center justify-center"
                  title="Change profile photo"
                >
                  <FaPencilAlt className="text-[10px]" />
                </button>
              </>
            )}
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left sm:pb-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1.5">
              <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight break-words">
                {profileData.fullName}
              </h1>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                <FaCheckCircle className="text-[9px]" /> Verified Student
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-[11px] font-semibold text-gray-500 mt-2.5">
              <span className="inline-flex items-center gap-1.5">
                <FaGraduationCap className="text-indigo-500" />
                {yearLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FaBookOpen className="text-indigo-500" />
                {departmentLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-indigo-500" />
                Pillai College of Engineering
              </span>

              <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/70 text-amber-700 px-2.5 py-1 rounded-full">
                <FaStar className="text-amber-400 text-[10px]" />
                <span className="font-extrabold text-gray-900">
                  {profileData.totalRatings
                    ? Number(profileData.averageRating || 0).toFixed(1)
                    : "New"}
                </span>
                <span className="text-[10px] font-bold text-amber-700/80">
                  ({profileData.totalRatings || 0} reviews)
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Details */}
      <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5 md:p-7 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-base font-black text-gray-900">
              Profile Information
            </h2>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Your public details visible to other students.
            </p>
          </div>
        </div>

        {/* Full Name */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
              Full Name
            </p>

            {isOwnProfile && isEditing.fullName ? (
              <input
                type="text"
                value={profileData.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full text-sm font-bold text-gray-900 bg-white border border-indigo-300 rounded-xl px-3 py-2 outline-none focus:ring-4 focus:ring-indigo-100"
              />
            ) : (
              <p className="text-sm font-bold text-gray-900">
                {profileData.fullName || "Not provided"}
              </p>
            )}
          </div>

          {isOwnProfile && (
            <button
              onClick={() => handleEditToggle("fullName")}
              className={editButtonClass}
            >
              {isEditing.fullName ? (
                <>
                  <FaCheck className="text-[10px]" /> Save
                </>
              ) : (
                <>
                  <FaPencilAlt className="text-[10px]" /> Edit
                </>
              )}
            </button>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs shrink-0">
              <FaEnvelope />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                College Email
              </p>
              <p className="text-xs font-bold text-gray-700 truncate">
                {profileData.email || "Not provided"}
              </p>
            </div>
          </div>
          <FaLock className="text-gray-300 text-xs shrink-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Department */}
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-indigo-500">
                <FaBookOpen className="text-xs" />
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Department
                </p>
              </div>
              {isOwnProfile && (
                <button
                  onClick={() => handleEditToggle("department")}
                  className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition cursor-pointer"
                  title={isEditing.department ? "Save" : "Edit department"}
                >
                  {isEditing.department ? (
                    <FaCheck className="text-[10px]" />
                  ) : (
                    <FaPencilAlt className="text-[10px]" />
                  )}
                </button>
              )}
            </div>

            {isOwnProfile && isEditing.department ? (
              <select
                value={profileData.department || ""}
                onChange={(e) => handleChange("department", e.target.value)}
                className="w-full mt-2 text-xs font-bold text-gray-900 bg-white border border-indigo-300 rounded-lg px-2.5 py-2 outline-none focus:ring-4 focus:ring-indigo-100 cursor-pointer"
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-xs font-bold text-gray-900 mt-2">
                {departmentLabel}
              </p>
            )}
          </div>

          {/* Year */}
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-indigo-500">
                <FaCalendarAlt className="text-xs" />
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Year
                </p>
              </div>
              {isOwnProfile && (
                <button
                  onClick={() => handleEditToggle("year")}
                  className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition cursor-pointer"
                  title={isEditing.year ? "Save" : "Edit year"}
                >
                  {isEditing.year ? (
                    <FaCheck className="text-[10px]" />
                  ) : (
                    <FaPencilAlt className="text-[10px]" />
                  )}
                </button>
              )}
            </div>

            {isOwnProfile && isEditing.year ? (
              <select
                value={profileData.year || ""}
                onChange={(e) => handleChange("year", e.target.value)}
                className="w-full mt-2 text-xs font-bold text-gray-900 bg-white border border-indigo-300 rounded-lg px-2.5 py-2 outline-none focus:ring-4 focus:ring-indigo-100 cursor-pointer"
              >
                <option value="">Select year</option>
                {YEARS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-xs font-bold text-gray-900 mt-2">{yearLabel}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
              Phone Number
            </p>

            {isOwnProfile && isEditing.phoneNumber ? (
              <input
                type="tel"
                value={profileData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Add your contact number"
                className="w-full text-sm font-bold text-gray-900 bg-white border border-indigo-300 rounded-xl px-3 py-2 outline-none focus:ring-4 focus:ring-indigo-100"
              />
            ) : (
              <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <FaPhone className="text-[10px] text-gray-400" />
                {profileData.phone ||
                  profileData.phoneNumber ||
                  "Not provided"}
              </p>
            )}
          </div>

          {isOwnProfile && (
            <button
              onClick={() => handleEditToggle("phoneNumber")}
              className={editButtonClass}
            >
              {isEditing.phoneNumber ? (
                <>
                  <FaCheck className="text-[10px]" /> Save
                </>
              ) : (
                <>
                  <FaPencilAlt className="text-[10px]" /> Edit
                </>
              )}
            </button>
          )}
        </div>

        {/* Bio */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
              About
            </p>
            {isOwnProfile && (
              <button
                onClick={() => handleEditToggle("bio")}
                className={editButtonClass}
              >
                {isEditing.bio ? (
                  <>
                    <FaCheck className="text-[10px]" /> Save
                  </>
                ) : (
                  <>
                    <FaPencilAlt className="text-[10px]" /> Edit
                  </>
                )}
              </button>
            )}
          </div>

          {isOwnProfile && isEditing.bio ? (
            <textarea
              value={profileData.bio || ""}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows="3"
              maxLength={240}
              placeholder="Tell buyers a little about yourself..."
              className="w-full text-sm font-medium text-gray-900 bg-white border border-indigo-300 rounded-2xl p-3 outline-none resize-none focus:ring-4 focus:ring-indigo-100"
            />
          ) : (
            <p className="text-sm font-medium text-gray-700 leading-relaxed">
              {profileData.bio ||
                "No bio yet. Add a short introduction so buyers know who they are dealing with."}
            </p>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-5">
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-4">
            Campus identity
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs shrink-0">
                <FaCheckCircle />
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900">Verified student</p>
                <p className="text-[10px] font-semibold text-gray-400">
                  College email confirmed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs shrink-0">
                <FaCalendarAlt />
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900">Member since</p>
                <p className="text-[10px] font-semibold text-gray-400">
                  {memberSince}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xs shrink-0">
                <FaStar />
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900">
                  {profileData.totalRatings
                    ? `${Number(profileData.averageRating || 0).toFixed(1)} rating`
                    : "New seller"}
                </p>
                <p className="text-[10px] font-semibold text-gray-400">
                  {profileData.totalRatings || 0} student reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {isOwnProfile && (
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-3">
              Quick actions
            </h3>

            <div className="grid grid-cols-1 gap-2">
              {[
                { to: "/sell", label: "Sell an item", icon: <FaPlusCircle /> },
                { to: "/orders", label: "My orders", icon: <FaShoppingBag /> },
                { to: "/wishlist", label: "Wishlist", icon: <FaHeart /> },
                { to: "/chat", label: "Messages", icon: <FaComments /> },
              ].map((action) => (
                <Link
                  key={action.to}
                  to={action.to}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition"
                >
                  <span className="text-indigo-500">{action.icon}</span>
                  {action.label}
                  <span className="ml-auto text-gray-300">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-violet-50 to-white p-5">
          <div className="flex items-center gap-2 text-indigo-700 mb-2">
            <FaShieldAlt className="text-sm" />
            <h3 className="text-xs font-black uppercase tracking-wider">
              Safe campus deals
            </h3>
          </div>
          <p className="text-[11px] text-indigo-900/70 font-medium leading-relaxed">
            Always meet in a public campus spot, inspect items before paying,
            and keep chats inside CampusX Market.
          </p>
        </div>
      </aside>
    </div>
  </div>
);
}