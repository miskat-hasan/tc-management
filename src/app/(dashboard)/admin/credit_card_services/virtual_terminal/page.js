"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";
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
      <SectionTitle title="Virtual Terminal" />

      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-8 shadow-sm">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
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
              name="Amount to Charge"
              label="Amount to Charge"
              placeholder="Amount to Charge here"
            />
            <FormInput
              name="payment Description"
              label="Payment Description"
              placeholder="Payment Description here"
            />

            <FormInput
              name="Card Number"
              label="Card Number"
              placeholder="Card Number Here"
            />
            <FormInput
              name="Card Security Code"
              label="Card Security Code"
              placeholder="Card Security Code Here"
            />

            <FormInput
              name="Expiration"
              label="Expiration"
              placeholder="Expiration"
            />

            <FormInput
              name="Name on Account"
              label="Name on Account"
              placeholder="Name on Account"
            />

            <FormInput
              name="Country"
              label="Country"
              placeholder="Country Name Here"
            />

            <div className="col-span-full w-full">
              <FormTextarea
                name={"Zip Code"}
                label={"Zip Code"}
                placeholder={"Zip Code here"}
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
