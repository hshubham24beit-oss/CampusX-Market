import mongoose from "mongoose";
import Product from "./product.model.js";
import Category from "../categories/category.model.js";

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const resolveCategory = async (categoryValue) => {
  if (!categoryValue) {
    throw new Error("Category is required.");
  }

  if (mongoose.Types.ObjectId.isValid(categoryValue)) {
    const category = await Category.findById(categoryValue);

    if (category) {
      return category._id;
    }
  }

  const category = await Category.findOne({
    name: { $regex: `^${escapeRegex(categoryValue)}$`, $options: "i" },
  });

  if (!category) {
    throw new Error("Category not found.");
  }

  return category._id;
};

const ALLOWED_UPDATE_FIELDS = [
  "title",
  "description",
  "price",
  "condition",
  "images",
  "quantity",
  "pickupLocation",
  "pickupInstructions",
  "status",
];

export const createProduct = async (productData, userId) => {
  const categoryId = await resolveCategory(productData.category);

  const product = await Product.create({
    title: productData.title,
    description: productData.description,
    price: productData.price,
    category: categoryId,
    condition: productData.condition,
    images: productData.images || [],
    quantity: productData.quantity || 1,
    pickupLocation: productData.pickupLocation || "",
    pickupInstructions: productData.pickupInstructions || "",
    seller: userId,
  });

  return product;
};

export const getAllProducts = async (query) => {
  const filter = {
    status: "available",
  };

  if (query.search) {
    const safeSearch = escapeRegex(String(query.search).trim());

    filter.$or = [
      { title: { $regex: safeSearch, $options: "i" } },
      { description: { $regex: safeSearch, $options: "i" } },
    ];
  }

  if (query.category && query.category !== "All") {
    try {
      filter.category = await resolveCategory(query.category);
    } catch (error) {
      // Unknown category should return an empty result, not every product.
      filter.category = new mongoose.Types.ObjectId();
    }
  }

  if (query.condition) {
    filter.condition = query.condition;
  }

  const minPrice = Number(query.minPrice);
  const maxPrice = Number(query.maxPrice);

  if (Number.isFinite(minPrice) || Number.isFinite(maxPrice)) {
    filter.price = {};

    if (Number.isFinite(minPrice)) {
      filter.price.$gte = minPrice;
    }

    if (Number.isFinite(maxPrice)) {
      filter.price.$lte = maxPrice;
    }
  }

  let sortOption = { createdAt: -1 };

  if (query.sort === "priceLow") {
    sortOption = { price: 1 };
  } else if (query.sort === "priceHigh") {
    sortOption = { price: -1 };
  } else if (query.sort === "oldest") {
    sortOption = { createdAt: 1 };
  }

  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 50);
  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .populate("seller", "fullName email department year profileImage")
    .populate("category", "name description")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.max(Math.ceil(totalProducts / limit), 1);

  return {
    products,
    page,
    limit,
    totalPages,
    totalProducts,
  };
};

export const getProductById = async (productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Product not found.");
  }

  const product = await Product.findByIdAndUpdate(
    productId,
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate("seller", "fullName email department year profileImage")
    .populate("category", "name description");

  if (!product) {
    throw new Error("Product not found.");
  }

  return product;
};

export const updateProduct = async (productId, userId, updateData) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found.");
  }

  if (product.seller.toString() !== userId) {
    throw new Error("You are not allowed to update this product.");
  }

  const filteredData = {};

  ALLOWED_UPDATE_FIELDS.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  if (updateData.category !== undefined) {
    filteredData.category = await resolveCategory(updateData.category);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("seller", "fullName email department year profileImage")
    .populate("category", "name description");

  return updatedProduct;
};

export const deleteProduct = async (productId, userId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found.");
  }

  if (product.seller.toString() !== userId) {
    throw new Error("You are not allowed to delete this product.");
  }

  await Product.findByIdAndDelete(productId);

  return true;
};
