"use client";
import SectionTitle from "@/components/common/SectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { storeProductAddOns } from "@/hooks/api/dashboardApi";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Page = () => {
  const form = useForm({
    defaultValues: {},
  });

  const { mutate, isPending } = storeProductAddOns();

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("product_code", data.productCode);
    formData.append("description", data.description);
    // formData.append("display_order", data.description)
    formData.append("price", data.price);

    mutate(formData, {
      onSuccess: (data) => {
        Swal.fire({
          text: data?.message,
          icon: "success",
        });
      },
      onError: (err) => {
        Swal.fire({
          text: err?.response?.data?.message,
          icon: "error",
        });
      },
    });
  };

  return (
    <div>
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <FormContainer
          className={"flex flex-col  lg:gap-4"}
          form={form}
          onSubmit={onSubmit}
        >
          <SectionTitle title={"Product Add-ons"} />
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2.5 md:gap-x-6 md:gap-y-5">
            <FormInput
              name="productCode"
              label="Product Code"
              placeholder="Product Code here"
            />

            <FormInput name="name" label="Name" placeholder="Enter name" />
            <FormInput
              name="description"
              label="Description"
              placeholder="Description / Notes here"
            />
            <CustomSelect
              id="display_order"
              label="Display Order"
              placeholder="Select Display Order"
              options={[
                {
                  id: "order 1",
                  name: "Order 1",
                },
                {
                  id: "order 2",
                  name: "Order 2",
                },
              ]}
            />
          </div>
          <FormInput name="price" label="Price" placeholder="Price" />

          <div className="flex flex-col gap-1 lg:gap-2  lg:mt-2">
            <p className="font-semibold text-[15px] text-gray-700">Type</p>
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Shippable Item
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Non-shippable Item
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Non-shippable Item
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1 lg:gap-2 lg:mt-2">
            <p className="font-semibold text-[15px] text-gray-700">Options</p>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-brown" />
              Default the selection to yes for all registrations
            </label>
          </div>
          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-5 lg:mt-10">
            <Button
              type="button"
              className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover"
            >
              Save Changes
            </Button>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default Page;
