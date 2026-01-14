"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomSelect = ({
  id,
  label,
  placeholder = "Select...",
  options = [],
  value,
  isLoading,
  onChange,
  className,
  error,
}) => {
  return (
    <div className={`flex flex-col gap-2 sm:gap-3 w-full ${className || ""}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm sm:text-base font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <Select
        value={value ? String(value) : ""}
        onValueChange={(val) => onChange(val)}
      >
        <SelectTrigger
          id={id}
          className={`
            w-full
            border
            ${error ? "border-red-500" : "border-gray-300"}
            bg-light rounded-md
            px-2 sm:px-3 py-2 sm:!py-6
            text-sm sm:text-base text-gray-700
            focus:outline-none focus:ring-2
            ${error ? "focus:ring-red-400" : "focus:ring-gray-300"}
            transition-all duration-150
          `}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="max-h-60 overflow-y-auto">
          {isLoading && <div>Loading ....</div>}
          {options.map((opt) => (
            <SelectItem
              key={opt.id}
              value={String(opt.id)}
              className="text-sm sm:text-base"
            >
              {opt.name ?? opt?.training_center_name ?? opt?.company}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Error Message */}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default CustomSelect;
