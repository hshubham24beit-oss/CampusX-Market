import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBullhorn,
  FaSearch,
  FaPlusCircle,
  FaTimes,
  FaComments,
  FaUser,
  FaTrash,
  FaClock,
} from "react-icons/fa";
import { requestAPI } from "../../api/request.api";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../../components/common/Avatar";

const REQUEST_CATEGORIES = [
  "Electronics",
  "Books",
  "Furniture",
  "Stationery",
  "Sports",
  "Others",
];

const timeAgo = (dateString) => {
  if (!dateString) return "";

  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  return `${Math.floor(months / 12)}y ago`;
};

export default function Requests() {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    category: "Electronics",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await requestAPI.getRequests();

      setRequests(response.data || []);
    } catch (err) {
      console.error("Requests Error:", err);
      setError(
        err.response?.data?.message || "Failed to load requests."
      );
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesCategory =
        categoryFilter === "All" ||
        request.category === categoryFilter;

      const matchesSearch =
        !query ||
        request.productName?.toLowerCase().includes(query) ||
        request.description?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [requests, search, categoryFilter]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productName.trim()) {
      showToast("Please enter what you are looking for.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await requestAPI.createRequest({
        productName: form.productName.trim(),
        category: form.category,
        description: form.description.trim(),
      });

      if (response.success) {
        showToast("Request posted successfully.");
        setForm({
          productName: "",
          category: "Electronics",
          description: "",
        });
        setShowForm(false);
        fetchRequests();
      }
    } catch (err) {
      console.error("Create Request Error:", err);
      showToast(
        err.response?.data?.message || "Failed to post request."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);

      const response = await requestAPI.deleteRequest(id);

      if (response.success) {
        setRequests((prev) => prev.filter((item) => item._id !== id));
        showToast("Request deleted.");
      }
    } catch (err) {
      console.error("Delete Request Error:", err);
      showToast(
        err.response?.data?.message || "Failed to delete request."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full">

      {/* ========================= TOAST ========================= */}
      {toast && (
        <div className="fixed top-5 right-5 z-[200] bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          {toast}
        </div>
      )}

      {/* ========================= BREADCRUMB ========================= */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
        <Link to="/" className="hover:text-indigo-600 transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-indigo-600 font-bold">Requests</span>
      </nav>

      {/* ========================= HEADER ========================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 md:p-8 mb-6 shadow-lg shadow-indigo-200">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full mb-3 backdrop-blur-sm">
              <FaBullhorn className="text-[10px]" />
              Campus Request Board
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              What are students looking for?
            </h1>

            <p className="text-indigo-100 text-xs md:text-sm font-medium mt-2 max-w-lg leading-relaxed">
              Post what you need, and let other students reach out. Open any
              request to view the poster&apos;s profile or start a chat.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold text-xs md:text-sm px-5 py-3 rounded-xl transition shadow-md active:scale-95 cursor-pointer self-start md:self-auto shrink-0"
          >
            <FaPlusCircle className="text-xs" />
            Post a Request
          </button>
        </div>
      </div>

      {/* ========================= ERROR ========================= */}
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-xl">
          {error}
        </div>
      )}

      {/* ========================= FILTERS ========================= */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests..."
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-600 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {["All", ...REQUEST_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-[11px] font-extrabold transition cursor-pointer border ${
                  categoryFilter === cat
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-indigo-200 hover:text-indigo-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================= LIST ========================= */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
            <h2 className="text-sm font-bold text-gray-700">
              Loading requests...
            </h2>
          </div>
        </div>
      ) : filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRequests.map((request) => {
            const requester = request.requester;
            const isOwn =
              requester?._id &&
              String(requester._id) === String(user?._id);

            return (
              <div
                key={request._id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-indigo-100 transition p-5 flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {request.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-400">
                    <FaClock className="text-[9px]" />
                    {timeAgo(request.createdAt)}
                  </span>
                </div>

                <h3 className="font-black text-base text-gray-900 leading-snug">
                  {request.productName}
                </h3>

                {request.description && (
                  <p className="text-xs text-gray-500 font-medium mt-1.5 leading-relaxed line-clamp-3">
                    {request.description}
                  </p>
                )}

                {/* Requester */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2.5">
                  {requester?._id ? (
                    <Link
                      to={`/profile/${requester._id}`}
                      className="flex items-center gap-2.5 min-w-0 group/requester"
                      title="View profile"
                    >
                      <Avatar
                        src={requester.profileImage}
                        name={requester.fullName || "Student"}
                        textClassName="text-xs"
                        className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-50 group-hover/requester:ring-indigo-200 transition"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-gray-900 truncate group-hover/requester:text-indigo-600 transition">
                          {isOwn ? "You" : requester.fullName || "Campus Student"}
                        </p>
                        <p className="text-[10px] text-gray-500 font-semibold truncate">
                          {requester.department || "Student"}
                          {requester.year ? ` | ${requester.year}` : ""}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <FaUser className="text-xs" />
                      </div>
                      <p className="text-xs font-extrabold text-gray-500">
                        Campus Student
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  {requester?._id && !isOwn && (
                    <>
                      <Link
                        to={`/profile/${requester._id}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 text-xs font-bold text-gray-600 hover:text-indigo-700 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-100 px-3 py-2.5 rounded-xl transition"
                      >
                        <FaUser className="text-xs" />
                        Profile
                      </Link>

                      <Link
                        to={`/chat?seller=${requester._id}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-3 py-2.5 rounded-xl transition shadow-xs shadow-indigo-200"
                      >
                        <FaComments className="text-xs" />
                        Chat
                      </Link>
                    </>
                  )}

                  {isOwn && (
                    <button
                      type="button"
                      onClick={() => handleDelete(request._id)}
                      disabled={deletingId === request._id}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-3 py-2.5 rounded-xl transition disabled:opacity-60 cursor-pointer"
                    >
                      <FaTrash className="text-xs" />
                      {deletingId === request._id
                        ? "Deleting..."
                        : "Delete Request"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-xs max-w-md mx-auto mt-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <FaBullhorn className="text-xl" />
          </div>

          <h3 className="font-extrabold text-lg text-gray-900 mb-1">
            {requests.length === 0
              ? "No requests yet"
              : "No matching requests"}
          </h3>

          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            {requests.length === 0
              ? "Be the first to post what you are looking for on campus."
              : "Try a different search or category filter."}
          </p>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md shadow-indigo-200 cursor-pointer"
          >
            <FaPlusCircle className="text-xs" />
            Post a Request
          </button>
        </div>
      )}

      {/* ========================= POST MODAL ========================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[150] flex items-end md:items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 border border-gray-100 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="bg-indigo-600 text-white p-2.5 rounded-xl">
                  <FaBullhorn className="text-sm" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">
                    Post a Request
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Tell students what you need
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full bg-gray-100 cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  What are you looking for?
                </label>
                <input
                  type="text"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  placeholder="e.g. Casio FX-991 calculator"
                  className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:border-indigo-600 focus:bg-white transition cursor-pointer"
                >
                  {REQUEST_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Details <span className="text-gray-400 font-semibold">(optional)</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Budget, preferred condition, hostel block..."
                  className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-600 focus:bg-white transition resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-3 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-xs py-3 rounded-xl transition shadow-md shadow-indigo-200 disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Posting..." : "Post Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
