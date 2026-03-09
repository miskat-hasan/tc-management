"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const form = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {};

  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title={"Add/Edit User"} />
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Two Column Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Column 1 */}
            <FormInput
              name="username"
              label="Username"
              placeholder="Username"
            />
            <FormInput
              name="trainingSite"
              label="Training Site"
              placeholder="none"
            />

            <FormInput
              name="firstName"
              label="First Name"
              placeholder="Description"
            />
            <FormInput name="lastName" label="Last Name" placeholder="Date" />

            <FormInput
              name="address1"
              label="Address 1"
              placeholder="Description"
            />
            <FormInput name="address2" label="Address 2" placeholder="Date" />

            <FormInput name="city" label="City" placeholder="Description" />
            <FormInput
              name="stateProvince"
              label="State/Province/Region"
              placeholder="Date"
            />

            <FormInput
              name="zipPostalCode"
              label="Zip/Postal Code"
              placeholder="Description"
            />
            <FormInput name="country" label="Country" placeholder="none" />

            <FormInput
              name="mobilePhone"
              label="Mobile Phone"
              placeholder="Description"
            />
            <FormInput
              name="printName"
              label="Name To Print On Card"
              placeholder="none"
            />

            <FormInput
              name="ahaInstructorId"
              label="AHA Instructor ID"
              placeholder="Description"
            />
            <FormInput
              name="hsiInstructorId"
              label="HSI (ASHI) Instructor ID"
              placeholder="none"
            />

            <FormInput
              name="rclcUsername"
              label="RCLC Username"
              placeholder="Description"
            />
            <FormInput
              name="emailAddress"
              label="Email Address"
              placeholder="none"
            />

            <FormInput name="password" label="Password" placeholder="Date" />
          </div>

          {/* Options Section */}
          <div className="mt-6">
            <label className="block font-medium mb-2 text-sm text-gray-700">
              Options
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" /> Active User
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" /> Read Only User
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" /> Allow this
                instructor to edit open classes
              </label>
            </div>
          </div>

          {/* Roles Section */}
          <div className="mt-6">
            <label className="block font-medium mb-2 text-sm text-gray-700">
              Roles
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" /> training center
                admin
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" /> training-site
                admin
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" /> instructor
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />{" "}
                instructor-assistant
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" /> event manager
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end mt-8 gap-4">
            <Button
              type="button"
              className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50 focus:outline-none"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 bg-[#C1121F] text-white rounded-md text-sm font-medium hover:bg-[#a00e1a]"
            >
              Update User
            </Button>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
