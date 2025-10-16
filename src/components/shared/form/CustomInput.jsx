"use client";
import React from "react";

const CustomInput = ({
  id,
  label,
  placeholder = "Enter...",
  type = "text",
  value,
  onChange,
  className,
}) => {
  return (
    <div className={`flex flex-col ${className || ""}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium mb-4 text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 h-[48px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
};

export default CustomInput;
