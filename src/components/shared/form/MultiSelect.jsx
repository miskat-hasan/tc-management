// src/components/shared/form/MultiSelect.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";

const MultiSelect = ({
  id,
  label,
  placeholder = "Select...",
  options = [],
  value = [],
  isLoading,
  onChange,
  className,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // value is array of ids (strings or numbers)
  const selected = Array.isArray(value) ? value.map(String) : [];

  const toggle = (optId) => {
    const strId = String(optId);
    const next  = selected.includes(strId)
      ? selected.filter((v) => v !== strId)
      : [...selected, strId];
    onChange(next);
  };

  const remove = (optId, e) => {
    e.stopPropagation();
    onChange(selected.filter((v) => v !== String(optId)));
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedOptions = options.filter((o) => selected.includes(String(o.id)));

  const getLabel = (opt) =>
    opt.name ??
    opt.training_center_name ??
    opt.company ??
    opt.course_name ??
    opt.title ??
    `${opt.first_name ?? ""} ${opt.last_name ?? ""}`.trim();

  return (
    <div ref={containerRef} className={`flex flex-col gap-2 sm:gap-3 w-full ${className || ""}`}>
      {label && (
        <label htmlFor={id} className="text-sm sm:text-base font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        onClick={() => setOpen((p) => !p)}
        className={`relative w-full min-h-[48px] border ${
          error ? "border-red-500" : "border-gray-300"
        } bg-light rounded-md px-3 py-2 text-sm text-gray-700 cursor-pointer flex items-center flex-wrap gap-1.5 focus-within:ring-2 ${
          error ? "focus-within:ring-red-400" : "focus-within:ring-gray-300"
        } transition-all duration-150`}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          selectedOptions.map((opt) => (
            <span
              key={opt.id}
              className="inline-flex items-center gap-1 bg-brown/10 text-brown text-xs font-medium px-2 py-1 rounded-md"
            >
              {getLabel(opt)}
              <FaTimes
                className="size-2.5 cursor-pointer hover:text-red-500"
                onClick={(e) => remove(opt.id, e)}
              />
            </span>
          ))
        )}

        <FaChevronDown
          className={`ml-auto size-3 text-gray-400 transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="relative z-50">
          <div className="absolute top-0 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
            ) : options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No data found</div>
            ) : (
              options.map((opt) => {
                const isSelected = selected.includes(String(opt.id));
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggle(opt.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
                      isSelected ? "bg-brown/5 text-brown font-medium" : "text-gray-700"
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`size-4 rounded border flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-brown border-brown" : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <svg viewBox="0 0 10 8" className="size-2.5 text-white fill-white">
                          <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {getLabel(opt)}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default MultiSelect;