// src/components/common/ThemeToggle.jsx
"use client";

import useTheme from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] bg-white dark:bg-black rounded-[14px] flex items-center justify-center dark:text-white cursor-pointer"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark
        ? <Sun  className="size-4 lg:size-6 text-gray" />
        : <Moon className="size-4 lg:size-6 text-black"   />
      }
    </button>
  );
}