"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  label,
  description,
  placeholder,
  className,
  rules,
  ...props
}) => {
  const form = useFormContext();
  const location = usePathname();

  const isLightBg =
    location === "/admin/clients/add_client" ||
    location === "/admin/instructors/add_instructor";

  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col gap-1.5 sm:gap-2">
          {label && (
            <FormLabel className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
              {label}
            </FormLabel>
          )}

          <FormControl>
            <Input
              className={cn(
                `
                w-full
                rounded-xl sm:rounded-2xl
                px-3 sm:px-4 py-2.5 sm:py-6
                text-sm sm:text-base
                font-normal leading-[1.45]
                placeholder:text-gray-400
                focus:outline-none
                focus-visible:ring-2 focus-visible:ring-gray-300
                border border-border-secondary hover:border-gray-400
                transition-all duration-150
                `,
                isLightBg ? "bg-light" : "bg-transparent",
                className
              )}
              placeholder={placeholder}
              {...field}
              {...props}
            />
          </FormControl>

          {description && (
            <FormDescription className="text-xs sm:text-sm text-gray-500">
              {description}
            </FormDescription>
          )}

          <FormMessage className="text-right text-xs sm:text-sm text-destructive font-normal" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
