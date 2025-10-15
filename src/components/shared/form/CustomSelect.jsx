"use client";
import React, { useState } from "react";
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
}) => {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="flex flex-col gap-4 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select
        id={id}
        value={value}
        onValueChange={setValue}
        className="w-full "
      >
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
