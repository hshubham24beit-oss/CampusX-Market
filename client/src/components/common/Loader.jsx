// src/components/common/Loader.jsx
import React from "react";

function Spinner({ size = "md" }) {
  const dimensions =
    size === "lg" ? "w-12 h-12 border-[3px]" : "w-9 h-9 border-[3px]";

  return (
    <span
      className={`inline-block rounded-full border-indigo-100 border-t-indigo-600 border-r-violet-500 animate-spin ${dimensions}`}
    />
  );
}

export default function Loader({ text = "Loading...", fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <Spinner size="lg" />
          <p className="text-sm font-bold text-gray-600 tracking-wide">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3 animate-fade-in">
      <Spinner />
      <p className="text-xs font-semibold text-gray-500">{text}</p>
    </div>
  );
}
