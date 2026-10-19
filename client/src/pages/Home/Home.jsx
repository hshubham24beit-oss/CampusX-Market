import React, { useEffect, useState } from "react";
import { 
  FaHeart, FaRegHeart, FaShieldAlt, FaStar, FaBolt, 
  FaTag, FaComments, FaFire, FaCheckCircle, FaUser
} from 'react-icons/fa';
import Hero from '../../components/Hero/Hero';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from "../../api/product.api";
import { requestAPI } from "../../api/request.api";
import Avatar from "../../components/common/Avatar";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../hooks/useAuth";
import { wishlistAPI } from "../../api/wishlist.api";


export default function Home() {
  const navigate = useNavigate();

  // State for Category Filtering & Wishlist Items
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState([]);
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();

  const [wishlistMessage, setWishlistMessage] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);

  const [requestForm, setRequestForm] = useState({
    productName: "",
    category: "Electronics",
    description: "",
  });

  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

      const handleRequestChange = (e) => {
      const { name, value } = e.target;

      setRequestForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

          const handleRequestSubmit = async (e) => {
        e.preventDefault();

        if (!requestForm.productName.trim()) {
          setRequestError("Please enter the product name.");
          return;
        }

        setRequestLoading(true);
        setRequestError("");

        try {
          const response = await requestAPI.createRequest({
            productName: requestForm.productName.trim(),
            category: requestForm.category,
            description: requestForm.description.trim(),
          });

          console.log("CREATE REQUEST:", response);

          if (response.success) {
            // Clear form
            setRequestForm({
              productName: "",
              category: "Electronics",
              description: "",
            });

            // Close popup
            setShowRequestModal(false);

            // Refresh requests
            fetchRequests();
          } else {
            setRequestError(
              response.message || "Failed to post request."
            );
          }
        } catch (err) {
          console.error("Create Request Error:", err);

          setRequestError(
            err.response?.data?.message ||
              "Failed to post request."
          );
        } finally {
          setRequestLoading(false);
        }
      };

  const categories = [
    { name: 'All', icon: '🔥', bg: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { name: 'Books', icon: '📚', bg: 'bg-purple-50 border-purple-100' },
    { name: 'Electronics', icon: '💻', bg: 'bg-emerald-50 border-emerald-100' },
    { name: 'Furniture', icon: '🪑', bg: 'bg-amber-50 border-amber-100' },
     {
    name: "Notes",
    icon: "📝",
    bg: "bg-gray-50 border-gray-200"
    },
    { name: 'Stationery', icon: '✏️', bg: 'bg-blue-50 border-blue-100' },
    { name: 'Sports', icon: '🏸', bg: 'bg-teal-50 border-teal-100' },
    { name: 'Others', icon: '💬', bg: 'bg-gray-100 border-gray-200' },
  ];

  const trendingItems = [
    { id: 2, name: "Engineering Maths Book", price: "450", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop" },
    { id: 1, name: "boAt Airdopes 131", price: "999", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop" },
    { id: 3, name: "Study Table", price: "2,500", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=150&auto=format&fit=crop" },
  ];

          // UX Logic: Wishlist toggle
        const toggleWishlist = async (productId) => {
          if (!user) {
            navigate("/login");
            return;
          }

          try {
            // Remove from wishlist
            if (wishlist.includes(productId)) {
              const response =
                await wishlistAPI.removeFromWishlist(productId);

              if (response.success) {
                setWishlist((prev) =>
                  prev.filter((id) => id !== productId)
                );

                setWishlistMessage("Removed from wishlist");
              }

              return;
            }

            // Add to wishlist
            const response =
              await wishlistAPI.addToWishlist(productId);

            if (response.success) {
              setWishlist((prev) => [
                ...prev,
                productId,
              ]);

              setWishlistMessage("❤️ Added to wishlist");
            }

          } catch (err) {
            console.error("Wishlist Error:", err);

            setWishlistMessage(
              err.response?.data?.message ||
              "Something went wrong"
            );
          }

          // Automatically hide message
          setTimeout(() => {
            setWishlistMessage("");
          }, 2500);
        };

                // =========================
        // FETCH WISHLIST
        // =========================
        const fetchWishlist = async () => {
          if (!user) {
            setWishlist([]);
            return;
          }

          try {

            const response =
              await wishlistAPI.getWishlist();

            console.log("MY WISHLIST:", response);

            if (response.success) {

              const productIds =
                response.data?.products?.map(
                  (product) => product._id
                ) || [];

              setWishlist(productIds);

            } else {

              setWishlist([]);

            }

          } catch (err) {

            console.error(
              "Wishlist Fetch Error:",
              err
            );

            setWishlist([]);
          }
        };
          // =========================
      // FETCH PRODUCTS
      // =========================
      const fetchProducts = async () => {
        try {
          setLoading(true);

          const response = await productAPI.getProducts();

          console.log("PRODUCTS:", response);

          if (response.success) {
            setAllProducts(response.data || []);
          } else {
            setAllProducts([]);
          }
        } catch (err) {
          console.error("Products Error:", err);
          setAllProducts([]);
        } finally {
          setLoading(false);
        }
      };


      // =========================
      // FETCH REQUESTS
      // =========================
      const fetchRequests = async () => {
        try {
          const response = await requestAPI.getRequests();

          console.log("REQUESTS:", response);

          if (response.success) {
            setRequests(response.data || []);
          } else {
            setRequests([]);
          }
        } catch (err) {
          console.error("Requests Error:", err);
          setRequests([]);
        }
      };


      // =========================
      // LOAD DATA
      // =========================
      useEffect(() => {
        fetchProducts();
        fetchRequests();
      }, []);

      // Wishlist is protected: only fetch for logged-in users
      useEffect(() => {
        fetchWishlist();
      }, [user]);


    if (loading) {
        return <Loader text="Loading your campus feed..." />;
    }

  // UX Logic: Filter products by selected category
      const filteredProducts =
      selectedCategory === "All"
        ? allProducts
        : allProducts.filter(
            (item) => item.category?.name === selectedCategory
          );

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full min-w-0 items-start">

      {wishlistMessage && (
        <div className="fixed top-20 right-5 z-[100]">
          <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
            {wishlistMessage}
          </div>
        </div>
      )}
      
      {/* Central Main Feed */}
      <div className="w-full lg:flex-1 min-w-0 space-y-8">       
        {/* Dynamic Sliding Hero Carousel */}
        <Hero />

        {/* Interactive Shop by Category */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-gray-900">Shop by Category</h3>
            {selectedCategory !== 'All' && (
              <button 
                onClick={() => setSelectedCategory('All')}
                className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
              >
                Clear Filter ✕
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat, idx) => {
              const isActive = selectedCategory === cat.name;
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`${cat.bg} p-3.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition border duration-200 select-none ${
                    isActive ? 'ring-2 ring-indigo-600 scale-105 shadow-md' : 'hover:-translate-y-1 hover:shadow-xs'
                  }`}
                >
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="text-xs font-bold text-gray-800">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Items with Wishlist & Category Filter */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-gray-900">Recommended for You</h3>
              {selectedCategory !== 'All' && (
                <span className="bg-indigo-100 text-indigo-700 font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {selectedCategory}
                </span>
              )}
            </div>
            <Link to="/products" className="text-xs text-indigo-600 font-bold hover:underline">View all</Link>
          </div>

          {filteredProducts.length === 0 ? (
                        /* Empty State UX */
                       <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center space-y-2">
                          <p className="text-2xl">📦</p>
                          <h4 className="font-bold text-sm text-gray-800">No items found in {selectedCategory}</h4>
                          <p className="text-xs text-gray-500">Be the first student to list a product here!</p>
                          <button 
                            onClick={() => setSelectedCategory('All')} 
                            className="mt-2 text-xs bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl cursor-pointer"
                          >
                            Show All Items
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((item) => {
              const isSaved = wishlist.includes(item._id);

              return (
                <Link
                  key={item._id}
                  to={`/products/${item._id}`}
                  className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs hover:shadow-lg transition duration-200 cursor-pointer relative group flex flex-col justify-between"
                >
                  {/* Product Information */}
                  <div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(item._id);
                      }}
                      className="absolute top-5 right-5 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-400 hover:text-red-500 transition shadow-xs z-10 active:scale-90"
                    >
                      {isSaved ? (
                        <FaHeart className="text-xs text-red-500" />
                      ) : (
                        <FaRegHeart className="text-xs" />
                      )}
                    </button>

                    {/* PRODUCT IMAGE */}
                    <div className="h-40 rounded-xl overflow-hidden mb-3 bg-gray-100 relative">

                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <span className="text-4xl">📦</span>
                          <span className="text-xs mt-1 font-semibold">
                            No Image
                          </span>
                        </div>
                      )}

                      {/* Condition Badge */}
                      <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                        {item.condition}
                      </span>

                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-sm text-gray-900 leading-snug line-clamp-1">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>

                  </div>

                  {/* Price + Seller */}
                  <div className="mt-3 pt-3 border-t border-gray-100">

                    {/* Price */}
                    <p className="font-black text-base text-gray-900 mb-2">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>

                    {/* Seller Information */}
                    <div className="flex items-center justify-between text-xs">

                      <div className="flex items-center gap-1.5 min-w-0">

                        {/* Seller Profile Image */}
                        <Avatar
                          src={item.seller?.profileImage}
                          name={item.seller?.fullName || "Seller"}
                          textClassName="text-[9px]"
                          className="w-6 h-6 rounded-full shrink-0 object-cover"
                        />

                        {/* Seller Name + Department */}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-700 truncate">
                            {item.seller?.fullName || "Unknown Seller"}
                          </p>

                          <p className="text-gray-400 text-[10px]">
                            {item.seller?.department || ""}
                            {item.seller?.year
                              ? ` • ${item.seller.year}`
                              : ""}
                          </p>
                        </div>

                      </div>

                      {/* Rating */}
                      <span className="flex items-center gap-1 font-bold text-gray-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 shrink-0">
                        <FaStar className="text-amber-400 text-xs" />
                        {item.totalRatings
                          ? Number(item.averageRating || 0).toFixed(1)
                          : "New"}
                      </span>

                    </div>

                  </div>

              </Link>
              );
            })}
            </div>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3.5">
            <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl text-lg"><FaShieldAlt /></div>
            <div>
              <h5 className="font-bold text-xs text-gray-900">Safe & Secure</h5>
              <p className="text-[11px] text-gray-500">100% student verified</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3.5">
            <div className="bg-pink-100 text-pink-700 p-3 rounded-xl text-lg"><FaTag /></div>
            <div>
              <h5 className="font-bold text-xs text-gray-900">Best Prices</h5>
              <p className="text-[11px] text-gray-500">Student deals in campus</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3.5">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-xl text-lg"><FaComments /></div>
            <div>
              <h5 className="font-bold text-xs text-gray-900">Easy Chat</h5>
              <p className="text-[11px] text-gray-500">Chat directly with sellers</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3.5">
            <div className="bg-amber-100 text-amber-700 p-3 rounded-xl text-lg"><FaBolt /></div>
            <div>
              <h5 className="font-bold text-xs text-gray-900">Quick Deals</h5>
              <p className="text-[11px] text-gray-500">Fast campus meetups</p>
            </div>
          </div>
        </div>

      </div>

      {/* Right Sidebar Widgets */}
      <aside className="w-full lg:w-80 shrink-0 space-y-4 lg:space-y-6">
                
              {/* Verification Widget */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-emerald-600 text-base" />

              <div>
                <h4 className="font-bold text-sm text-emerald-950">
                  Verified Platform
                </h4>

                <p className="text-[10px] text-emerald-800 mt-0.5">
                  Only Pillai College students can buy & sell.
                </p>
              </div>
            </div>

            <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />

          </div>

          <span className="inline-flex items-center gap-1 mt-3 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
            <FaCheckCircle className="text-[10px]" />
            Student Verified
          </span>
        </div>

                {/* Students Looking For */}
        <div className="bg-white p-4 lg:p-5 rounded-2xl border border-gray-200/80 shadow-xs">

          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-4">

            <div>
              <h4 className="font-extrabold text-sm text-gray-900">
                Students Looking For 🔎
              </h4>

              <p className="text-[10px] text-gray-500 mt-1">
                Products students want to buy
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setRequestError("");
                setShowRequestModal(true);
              }}
              className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 whitespace-nowrap"
            >
              + Post Request
            </button>

          </div>

          {/* Requests */}
          {requests.length === 0 ? (

            <div className="text-center py-6">

              <div className="text-3xl mb-2">
                🔎
              </div>

              <p className="text-xs font-bold text-gray-700">
                No requests yet
              </p>

              <p className="text-[10px] text-gray-400 mt-1">
                Be the first student to post a request!
              </p>

              <button
                type="button"
                onClick={() => {
                  setRequestError("");
                  setShowRequestModal(true);
                }}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-4 py-2 rounded-lg transition"
              >
                + Post a Request
              </button>

            </div>

          ) : (

            <div className="space-y-3">

              {requests.slice(0, 5).map((request) => {
                const requester = request.requester;
                const isOwnRequest =
                  requester?._id &&
                  String(requester._id) === String(user?._id);

                return (
                  <div
                    key={request._id}
                    className="border border-gray-100 rounded-xl p-3 hover:bg-indigo-50/40 transition"
                  >

                    <div className="flex items-start gap-3">

                      <Avatar
                        src={requester?.profileImage}
                        name={requester?.fullName || "Student"}
                        textClassName="text-xs"
                        className="w-9 h-9 rounded-xl object-cover shrink-0"
                      />

                      <div className="min-w-0 flex-1">

                        <h5 className="font-bold text-xs text-gray-900 truncate">
                          {request.productName}
                        </h5>

                        <span className="inline-block mt-1 text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">
                          {request.category}
                        </span>

                        {request.description && (
                          <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                            {request.description}
                          </p>
                        )}

                        {requester?._id ? (
                          <div className="mt-2.5 flex items-center justify-between gap-2">

                            <Link
                              to={`/profile/${requester._id}`}
                              className="flex items-center gap-1.5 min-w-0 group/req"
                              title="View profile"
                            >
                              <span className="text-[10px] font-bold text-gray-700 truncate group-hover/req:text-indigo-600 transition">
                                {isOwnRequest
                                  ? "You"
                                  : requester.fullName || "Campus Student"}
                              </span>
                            </Link>

                            {!isOwnRequest && (
                              <div className="flex items-center gap-1.5 shrink-0">
                                <Link
                                  to={`/profile/${requester._id}`}
                                  className="inline-flex items-center gap-1 text-[9px] font-bold text-gray-600 hover:text-indigo-700 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-100 px-2 py-1 rounded-lg transition"
                                >
                                  <FaUser className="text-[8px]" />
                                  Profile
                                </Link>

                                <Link
                                  to={`/chat?seller=${requester._id}`}
                                  className="inline-flex items-center gap-1 text-[9px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded-lg transition"
                                >
                                  <FaComments className="text-[8px]" />
                                  Chat
                                </Link>
                              </div>
                            )}

                          </div>
                        ) : null}

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>
        
        {/* CTA Seller Box */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-4 lg:p-5 rounded-2xl flex items-center justify-between shadow-xs">

  <div className="min-w-0">
    <h4 className="font-extrabold text-sm text-indigo-950">
      Want to sell something?
    </h4>

    <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
      List your product and reach thousands of students.
    </p>

    <Link
      to="/sell"
      className="inline-block mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs"
    >
      Sell Now
    </Link>
  </div>

  <span className="text-4xl shrink-0 ml-4">
    🏪
  </span>

</div>

                  {/* =========================
              POST REQUEST MODAL
          ========================= */}

          {showRequestModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
              onClick={() => setShowRequestModal(false)}
            >

              <div
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >

                {/* Header */}
                <div className="flex items-start justify-between mb-5">

                  <div>
                    <h2 className="text-lg font-black text-gray-900">
                      Post a Request 🔎
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Tell other students what you're looking for.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold transition"
                  >
                    ×
                  </button>

                </div>

                {/* Error */}
                {requestError && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-xl">
                    {requestError}
                  </div>
                )}

                {/* Form */}
                <form
                  onSubmit={handleRequestSubmit}
                  className="space-y-4"
                >

                  {/* Product Name */}
                  <div>

                    <label className="block text-xs font-bold text-gray-800 mb-2">
                      What are you looking for?
                    </label>

                    <input
                      type="text"
                      name="productName"
                      value={requestForm.productName}
                      onChange={handleRequestChange}
                      placeholder="e.g. Scientific Calculator"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                    />

                  </div>

                  {/* Category */}
                  <div>

                    <label className="block text-xs font-bold text-gray-800 mb-2">
                      Category
                    </label>

                    <select
                      name="category"
                      value={requestForm.category}
                      onChange={handleRequestChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Books">Books</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Stationery">Stationery</option>
                      <option value="Sports">Sports</option>
                      <option value="Others">Others</option>
                    </select>

                  </div>

                  {/* Description */}
                  <div>

                    <label className="block text-xs font-bold text-gray-800 mb-2">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={requestForm.description}
                      onChange={handleRequestChange}
                      rows="3"
                      placeholder="Tell students more about what you need..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition resize-none"
                    />

                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">

                    <button
                      type="button"
                      onClick={() => setShowRequestModal(false)}
                      className="flex-1 border border-gray-200 text-gray-700 font-bold text-xs py-3 rounded-xl hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={requestLoading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition disabled:opacity-60"
                    >
                      {requestLoading
                        ? "Posting..."
                        : "Post Request"}
                    </button>

                  </div>

                </form>

              </div>

            </div>
          )}

      </aside>

    </div>

    
  );
}