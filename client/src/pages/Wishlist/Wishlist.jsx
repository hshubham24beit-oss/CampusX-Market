import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WishlistCard from "./WishlistCard";
import { wishlistAPI } from "../../api/wishlist.api";
import { cartAPI } from "../../api/cart.api";
import Loader from "../../components/common/Loader";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
  // FETCH WISHLIST
  // =========================
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await wishlistAPI.getWishlist();

      console.log("WISHLIST:", response);

      if (response.success) {
        setItems(response.data?.products || []);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Wishlist Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load wishlist."
      );

      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD WISHLIST
  // =========================
  useEffect(() => {
    fetchWishlist();
  }, []);

  // =========================
  // REMOVE SINGLE PRODUCT
  // =========================
  const handleRemove = async (productId) => {
    try {
      const response =
        await wishlistAPI.removeFromWishlist(productId);

      console.log("REMOVE WISHLIST:", response);

      if (response.success) {
        // Remove from UI immediately
        setItems((prevItems) =>
          prevItems.filter(
            (item) => item._id !== productId
          )
        );

        // Success toast
        showToast("🗑️ Product removed from wishlist");
      } else {
        showToast(
          response.message ||
            "Failed to remove product."
        );
      }
    } catch (err) {
      console.error(
        "Remove Wishlist Error:",
        err
      );

      showToast(
        err.response?.data?.message ||
          "❌ Failed to remove product."
      );
    }
  };

  // =========================
  // MOVE TO CART
  // =========================
  const handleMoveToCart = async (productId) => {
    try {
      await cartAPI.addToCart(productId);
      await wishlistAPI.removeFromWishlist(productId);
      setItems((prevItems) => prevItems.filter((item) => item._id !== productId));
      showToast("🛒 Moved to Cart successfully!");
    } catch (err) {
      console.error("Move to Cart Error:", err);
      showToast(err.response?.data?.message || "Failed to move to cart.");
    }
  };

  // =========================
  // CLEAR ALL WISHLIST
  // =========================
  const handleClearWishlist = async () => {
    if (items.length === 0) return;

    try {
      const response =
        await wishlistAPI.clearWishlist();

      console.log("CLEAR WISHLIST:", response);

      if (response.success) {
        // Clear all products from UI
        setItems([]);

        // Success toast
        showToast("🗑️ Wishlist cleared successfully");
      } else {
        showToast(
          response.message ||
            "Failed to clear wishlist."
        );
      }
    } catch (err) {
      console.error(
        "Clear Wishlist Error:",
        err
      );

      showToast(
        err.response?.data?.message ||
          "❌ Failed to clear wishlist."
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return <Loader text="Loading your wishlist..." />;
  }

  return (
    <div className="w-full">

      {/* =========================
          TOAST MESSAGE
      ========================= */}
      {toast && (
        <div className="fixed top-5 right-5 z-[100]">
          <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
            <span className="text-green-400">
              ✓
            </span>

            {toast}
          </div>
        </div>
      )}

      {/* =========================
          BREADCRUMB
      ========================= */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">

        <Link
          to="/"
          className="hover:text-indigo-600 transition"
        >
          Home
        </Link>

        <span>/</span>

        <span className="text-indigo-600 font-bold">
          Wishlist
        </span>

      </nav>

      {/* =========================
          ERROR
      ========================= */}
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-xl">
          {error}
        </div>
      )}

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex items-center justify-between mb-6 gap-3">

        <h2 className="text-2xl font-black text-gray-900 tracking-tight">

          My Wishlist{" "}

          <span className="text-gray-500 text-lg font-bold">
            ({items.length} Items)
          </span>

        </h2>

        {/* CLEAR ALL BUTTON */}
        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClearWishlist}
            className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs px-5 py-2.5 rounded-xl transition duration-200 cursor-pointer active:scale-95"
          >
            Clear Wishlist
          </button>
        )}

      </div>

      {/* =========================
          WISHLIST PRODUCTS
      ========================= */}
      {items.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {items.map((item) => (

            <WishlistCard
              key={item._id}

              id={item._id}

              title={item.title}

              desc={item.description}

              price={item.price}

              img={
                item.images &&
                item.images.length > 0
                  ? item.images[0]
                  : null
              }

              condition={item.condition}

              seller={item.seller}

              category={item.category}

              // Individual remove button
              onRemove={() =>
                handleRemove(item._id)
              }

              // Cart button
              onMoveToCart={() =>
                handleMoveToCart(item._id)
              }
            />

          ))}

        </div>

      ) : (

        /* =========================
           EMPTY WISHLIST
        ========================= */

        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-xs max-w-md mx-auto mt-10">

          <span className="text-5xl mb-4 block">
            ❤️
          </span>

          <h3 className="font-extrabold text-lg text-gray-900 mb-1">
            Your wishlist is empty
          </h3>

          <p className="text-xs text-gray-500 mb-6">
            Explore products and save your favorite items here.
          </p>

          <Link
            to="/products"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md shadow-indigo-200"
          >
            Explore Products
          </Link>

        </div>

      )}

    </div>
  );
}