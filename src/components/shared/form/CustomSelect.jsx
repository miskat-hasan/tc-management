"use client";
import React, { useState, useEffect } from "react";
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
  options,
  defaultValue,
  className,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  return (
    <div className={`flex flex-col gap-4 w-full ${className || ""}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select id={id} value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 !py-2 !h-[48px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
