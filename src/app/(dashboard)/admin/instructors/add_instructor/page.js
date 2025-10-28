"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import React from "react";
import CustomSelect from "@/components/shared/form/CustomSelect";

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
      <SectionTitle title="Add Instructor" />

      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-4 lg:p-8 shadow-sm">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 lg:gap-y-5">
            <FormInput
              name="username"
              label="User Name"
              placeholder="User name here"
            />
            <CustomSelect
              id="trainingsite"
              label="Training Site"
              placeholder="Training Site"
              options={[
                {
                  value: "CODE BLUE CPR SERVICES. LLC",
                  label: "CODE BLUE CPR SERVICES. LLC",
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

            <FormInput
              name="mobilePhone"
              label="Mobile Phone"
              placeholder="Mobile"
            />
            <FormInput
              name="emailAddress"
              label="Email Address"
              placeholder="Email"
            />

            <FormInput
              name="nameOnCard"
              label="Name To Print On Card"
              placeholder="Name"
            />
            <FormInput
              name="ahaInstructorId"
              label="AHA Instructor ID"
              placeholder="Code"
            />

            <FormInput
              name="hsiInstructorId"
              label="HSI (ASHI) Instructor ID"
              placeholder="Code"
            />
            <FormInput
              name="rclcUsername"
              label="RCLC Username"
              placeholder="Code"
            />

            <FormInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
          </div>

          {/* Options + Roles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 mt-4 md:mt-8">
            <div className="flex flex-col gap-1 md:gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Options</p>
              <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                <input type="checkbox" className="accent-brown" />
                Active User
              </label>
              <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                <input type="checkbox" className="accent-brown" />
                Archive Only User
              </label>
              <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                <input type="checkbox" className="accent-brown" />
                Allow this instructor to bid on open classes
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Roles</p>
              <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                <input type="checkbox" className="accent-brown" />
                Training Center Admin
              </label>
              <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                <input type="checkbox" className="accent-brown" />
                Training Site Admin
              </label>
              <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                <input type="checkbox" className="accent-brown" />
                Instructor
              </label>
              <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                <input type="checkbox" className="accent-brown" />
                Instructor Assistant
              </label>
              <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                <input type="checkbox" className="accent-brown" />
                Class Manager
              </label>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2 lg:gap-4 mt-5 lg:mt-10">
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
