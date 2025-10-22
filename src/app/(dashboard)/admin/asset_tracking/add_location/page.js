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
    <section className="flex flex-col gap-4">
      {/* Title */}
      <SectionTitle title="New Asset Location" />

      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-8 shadow-sm">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <FormInput name="name" label="Name" placeholder="Name here" />
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
              name="firstName"
              label="First Name"
              placeholder="First name here"
            />
            <FormInput
              name="lastName"
              label="Last Name"
              placeholder="Last name here"
            />
            <FormInput
              name="emailAddress"
              label="Email Address"
              placeholder="Email"
            />
            <FormInput
              name="mobilePhone"
              label="Mobile Phone"
              placeholder="Mobile"
            />

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
            <FormInput
              name="address1"
              label="Address 1"
              placeholder="Address here"
            />

            <FormInput name="city" label="City" placeholder="City" />
            <FormInput
              name="stateProvince"
              label="State / Province / Region"
              placeholder="State"
            />

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

            <div className="col-span-full w-full">
              <FormTextarea
                name={"note"}
                label={"Note"}
                placeholder={"Note here"}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-10">
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
