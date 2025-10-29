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
      <SectionTitle title="My Account" />

      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-4 lg:p-8 shadow-sm">
        <SectionTitle title="Basic Information" className={"mb-1.5 lg:mb-3"} />
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-3.5 mb-5">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 ">
              <FormInput name="name" label="Name" placeholder="name here" />
              <CustomSelect
                id="Abbreviation"
                label="Abbreviation"
                placeholder="Abbreviation"
                options={[
                  {
                    value: "abbreviation 1",
                    label: "abbreviation 1",
                  },
                ]}
                // onChange={(val) => handleSelectChange("instructor", val)}
                className="flex-1"
              />
            </div>

            <FormTextarea
              name={"Directions"}
              label={"Directions"}
              placeholder={"Directions here"}
            />
            <div className="flex flex-col gap-1.5 md:gap-2.5">
              <p className="font-semibold text-[15px] text-gray-700">Options</p>
              <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                <input type="checkbox" className="accent-brown" />
                Make this location my default selection when creating classes
              </label>
            </div>
            <FormInput
              name="Print on Cards"
              label="Print on Cards"
              placeholder="Print on Cards here"
            />
          </div>

          <SectionTitle title="Advanced Information" className={"mb-3"} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <FormInput
              name="address1"
              label="Address 1"
              placeholder="Address here"
            />
            <FormInput
              name="address2"
              label="Address 2"
              placeholder="Address here"
            />

            <FormInput name="city" label="City" placeholder="City" />
            <FormInput
              name="stateProvince"
              label="State / Province / Region"
              placeholder="State"
            />

            <div className="col-span-full w-full flex flex-col gap-3 md:gap-6">
              <FormInput
                name="zipPostalCode"
                label="Zip / Postal Code"
                placeholder="Postal code"
              />
              <CustomSelect
                id="country"
                label="Country"
                placeholder="Country"
                options={[
                  {
                    value: "garmany",
                    label: "Garmany",
                  },
                  {
                    value: "canada",
                    label: "Canada",
                  },
                ]}
                // onChange={(val) => handleSelectChange("instructor", val)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 my-2 lg:my-4">
            <p className="font-semibold text-[15px] text-gray-700">Options</p>
            <label className="flex items-center gap-2 text-[12px] sm:text-sm">
              <input type="checkbox" className="accent-brown" />
              Include address in class communications
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 ">
            <FormInput
              name="Contact Name"
              label="Contact Name"
              placeholder="Contact Name here"
            />
            <FormInput
              name="Contact Email"
              label="Contact Email"
              placeholder="Contact Email here"
            />
            <FormInput
              name="Contact Phone"
              label="Contact Phone"
              placeholder="Contact Phone here"
            />
            <FormInput
              name="Internal Notes"
              label="Internal Notes"
              placeholder="Internal Notes here"
            />
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
