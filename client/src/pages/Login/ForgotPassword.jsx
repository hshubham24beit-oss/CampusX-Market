import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../../api/auth.api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await authAPI.forgotPassword(email);
      setMessage(
        res.data?.message ||
          "If that account exists, a reset link has been sent."
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to send the reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-md rounded-3xl border border-gray-100 shadow-xl p-8">
        <Link to="/login" className="text-xs font-bold text-indigo-600">
          ← Back to Login
        </Link>

        <h1 className="text-2xl font-black text-gray-900 mt-5">
          Forgot Password?
        </h1>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          Enter your college email and we will send you a reset link.
        </p>

        {message && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold p-3 rounded-xl">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">
              College Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@student.mes.ac.in"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-sm py-3 rounded-xl transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
