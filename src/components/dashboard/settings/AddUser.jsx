"use client";

import BackButton from "@/components/common/BackButton";
import SectionTitle from "@/components/common/SectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { Roles } from "@/config";
import { getAllCountry } from "@/hooks/api/dashboardApi";
import { LucideTrash2 } from "lucide-react";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

const AddUser = () => {
  const form = useForm({
    defaultValues: {},
  });

  const {
    register,
    control,
    reset,
    formState: { errors },
  } = form;

  const { data: countryData, isLoading: countryDataLoading } = getAllCountry();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "trainingSites",
  });

  const handleAddClassTime = () => {
    append({
      tsite_id: "",
      role: "",
    });
  };

  const handleRemoveClassTime = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = (values) => {};

  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title={"Add User"} />
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          {/* Two Column Grid */}
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              name="firstName"
              label="First Name"
              placeholder="Description"
            />
            <FormInput name="lastName" label="Last Name" placeholder="Date" />
            <FormInput
              name="username"
              label="Username"
              placeholder="Username"
            />
            <FormInput
              name="mobilePhone"
              label="Mobile Phone"
              placeholder="Description"
            />
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
                  options={countryData?.data}
                  error={errors.country?.message}
                  className="flex-1"
                />
              )}
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

            {/* Class Times Section */}
            <div className="col-span-2 bg-neutral-50 border px-1 sm:px-2 pt-2 pb-4 rounded-md">
              <h6 className="text-xl mb-1">Training Site and Roles</h6>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-1 sm:gap-4 mt-3 border-b pb-3"
                >
                  <div className="grid sm:grid-cols-3 gap-2 sm:gap-4 flex-1">
                    <Controller
                      name={`trainingSites.${index}.tsite_id`}
                      control={control}
                      rules={{ required: "Day is required" }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          label="Training Site"
                          placeholder="Select site"
                          // options={dayOptions}
                          // error={errors?.classTimes?.[index]?.day?.message}
                        />
                      )}
                    />

                    <Controller
                      name={`trainingSites.${index}.role`}
                      control={control}
                      rules={{ required: "Day is required" }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          id="role"
                          label="Roles"
                          placeholder="Select role"
                          options={Roles}
                          // error={errors?.classTimes?.[index]?.day?.message}
                        />
                      )}
                    />
                  </div>
                  {fields.length > 1 && (
                    <div
                      onClick={() => handleRemoveClassTime(index)}
                      className="bg-neutral-200 p-2 -mb-6 rounded-md cursor-pointer hover:bg-neutral-300"
                    >
                      <LucideTrash2 className="size-4" />
                    </div>
                  )}
                </div>
              ))}
              <div
                onClick={handleAddClassTime}
                className="mt-4 px-2 py-1.5 inline-flex items-center gap-1 border rounded-md text-sm bg-neutral-700 text-neutral-100 cursor-pointer hover:bg-neutral-600 shadow-sm"
              >
                <FaPlus className="size-3" />
                Add more
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end mt-8 gap-4">
            <BackButton />
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

export default AddUser;
