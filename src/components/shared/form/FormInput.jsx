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

const FormInput = ({ name, label, description, placeholder, ...props }) => {
  const form = useFormContext();
  const location = usePathname();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="leading-[1.45] font-medium text-base">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              className={cn(
                "h-auto p-4 gap-2.5 rounded-2xl ",
                `${
                  location === "/admin/clients/add_client" ||
                  "/admin/instructors/add_instructor"
                    ? "bg-light"
                    : "bg-transparent"
                }`,
                "font-normal leading-[1.45]",
                "placeholder:text-base placeholder:text-muted-foreground hover:placeholder:text-foreground",
                "aria-invalid:text-destructive aria-invalid:placeholder:text-destructive",
                "border-border-secondary hover:border-[#2f2f2f4a] focus-visible:border-[#686868]"
              )}
              placeholder={placeholder}
              {...field}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-right leading-[1.45] font-normal text-base" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
