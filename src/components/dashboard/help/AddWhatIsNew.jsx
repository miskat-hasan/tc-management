"use client";
import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { storeExternalSKU } from "@/hooks/api/dashboardApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddWhatIsNew = () => {
  const form = useForm();

  const { reset } = form;
  // store external sku mutation
  const {
    mutate: storeExternalSkuMutation,
    isPending: storeExternalSkuPending,
  } = storeExternalSKU();

  const onSubmit = (data) => {
    storeExternalSkuMutation(data, {
      onSuccess: (data) => {
        reset();
        Swal.fire({
          text: data?.message,
          icon: "success",
        });
      },
    });
  };
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title="Add What's New" />

      <div className="px-1.5 py-3 min-[374px]:p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-3 lg:gap-6">
              <FormInput name="text"/>
            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline" asChild>
                <Link href="../whats_new">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={storeExternalSkuPending}
                className="bg-brown hover:bg-brown-hover text-white px-8"
              >
                {storeExternalSkuPending ? "Adding ..." : "Add What's New"}
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default AddWhatIsNew;
