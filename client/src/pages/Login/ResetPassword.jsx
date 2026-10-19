import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authAPI } from "../../api/auth.api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authAPI.resetPassword(token, password);
      alert("Password reset successfully. Please log in.");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "This reset link is invalid or has expired."
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
          Choose a New Password
        </h1>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          Your new password must be at least 6 characters long.
        </p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-sm py-3 rounded-xl transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
