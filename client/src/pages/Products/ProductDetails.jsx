// src/pages/Products/ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
  FaRegCalendarAlt,
  FaComment,
  FaShoppingCart,
  FaBolt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheck,
  FaShieldAlt,
  FaArrowLeft,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { productAPI } from "../../api/product.api";
import { cartAPI } from "../../api/cart.api";
import { orderAPI } from "../../api/order.api";
import { reviewAPI } from "../../api/review.api";
import { wishlistAPI } from "../../api/wishlist.api";
import { formatPrice } from "../../utils/formatPrice";
import Modal from "../../components/common/Modal";
import Avatar from "../../components/common/Avatar";
import Loader from "../../components/common/Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isCheckoutQuery =
    new URLSearchParams(location.search).get("checkout") === "true";

  // =========================
  // STATE
  // =========================
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState("");

  // Order modal state
  const [showOrderModal, setShowOrderModal] = useState(isCheckoutQuery);
  const [pickupNote, setPickupNote] = useState("");
  const [phoneNote, setPhoneNote] = useState(user?.phone || "");
  const [placingOrder, setPlacingOrder] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const isOwner =
    user?._id &&
    product?.seller?._id &&
    String(user._id) === String(product.seller._id);

  // =========================
  // TOAST
  // =========================
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  // =========================
  // FETCH PRODUCT & REVIEWS
  // =========================
  useEffect(() => {
    fetchProduct();
    fetchReviews();
    checkWishlist();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await productAPI.getProductById(id);
      if (response.success) {
        setProduct(response.data);
      } else {
        setError(response.message || "Product not found.");
      }
    } catch (err) {
      console.error("Product Details Error:", err);
      setError(
        err.response?.data?.message || "Unable to load product details."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await reviewAPI.getProductReviews(id);
      setReviews(res.data || []);
    } catch (err) {
      console.error("Reviews fetch error:", err);
    }
  };

  const checkWishlist = async () => {
    if (!localStorage.getItem("token")) {
      setIsWishlisted(false);
      return;
    }

    try {
      const res = await wishlistAPI.getWishlist();
      const productIds =
        res.data?.products?.map((p) => p._id || p) || [];
      setIsWishlisted(productIds.includes(id));
    } catch {
      setIsWishlisted(false);
    }
  };

  // =========================
  // WISHLIST TOGGLE
  // =========================
  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await wishlistAPI.removeFromWishlist(id);
        setIsWishlisted(false);
        showToast("Removed from wishlist");
      } else {
        await wishlistAPI.addToWishlist(id);
        setIsWishlisted(true);
        showToast("❤️ Added to wishlist");
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Wishlist action failed");
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {
    try {
      await cartAPI.addToCart(product._id);
      showToast("🛒 Product added to cart successfully!");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "❌ Failed to add product.");
    }
  };

  // =========================
  // PLACE ORDER
  // =========================
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!product?._id) return;

    try {
      setPlacingOrder(true);
      await orderAPI.createOrder(product._id, {
        address: pickupNote.trim() || product.pickupLocation || "Campus",
        phone: phoneNote.trim(),
      });

      setShowOrderModal(false);
      showToast("🎉 Order placed successfully! Check My Orders.");

      setTimeout(() => {
        navigate("/orders");
      }, 1200);
    } catch (err) {
      console.error("Place order error:", err);
      showToast(err.response?.data?.message || "Failed to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // SUBMIT REVIEW
  // =========================
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast("Please enter a review comment.");
      return;
    }

    try {
      setSubmittingReview(true);
      await reviewAPI.createReview({
        productId: product._id,
        rating: reviewRating,
        comment: reviewComment.trim(),
      });

      setReviewComment("");
      setReviewRating(5);
      showToast("⭐ Review submitted successfully!");
      await fetchReviews();
      await fetchProduct();
    } catch (err) {
      console.error("Review submit error:", err);
      showToast(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDeleteProduct = async () => {
    try {
      setDeleting(true);
      await productAPI.deleteProduct(product._id);
      setShowDeleteModal(false);
      showToast("Product deleted successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 1200);
    } catch (err) {
      console.error("Delete Product Error:", err);
      showToast(err.response?.data?.message || "Failed to delete product.");
    } finally {
      setDeleting(false);
    }
  };

  // =========================
  // IMAGE NAVIGATION
  // =========================
  const images =
    product?.images && product.images.length > 0 ? product.images : [];

  const handlePrevImage = () => {
    if (images.length === 0) return;
    setSelectedImgIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (images.length === 0) return;
    setSelectedImgIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // =========================
  // LOADING / ERROR
  // =========================
  if (loading) {
    return <Loader text="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center max-w-md w-full shadow-sm">
          <div className="text-4xl mb-4">📦</div>
          <h2 className="text-xl font-extrabold text-gray-900">
            Product Not Found
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {error || "This product may have been removed."}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-5 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
          >
            <FaArrowLeft />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const seller = product.seller;
  const categoryName = product.category?.name || "Other";
  const sellerName = seller?.fullName || "Campus Student";
  const sellerDepartment = seller?.department || "Student";
  const sellerYear = seller?.year || "";
  const sellerEmail = seller?.email || "";
  const sellerImage = seller?.profileImage || "";

  const formattedDate = product.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="bg-gray-50/50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOAST */}
        {toast && (
          <div className="fixed top-5 right-5 z-[300] bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2">
            <span>✓</span>
            {toast}
          </div>
        )}

        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-indigo-600 transition cursor-pointer"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* =========================
            MAIN PRODUCT SECTION
        ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-[380px] md:h-[450px] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm group">
              {images.length > 0 ? (
                <img
                  src={images[selectedImgIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <div className="text-6xl mb-3">📦</div>
                  <p className="text-sm font-bold">No Image Available</p>
                  <p className="text-xs mt-1">Seller didn't upload a photo</p>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={toggleWishlist}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full text-gray-500 hover:text-red-500 shadow-md transition cursor-pointer z-10"
              >
                {isWishlisted ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>

              {/* Available Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${
                    product.status === "available"
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.status === "available" ? "Available" : "Sold"}
                </span>
              </div>

              {/* Image Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 p-3 rounded-full shadow-md text-gray-700 hover:bg-white transition cursor-pointer"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 p-3 rounded-full shadow-md text-gray-700 hover:bg-white transition cursor-pointer"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImgIndex(index)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                      selectedImgIndex === index
                        ? "border-indigo-600 ring-2 ring-indigo-100"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* MIDDLE: PRODUCT DETAILS */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold text-[11px] px-2.5 py-1 rounded-md inline-block mb-3">
                {categoryName}
              </span>

              <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 mt-3">
                <span className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-gray-800 font-bold text-xs px-2.5 py-1 rounded-lg">
                  <FaStar className="text-amber-400" />
                  {product.totalRatings
                    ? Number(product.averageRating || 0).toFixed(1)
                    : "New"}{" "}
                  ({reviews.length} reviews)
                </span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-gray-500 text-xs font-medium">
                  Posted {formattedDate}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-5">
                <span className="text-3xl font-black text-gray-900">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs font-medium">
                  Category
                </span>
                <span className="font-bold text-gray-800 text-xs">
                  {categoryName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs font-medium">
                  Condition
                </span>
                <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg font-bold text-xs">
                  {product.condition}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs font-medium">
                  Pickup Location
                </span>
                <span className="font-bold text-gray-800 text-xs">
                  {product.pickupLocation || "College Campus"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-extrabold text-sm text-gray-900 mb-2">
                Description
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description ||
                  "No description provided by the seller."}
              </p>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {!isOwner ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-2xl py-3.5 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>

                    <button
                      disabled={product.status === "sold"}
                      onClick={() => setShowOrderModal(true)}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl py-3.5 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-indigo-200"
                    >
                      <FaBolt />
                      {product.status === "sold" ? "Sold Out" : "Buy Now"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/products/${product._id}/edit`)}
                    className="w-full bg-indigo-50 border border-indigo-200 text-indigo-600 font-bold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-100 transition cursor-pointer"
                  >
                    <FaEdit />
                    Edit Product
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    disabled={deleting}
                    className="w-full bg-red-50 border border-red-200 text-red-600 font-bold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition disabled:opacity-60 cursor-pointer"
                  >
                    <FaTrash />
                    {deleting ? "Deleting Product..." : "Delete Product"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: SELLER INFORMATION */}
          <div className="lg:col-span-3 space-y-5">
            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-sm text-gray-900">
                Seller Information
              </h4>

              <div className="flex items-center gap-3">
                <Avatar
                  src={sellerImage}
                  name={sellerName}
                  textClassName="text-base"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-50"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-extrabold text-sm text-gray-900 truncate">
                      {sellerName}
                    </h5>
                    <FaCheck className="text-[9px] bg-emerald-500 text-white rounded-full p-0.5 shrink-0" />
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">
                    {sellerDepartment}
                    {sellerYear ? ` • ${sellerYear}` : ""}
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-2 rounded-xl inline-flex items-center gap-1.5 w-full">
                <FaShieldAlt className="text-xs shrink-0" />
                Verified Pillai Student
              </div>

              {sellerEmail && (
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold">
                    Email
                  </p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5 break-all">
                    {sellerEmail}
                  </p>
                </div>
              )}

              {/* Chat & Profile Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  to={`/profile/${seller?._id || ""}`}
                  className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center transition"
                >
                  View Profile
                </Link>

                {!isOwner && (
                  <Link
                    to={`/chat?seller=${seller?._id || ""}&product=${product._id}`}
                    className="w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-xs"
                  >
                    <FaComment />
                    Chat with Seller
                  </Link>
                )}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
              <h4 className="font-extrabold text-sm text-gray-900">
                Safe Campus Exchange
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
                <li className="flex items-center gap-2">
                  <FaCheck className="text-indigo-600 text-xs shrink-0" />
                  Meet at campus spots (canteen/library)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-indigo-600 text-xs shrink-0" />
                  Inspect item before payment
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-indigo-600 text-xs shrink-0" />
                  Pay cash or UPI upon handover
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* =========================
            PURCHASE & REVIEWS SECTION
        ========================= */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-8">
          <div>
            <h3 className="font-black text-lg text-gray-900 mb-2">
              Reviews & Ratings ({reviews.length})
            </h3>
            <p className="text-xs text-gray-500">
              Student feedback on this product and seller
            </p>
          </div>

          {/* Write a review (if not owner) */}
          {!isOwner && (
            <form
              onSubmit={handleSubmitReview}
              className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200 space-y-4"
            >
              <h4 className="font-extrabold text-sm text-gray-900">
                Write a Review
              </h4>

              {/* Star selector */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  Rating:
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-lg cursor-pointer transition hover:scale-110"
                    >
                      <FaStar
                        className={
                          star <= reviewRating
                            ? "text-amber-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-2">
                    {reviewRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Comment input */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">
                  Your feedback:
                </label>
                <textarea
                  rows="3"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details about the item's condition, meeting up with the seller, etc..."
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs disabled:opacity-60 cursor-pointer"
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-xs font-semibold">
                No reviews yet. Be the first student to review!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        src={rev.user?.profileImage}
                        name={rev.user?.fullName || "Student"}
                        textClassName="text-[11px]"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-extrabold text-xs text-gray-900">
                          {rev.user?.fullName || "Student"}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {rev.user?.department}{" "}
                          {rev.user?.year ? `• ${rev.user.year}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                      <FaStar className="text-amber-400 text-xs" />
                      <span className="font-black text-xs text-gray-800">
                        {rev.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed pl-10">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================
          ORDER MODAL
      ========================= */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title="Confirm Campus Order"
      >
        <form onSubmit={handleConfirmOrder} className="space-y-4">
          <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-2xl">
            <h4 className="font-bold text-sm text-indigo-950">
              {product.title}
            </h4>
            <p className="font-black text-indigo-700 text-lg mt-1">
              {formatPrice(product.price)}
            </p>
            <p className="text-[11px] text-indigo-600 mt-1">
              Seller: {sellerName} ({sellerDepartment})
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Pickup Note / Meeting Preference
            </label>
            <input
              type="text"
              value={pickupNote}
              onChange={(e) => setPickupNote(e.target.value)}
              placeholder="e.g. Near Library Gate / After 4 PM"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Your Contact Phone Number
            </label>
            <input
              type="tel"
              value={phoneNote}
              onChange={(e) => setPhoneNote(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 outline-none focus:border-indigo-600"
            />
          </div>

          <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-[11px] text-amber-800">
            Payment is made directly to the seller via Cash or UPI at campus
            handover.
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowOrderModal(false)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={placingOrder}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md shadow-indigo-200 disabled:opacity-60"
            >
              {placingOrder ? "Placing Order..." : "Confirm & Place Order"}
            </button>
          </div>
        </form>
      </Modal>

      {/* =========================
          DELETE MODAL
      ========================= */}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Product?"
        >
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xl">
              🗑️
            </div>
            <p className="text-xs text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-bold text-gray-900">"{product.title}"</span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="flex-1 border border-gray-200 text-gray-600 font-bold text-xs py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteProduct}
                disabled={deleting}
                className="flex-1 bg-red-500 text-white font-bold text-xs py-3 rounded-xl hover:bg-red-600 transition disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}