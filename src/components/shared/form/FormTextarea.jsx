import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

const FormTextarea = ({ name, label, description, placeholder, ...props }) => {
  const form = useFormContext();

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
            <Textarea
              className={cn(
                "h-[88px] p-4 gap-2.5 rounded-2xl resize-none",
                "bg-transparent",
                "font-normal leading-[1.45]",
                "placeholder:text-base placeholder:text-muted-foreground hover:placeholder:text-foreground",
                "aria-invalid:text-destructive aria-invalid:placeholder:text-destructive",
                "border-border-secondary hover:border-[#2F2F2F] focus-visible:border-[#686868]"
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

export default FormTextarea;
