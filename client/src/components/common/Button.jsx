// src/components/common/Button.jsx
import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  icon = null,
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-xs shadow-indigo-200",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-95",
    outline:
      "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:scale-95",
    danger:
      "bg-red-500 text-white hover:bg-red-600 active:scale-95 shadow-xs shadow-red-200",
    dangerOutline:
      "border border-red-300 text-red-600 hover:bg-red-50 active:scale-95",
    ghost:
      "text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-xs md:text-sm gap-2",
    lg: "px-6 py-3.5 text-sm md:text-base gap-2.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
