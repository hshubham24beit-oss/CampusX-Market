import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FaCloudUploadAlt,
  FaTimes,
  FaTag,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaClipboardList,
  FaImages,
  FaInfoCircle,
  FaShieldAlt,
  FaCheckCircle,
  FaChevronLeft,
  FaBoxOpen,
} from 'react-icons/fa';
import { productAPI } from "../../api/product.api";
import { categoryAPI } from "../../api/category.api";
import { CONDITIONS } from "../../utils/constants";

export default function SellProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    condition: 'Like New',
    pickupLocation: '',
    pickupInstructions: '',
    description: '',
  });

  // Image Upload State
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  useEffect(() => {
  fetchCategories();
  if (isEditing) {
    fetchProduct();
  }
}, [id]);

const fetchCategories = async () => {
  try {
    setCategoryLoading(true);

    const response = await categoryAPI.getCategories();

    console.log("SELL PRODUCT CATEGORIES:", response);

    if (response.success) {
      const backendCategories = response.data || [];

      // Don't show Cycles
      const filteredCategories = backendCategories.filter(
        (category) => category.name !== "Cycles"
      );

      setCategories(filteredCategories);
    } else {
      setError(
        response.message || "Failed to load categories."
      );
    }
  } catch (err) {
    console.error("Category Fetch Error:", err);

    setError(
      err.response?.data?.message ||
        "Unable to load categories."
    );
  } finally {
    setCategoryLoading(false);
  }
};
  const fetchProduct = async () => {
    try {
      const response = await productAPI.getProductById(id);
      const product = response.data;

      if (!product) {
        setError("Product not found.");
        return;
      }

      setFormData({
        title: product.title || "",
        category: product.category?.name || product.category || "",
        price: product.price ?? "",
        condition: product.condition || "Good",
        pickupLocation: product.pickupLocation || "",
        pickupInstructions: product.pickupInstructions || "",
        description: product.description || "",
      });

      if (product.images?.length) {
        setExistingImages(product.images);
        setImagePreviews(product.images);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load product details."
      );
    }
  };

  const conditions = CONDITIONS;

  // Handle Text/Select Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length + existingImages.length > 5) {
      setError('You can upload a maximum of 5 images.');
      return;
    }

    const oversized = files.find((file) => file.size > 5 * 1024 * 1024);

    if (oversized) {
      setError('Each image must be smaller than 5MB.');
      return;
    }

    setError('');
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setSelectedImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = '';
  };

  // Remove Image (existing or newly selected)
  const handleRemoveImage = (index) => {
    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setSelectedImages((prev) => prev.filter((_, i) => i !== newIndex));
    }

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.price ||
      !formData.pickupLocation ||
      !formData.description ||
      !formData.category
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare Multipart Form Data for Backend
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      selectedImages.forEach((file) => {
        data.append('images', file);
      });

      if (isEditing) {
        data.append('existingImages', JSON.stringify(existingImages));
        await productAPI.updateProduct(id, data);
      } else {
        await productAPI.createProduct(data);
      }

      navigate('/profile');
    } catch (err) {
        console.log("FULL ERROR:", err.response);
        console.log("BACKEND:", err.response?.data);

        setError(err.response?.data?.message || "Failed to publish product");
      }   finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-gray-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition";

  const selectClass =
    "w-full bg-white border border-gray-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition appearance-none cursor-pointer";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-6 items-start">

        <div className="space-y-6">
          {/* Header Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-indigo-200/60">
            <div className="absolute -top-16 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-10 w-52 h-52 rounded-full bg-fuchsia-400/20 blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center text-xl shrink-0">
                  {isEditing ? <FaTag /> : <FaBoxOpen />}
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-black tracking-tight">
                    {isEditing ? "Edit Your Listing" : "List an Item for Sale"}
                  </h1>
                  <p className="text-xs md:text-sm text-indigo-100/90 mt-1 max-w-lg leading-relaxed">
                    {isEditing
                      ? "Update the details below and save your changes."
                      : "Turn your unused campus essentials into cash in a few clicks."}
                  </p>
                </div>
              </div>

              <Link
                to={isEditing ? `/products/${id}` : "/profile"}
                className="inline-flex items-center gap-2 self-start sm:self-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition backdrop-blur-sm"
              >
                <FaChevronLeft className="text-[10px]" />
                {isEditing ? "Back to product" : "My profile"}
              </Link>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-4 rounded-2xl">
              <FaInfoCircle className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Item Details */}
            <section className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5 md:p-7 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
                  <FaTag />
                </span>
                <div>
                  <h2 className="text-sm font-black text-gray-900">Item details</h2>
                  <p className="text-[11px] text-gray-500">Tell buyers what you are selling.</p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">
                  Item Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Casio Scientific Calculator fx-991EX"
                    className={inputClass}
                    maxLength={100}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={selectClass}
                      required
                    >
                      <option value="">
                        {categoryLoading ? "Loading categories..." : "Select Category"}
                      </option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="number"
                      name="price"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 1200"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">
                  Condition
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {conditions.map((cond) => {
                    const active = formData.condition === cond;
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, condition: cond }))
                        }
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                          active
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                            : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                        }`}
                      >
                        {active && <FaCheckCircle className="text-[10px]" />}
                        {cond}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Photos */}
            <section className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5 md:p-7 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-sm">
                    <FaImages />
                  </span>
                  <div>
                    <h2 className="text-sm font-black text-gray-900">Photos</h2>
                    <p className="text-[11px] text-gray-500">Up to 5 clear photos get more responses.</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-gray-400 shrink-0">
                  {imagePreviews.length}/5
                </span>
              </div>

              <div className="relative rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-7 text-center hover:border-indigo-400 hover:bg-indigo-50/70 transition cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="pointer-events-none">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-white text-indigo-600 flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition">
                    <FaCloudUploadAlt />
                  </div>
                  <p className="text-sm font-extrabold text-gray-800 mt-3">
                    Click to upload photos
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    PNG, JPG or WEBP, up to 5MB each
                  </p>
                </div>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {imagePreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 group"
                    >
                      <img
                        src={src}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full text-[10px] transition cursor-pointer"
                        title="Remove photo"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Description & Handover */}
            <section className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5 md:p-7 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <h2 className="text-sm font-black text-gray-900">Description & handover</h2>
                  <p className="text-[11px] text-gray-500">Help buyers know exactly what to expect.</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] font-bold text-gray-400">
                    {formData.description.length}/600
                  </span>
                </div>
                <textarea
                  name="description"
                  rows="4"
                  maxLength={600}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe the condition, features, reason for selling, or negotiable status..."
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">
                    Pickup Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="e.g. Hostel 3 / Central Library"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">
                    Pickup Instructions
                  </label>
                  <div className="relative">
                    <FaClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      name="pickupInstructions"
                      value={formData.pickupInstructions}
                      onChange={handleChange}
                      placeholder="e.g. After 4:30 PM near the gate"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-sm py-4 rounded-2xl transition shadow-lg shadow-indigo-200 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {loading
                  ? isEditing
                    ? "Saving Changes..."
                    : "Publishing Listing..."
                  : isEditing
                    ? "Save Changes"
                    : "Publish Item Now"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="sm:w-40 border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm py-4 rounded-2xl transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview & Tips */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                Live Preview
              </h3>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Buyer view
              </span>
            </div>

            <div className="mx-5 aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 border border-gray-100 flex items-center justify-center">
              {imagePreviews[0] ? (
                <img
                  src={imagePreviews[0]}
                  alt="Listing preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-indigo-300 px-4">
                  <FaImages className="text-3xl mx-auto mb-2" />
                  <p className="text-[11px] font-bold text-indigo-400">
                    Your first photo appears here
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {formData.category && (
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-md">
                    {formData.category}
                  </span>
                )}
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-md">
                  {formData.condition}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-gray-900 line-clamp-2">
                {formData.title || "Your item title will appear here"}
              </h4>

              <p className="text-lg font-black text-indigo-600">
                ₹{Number(formData.price || 0).toLocaleString("en-IN")}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-semibold pt-2 border-t border-gray-100">
                <FaMapMarkerAlt className="text-gray-400 text-[10px]" />
                {formData.pickupLocation || "Add a campus pickup spot"}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-3">
              Listing tips
            </h3>
            <ul className="space-y-3 text-[11px] text-gray-600 font-medium leading-relaxed">
              {[
                "Use natural light and photograph all angles.",
                "Mention any scratches, marks, or missing parts.",
                "Price fairly by checking similar campus listings.",
                "Choose a pickup spot that is easy to find.",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-emerald-500 text-[11px] mt-0.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-amber-200/70 bg-amber-50/70 p-5">
            <div className="flex items-center gap-2 text-amber-800 mb-1.5">
              <FaShieldAlt className="text-sm" />
              <h3 className="text-xs font-black uppercase tracking-wider">
                Safe exchange
              </h3>
            </div>
            <p className="text-[11px] text-amber-700/90 font-medium leading-relaxed">
              Meet inside campus, inspect the item before paying, and keep
              conversations inside CampusX Market.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}