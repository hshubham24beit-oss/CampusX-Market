import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaBoxOpen,
  FaExclamationTriangle,
  FaEye,
  FaPlusCircle,
  FaTag,
} from "react-icons/fa";
import { productAPI } from "../../api/product.api";
import { useAuth } from "../../hooks/useAuth";

export default function SellerCard({ userId }) {
  const { user } = useAuth();

  const sellerId = userId || user?._id;
  const isOwnProfile = !userId || String(userId) === String(user?._id);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  // Popup state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Toast state
  const [toast, setToast] = useState("");

  // =========================
  // SHOW TOAST
  // =========================
  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  // =========================
  // FETCH MY PRODUCTS
  // =========================
  useEffect(() => {
    if (sellerId) {
      fetchMyProducts();
    }
  }, [sellerId]);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);

      const response = await productAPI.getProducts({ limit: 50 });

      const allProducts = response.data || [];

      // Only show products belonging to the viewed seller
      const myProducts = allProducts.filter(
        (product) =>
          String(product.seller?._id) === String(sellerId)
      );

      setProducts(myProducts);
    } catch (error) {
      console.error("Error fetching my products:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to load your products."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN DELETE POPUP
  // =========================
  const openDeletePopup = (product) => {
    setSelectedProduct(product);
    setShowDeletePopup(true);
  };

  // =========================
  // CLOSE DELETE POPUP
  // =========================
  const closeDeletePopup = () => {
    if (deleting) return;

    setShowDeletePopup(false);
    setSelectedProduct(null);
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async () => {
    if (!selectedProduct) return;

    const productId = selectedProduct._id;

    try {
      setDeleting(productId);

      await productAPI.deleteProduct(productId);

      // Remove product from UI immediately
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );

      // Close popup
      setShowDeletePopup(false);
      setSelectedProduct(null);

      // Success toast
      showToast("🗑️ Product deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);

      showToast(
        error.response?.data?.message ||
          "❌ Failed to delete product."
      );
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="relative">

      {/* =========================
          SUCCESS / ERROR TOAST
      ========================= */}
      {toast && (
        <div className="fixed top-5 right-5 z-[200] bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <span>✓</span>
          {toast}
        </div>
      )}

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-black text-gray-900 tracking-tight">
            {isOwnProfile ? "My Listed Products" : "Listings"}
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            {isOwnProfile
              ? "Manage everything you have listed on campus."
              : "Items this student has listed for sale."}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-[11px] font-extrabold">
            {products.length} {products.length === 1 ? "listing" : "listings"}
          </span>

          {isOwnProfile && (
            <Link
              to="/sell"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-[11px] font-extrabold px-3.5 py-2 rounded-xl transition shadow-md shadow-indigo-200"
            >
              <FaPlusCircle className="text-[10px]" />
              New listing
            </Link>
          )}
        </div>
      </div>

      {/* =========================
          LOADING
      ========================= */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-gray-100 rounded-2xl h-64"
            />
          ))}
        </div>
      )}

      {/* =========================
          NO PRODUCTS
      ========================= */}
      {!loading && products.length === 0 && (
        <div className="relative overflow-hidden bg-white border-2 border-dashed border-indigo-200 rounded-3xl p-10 text-center">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-indigo-50" />

          <div className="relative">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 flex items-center justify-center text-2xl mb-4">
              <FaBoxOpen />
            </div>

            <h3 className="font-black text-base text-gray-900">
              {isOwnProfile ? "Nothing listed yet" : "No listings yet"}
            </h3>

            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
              {isOwnProfile
                ? "Turn your unused books, gadgets, or hostel essentials into cash. Your first listing takes less than a minute."
                : "This student hasn't listed any items for sale yet."}
            </p>

            {isOwnProfile && (
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 mt-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition shadow-md shadow-indigo-200"
              >
                <FaPlusCircle className="text-[10px]" />
                List your first item
              </Link>
            )}
          </div>
        </div>
      )}

      {/* =========================
          PRODUCTS
      ========================= */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white border border-gray-200/80 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-100/60 hover:-translate-y-0.5 transition duration-200"
            >

              {/* Product Image */}
              <Link
                to={`/products/${product._id}`}
                className="relative block h-44 bg-gray-100 overflow-hidden"
              >
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FaBoxOpen className="text-4xl" />
                  </div>
                )}

                <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-extrabold px-2 py-1 rounded-lg shadow-sm">
                  {product.condition}
                </span>

                <span
                  className={`absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-1 rounded-lg ${
                    product.status === "sold"
                      ? "bg-gray-900/80 text-white"
                      : "bg-emerald-500 text-white"
                  }`}
                >
                  {product.status === "sold" ? "Sold" : "Available"}
                </span>
              </Link>

              {/* Product Information */}
              <div className="p-4">
                {product.category?.name && (
                  <p className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-500 mb-1.5">
                    <FaTag className="text-[9px]" />
                    {product.category.name}
                  </p>
                )}

                <h3 className="font-extrabold text-sm text-gray-900 truncate">
                  {product.title}
                </h3>

                <p className="text-lg font-black text-gray-900 mt-1.5">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                  <Link
                    to={`/products/${product._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 py-2.5 rounded-xl text-[11px] font-extrabold hover:bg-indigo-100 transition"
                  >
                    <FaEye className="text-[10px]" />
                    View
                  </Link>

                  {isOwnProfile && (
                    <button
                      type="button"
                      onClick={() => openDeletePopup(product)}
                      disabled={deleting === product._id}
                      className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 border border-red-100 rounded-xl hover:bg-red-600 hover:text-white transition disabled:opacity-50 cursor-pointer"
                      title="Delete product"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* =========================
          DELETE CONFIRMATION POPUP
      ========================= */}
      {showDeletePopup && selectedProduct && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={closeDeletePopup}
        >

          <div
            className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <FaExclamationTriangle className="text-xl" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-black text-gray-900 text-center">
              Delete Product?
            </h3>

            {/* Message */}
            <p className="text-xs text-gray-500 text-center mt-2 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-bold text-gray-800">
                "{selectedProduct.title}"
              </span>
              ? This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">

              {/* Cancel */}
              <button
                type="button"
                onClick={closeDeletePopup}
                disabled={deleting}
                className="flex-1 border border-gray-200 text-gray-700 font-bold text-xs py-3 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <FaTrash />

                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}