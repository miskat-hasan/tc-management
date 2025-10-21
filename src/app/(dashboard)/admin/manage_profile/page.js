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
    <section className="flex flex-col gap-4">
      {/* Title */}
      <SectionTitle title="My Account" />

      {/* White Form Card */}
      <div className="bg-white rounded-[14px] p-8 shadow-sm">
        <SectionTitle title="1. General Information" className={"mb-3"} />
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
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
              name="AHA_eCard_Key"
              label="AHA eCard Key"
              placeholder="6t34r32"
            />
            <FormInput
              name="ICal_Feed_URL"
              label="ICal Feed URL"
              placeholder="https:llwww.enrollwa re. comlcalendar/ical.ashx ?rMH5 TOF 5Y 3VwondnGw06RiHs 5zmGnZq5"
            />

            <div className="col-span-full">
              <SectionTitle title="2. Password Change" className={"mb-3"} />
              <div className="grid grid-cols-2 gap-x-6">
                <FormInput
                  name="password"
                  label="New Password"
                  placeholder="Password"
                  type="password"
                />
                <FormInput
                  name="password"
                  label="Confirm Password"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
          </div>

          {/* Options + Roles */}
          <div className="grid grid-cols-2 gap-10 mt-8">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Options</p>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Send me an email when I am assigned to a class
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Send me an email when there are updates to a class I am assigned
                to
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Send me reminder emails prior to my classes
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Roles</p>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Send me reminder text messages prior to my classes
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-brown" />
                Default upcoming class list page size to Show All
              </label>
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
