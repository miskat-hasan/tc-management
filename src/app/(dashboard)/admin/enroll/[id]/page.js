"use client";

import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { getAllCountry } from "@/hooks/api/dashboardApi";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Page = () => {
  const [isEnrollmentFormOpen, setIsEnrollmentFormOpen] = useState(true);

  const form = useForm();

  const {
    control,
    register,
    formState: { errors },
  } = form;

  const { data: countryData, isLoading: countryDataLoading } = getAllCountry();

  const onSubmit = (data) => {
    // console.log(data)
  };
  return (
    <div className="flex gap-5 bg-white p-4 rounded-2xl border">
      <div className="basis-2/3">
        <h2 className="border-b text-xl font-medium mb-1">Class Enrollment</h2>
        {!isEnrollmentFormOpen ? (
          <div className="flex gap-4 my-4">
            <div>
              <img
                src="https://codeblueservices.enrollware.com/cmsfiles/books/heartsaver-cpr.jpg"
                alt=""
              />
            </div>
            <div className="max-w-3xl border border-gray-300">
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
                <h2 className="font-semibold text-lg uppercase">
                  Heartsaver CPR AED First Aid Instructor Course (New 2025
                  Guidelines)
                </h2>
              </div>
              <div className="divide-y divide-gray-300">
                <div className="grid grid-cols-3">
                  <div className="bg-gray-100 px-4 py-3 font-semibold border-r border-gray-300">
                    Date/Time:
                  </div>
                  <div className="col-span-2 px-4 py-3">
                    Wed 1/21/2026 from 9:00 AM to 5:00 PM
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="bg-gray-100 px-4 py-3 font-semibold border-r border-gray-300">
                    Location:
                  </div>
                  <div className="col-span-2 px-4 py-3 leading-relaxed">
                    Orlando, FL - 1800 Pembrook Dr. Ste 300
                    <br />
                    Orlando, FL 32810
                    <br />
                    1800 Pembrook Dr.
                    <br />
                    Ste 300
                    <br />
                    Orlando, FL 32810
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="bg-gray-100 px-4 py-3 font-semibold border-r border-gray-300">
                    Class Price:
                  </div>
                  <div className="col-span-2 px-4 py-3">$295.00</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm my-4">
              Please complete the following form to reserve your space in this
              class. You will have an opportunity to review and edit your
              information after submitting this page.
            </p>
            <FormContainer form={form} onSubmit={onSubmit}>
              <h6 className="text-xl font-medium mb-1">Class Information</h6>
              <div className="col-span-2 bg-neutral-50 border px-1 sm:px-2 pt-2 pb-4 rounded-md">
                <div className="space-y-1">
                  <p className="flex items-center text-sm">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700 w-[150px]">
                      Course:{" "}
                    </div>
                    HEARTSAVER CPR AED FIRST AID INSTRUCTOR COURSE (NEW 2025
                    GUIDELINES)
                  </p>
                  <p className="flex items-center text-sm">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700 w-[150px]">
                      Date/Time:
                    </div>{" "}
                    Wed 1/21/2026 from 9:00 AM to 5:00 PM
                  </p>
                  <p className="flex items-center text-sm">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700 w-[150px]">
                      Location:
                    </div>{" "}
                    Orlando, FL - 1800 Pembrook Dr. Ste 300 Orlando, FL 32810
                  </p>
                  <p className="flex items-center text-sm">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700 w-[150px]">
                      Class Price:
                    </div>{" "}
                    $295.00
                  </p>
                </div>

                <FormInput
                  name={`promo_code`}
                  label="Promo Code:"
                  placeholder="Promo Code"
                />
              </div>
              <h6 className="text-xl font-medium mb-1 mt-3">Student Information</h6>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-2 bg-neutral-50 border px-1 sm:px-2 pt-2 pb-4 rounded-md">
                <FormInput
                  name={`first_name`}
                  label="First Name"
                  placeholder="First Name"
                />
                <FormInput
                  name={`last_name`}
                  label="Last Name"
                  placeholder="Last Name"
                />
                <FormInput
                  name={`email_address`}
                  label="Email Address"
                  placeholder="Email Address"
                />
                <FormInput
                  name={`confirm_email_address`}
                  label="Confirm Email Address"
                  placeholder="Confirm Email Address"
                />
                <FormInput
                  name={`mobile_phone`}
                  label="Mobile Phone"
                  placeholder="Mobile Phone"
                />
                <FormInput
                  name={`alternate_phone`}
                  label="Alternate Phone"
                  placeholder="Alternate Phone"
                />
              </div>
              <h6 className="text-xl font-medium mb-1 mt-3">Mailing Address</h6>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-2 bg-neutral-50 border px-1 sm:px-2 pt-2 pb-4 rounded-md">
                <FormInput
                  name={`address_1`}
                  label="Address 1"
                  placeholder="Address 1"
                />
                <FormInput
                  name={`address_2`}
                  label="Address 2"
                  placeholder="Address 2"
                />
                <FormInput name={`city`} label="City" placeholder="City" />
                <FormInput
                  name={`state`}
                  label="State/Province/Region"
                  placeholder="State/Province/Region"
                />
                <FormInput
                  name={`zip_code`}
                  label="Zip/Postal Code"
                  placeholder="Zip/Postal Code"
                />
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      id="country"
                      label="Country"
                      placeholder="Country"
                      isLoading={countryDataLoading}
                      options={countryData?.data?.data}
                      error={errors.country?.message}
                      className="flex-1"
                    />
                  )}
                />
                <label className="flex items-center gap-1">
                  <input type="checkbox" />
                  Use the above address as my billing address
                </label>
              </div>
            </FormContainer>
          </div>
        )}
        <div className="flex justify-center my-4">
          <button
            onClick={() => setIsEnrollmentFormOpen(true)}
            className="border bg-neutral-100 cursor-pointer hover:bg-neutral-200 rounded-md px-3 py-1.5"
          >
            Continue with Registration
          </button>
        </div>
      </div>
      <div className="basis-1/3">
        <h2 className="border-b text-xl font-medium mb-1">Secure Site</h2>
        <div className="flex gap-3 my-4">
          <div className="shrink-0">
            <img
              src={"https://codeblueservices.enrollware.com/reg/img/lock.png"}
              alt=""
              className="!shrink-0 size-16"
            />
          </div>
          <p className="text-[13px]">
            Please be assured that your information is protected and secure. We
            value your privacy and do not provide customer information to any
            third parties.
          </p>
        </div>
        <h2 className="border-b text-xl font-medium mb-1">Contact Us</h2>
      </div>
    </div>
  );
};

export default Page;
