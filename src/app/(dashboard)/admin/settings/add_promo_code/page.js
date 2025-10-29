"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormTextarea from "@/components/shared/form/FormTextarea";

const Page = () => {
  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <section className="flex flex-col gap-2 lg:gap-4">
      {/* Title */}
      <SectionTitle title="Add Promo Code" />
      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-4 lg:p-8 shadow-sm">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2.5 md:gap-x-6 md:gap-y-5">
            <FormInput
              name="code"
              label="Code"
              placeholder="Product Code here"
            />
            <CustomSelect
              id="client"
              label="Clients"
              placeholder="Select Clients"
              options={[
                {
                  value: "Client 1",
                  label: "Client 1",
                },
              ]}
              // onChange={(val) => handleSelectChange("instructor", val)}
              className="flex-1"
            />
            <FormInput
              name="description"
              label="Description"
              placeholder="Description"
            />
            <FormInput
              name="startDate"
              label="Start Date"
              type="date"
              placeholder="01/02/2005"
            />
          </div>
          <FormInput
            name="endDate"
            label="End Date"
            type="date"
            placeholder="01/12/2005"
          />
          <div className="flex flex-col gap-2 mt-2 lg:mt-4">
            <p className="font-semibold text-[15px] text-gray-700">Type</p>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                <input type="checkbox" className="accent-brown" />
                Dollar off
              </label>
              <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                <input type="checkbox" className="accent-brown" />
                Percentage off
              </label>
            </div>
          </div>
          <FormInput name="Discount" label="Discount" placeholder="Discount" />
          <FormInput name="uses" label="# of uses" placeholder="uses" />
          <div className="flex flex-col gap-2 mt-2 lg:mt-4">
            <p className="font-semibold text-[15px] text-gray-700">Options</p>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                <input type="checkbox" className="accent-brown" />
                Apply the discount to add-on purchases and shipping also
              </label>
              <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                <input type="checkbox" className="accent-brown" />
                Restrict use by course type
              </label>
              <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                <input type="checkbox" className="accent-brown" />
                Does not reduce the balance due - deferred payment only
              </label>
            </div>
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
    </section>
  );
};

export default Page;
