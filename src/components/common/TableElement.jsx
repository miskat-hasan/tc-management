import { cn } from "@/lib/utils";
import Link from "next/link";

export const Table = ({ children, className }) => {
  return (
    <table
      className={cn(
        "w-full min-w-[800px] text-sm sm:text-base text-left text-gray-700 dark:text-[#b9b5ab]",
        className,
      )}
    >
      {children}
    </table>
  );
};

export const TableHead = ({ children, className }) => {
  return (
    <thead
      className={cn(
        "bg-gray-50 dark:bg-[#1B1D1E] text-black dark:text-gray capitalize text-[16px] sm:text-[18px] font-semibold",
        className,
      )}
    >
      {children}
    </thead>
  );
};

export const TableBodyRow = ({ key, children, className }) => {
  return (
    <tr
      key={key}
      className={cn(
        "border-b dark:border-[#343536] hover:bg-gray-50 dark:hover:bg-[#1B1D1E] transition-all",
        className,
      )}
    >
      {children}
    </tr>
  );
};

export const TableButton = ({
  isLink = true,
  children,
  className,
  ...props
}) => {
  const Comp = isLink ? Link : "button";
  return (
    <Comp {...props}>
      <button
        className={cn(
          "p-1.5 sm:p-2 bg-gray-100 dark:bg-transparent dark:border dark:border-[#343536] dark:hover:bg-[#292b2c] rounded-lg hover:bg-gray-200 transition cursor-pointer",
          className,
        )}
      >
        {children}
      </button>
    </Comp>
  );
};
