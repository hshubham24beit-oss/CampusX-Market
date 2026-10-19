import React, { useState } from "react";

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "U";

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function Avatar({
  src,
  name,
  className = "",
  textClassName = "text-[10px]",
  ...props
}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name || "User"}
        onError={() => setFailed(true)}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name || "User"}
      title={name || "User"}
      className={`flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-black uppercase select-none overflow-hidden ${textClassName} ${className}`}
      {...props}
    >
      {getInitials(name)}
    </div>
  );
}
