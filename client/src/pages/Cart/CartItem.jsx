import React from "react";
import { FaTrash, FaStore, FaCreditCard } from "react-icons/fa";

export default function CartItem({
  item,
  onRemove,
  onCheckout,
  onUpdateQuantity,
}) {
  const product = item.product;
  const quantity = item.quantity || 1;
  const maxQuantity = product?.quantity || 1;

  if (!product) return null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between gap-5 mb-4">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Product Image */}
        <div className="w-24 h-24 rounded-xl overflow-hidden border bg-gray-50 shrink-0">
          <img
            src={
              product.images?.length
                ? product.images[0]
                : "https://via.placeholder.com/150"
            }
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div>

          <h3 className="text-base font-extrabold text-gray-900">
            {product.title}
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            Category :
            <span className="font-semibold text-gray-700">
              {" "}
              {product.category?.name}
            </span>
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Condition :
            <span className="font-semibold text-gray-700">
              {" "}
              {product.condition}
            </span>
          </p>

          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <FaStore />
            <span>{product.seller?.fullName}</span>
          </div>

          <p className="text-lg font-black text-indigo-600 mt-3">
            ₹{Number(product.price || 0).toLocaleString()}
          </p>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-3 items-end">

        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-2 py-1">
          <button
            type="button"
            onClick={() => onUpdateQuantity?.(quantity - 1)}
            disabled={quantity <= 1}
            className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-sm font-bold cursor-pointer"
          >
            -
          </button>
          <span className="text-xs font-extrabold w-5 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity?.(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-sm font-bold cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          onClick={onCheckout}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
        >
          <FaCreditCard />
          Checkout
        </button>

        <button
          onClick={onRemove}
          className="flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
        >
          <FaTrash />
          Remove
        </button>

      </div>

    </div>
  );
}