import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const FormContainer = ({ form, onSubmit, children, className }) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-2", className)}
      >
        {children}
      </form>
    </Form>
  );
};

export default FormContainer;
