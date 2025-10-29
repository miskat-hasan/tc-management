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
  value: controlledValue,
  defaultValue,
  className,
  onChange,
}) => {
  const [value, setValue] = useState(controlledValue || defaultValue || "");

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue);
  }, [controlledValue]);

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

      <Select value={value} onValueChange={setValue} id={id}>
        <SelectTrigger
          className="
            w-full
            border border-gray-300 
            bg-light rounded-md 
            px-2 sm:px-3 py-2 sm:!py-6
            text-sm sm:text-base text-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-300
            transition-all duration-150
          "
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-sm sm:text-base"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
