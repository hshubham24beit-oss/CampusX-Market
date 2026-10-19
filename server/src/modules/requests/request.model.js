import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Books",
        "Furniture",
        "Stationery",
        "Sports",
        "Others",
      ],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "fulfilled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;