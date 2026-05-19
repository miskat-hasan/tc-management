"use client";

import BackButton from "@/components/common/BackButton";
import SectionTitle from "@/components/common/SectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { Roles } from "@/config";
import {
  getAllCountry,
  getallTrainingsite,
  useStoreUser,
} from "@/hooks/api/dashboardApi";
import { LucideTrash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";

const AddUser = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      mobilePhone: "",
      address1: "",
      address2: "",
      city: "",
      stateProvince: "",
      zipPostalCode: "",
      country: "",
      printName: "",
      ahaInstructorId: "",
      hsiInstructorId: "",
      rclcUsername: "",
      emailAddress: "",
      password: "",
      trainingSites: [{ tsite_id: "", role: "" }],
    },
  });

  const {
    control,
    formState: { errors },
  } = form;

  const { data: countryData, isLoading: countryDataLoading } = getAllCountry();
  const { data: trainingSiteData, isLoading: trainingSiteLoading } =
    getallTrainingsite();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "trainingSites",
  });

  const { mutate: storeUserMutation, isPending: storeUserPending } =
    useStoreUser();

  const onSubmit = (values) => {
    const payload = {
      username: values.username,
      first_name: values.firstName,
      last_name: values.lastName,
      address_line_1: values.address1,
      address_line_2: values.address2,
      city: values.city,
      state_province_region: values.stateProvince,
      zip_postal_code: values.zipPostalCode,
      country_id: values.country,
      mobile_phone: values.mobilePhone,
      name_to_print_on_card: values.printName,
      aha_instructor_id: values.ahaInstructorId,
      hsi_instructor_id: values.hsiInstructorId,
      rclc_username: values.rclcUsername,
      email: values.emailAddress,
      password: values.password,
      site_roles: values.trainingSites.map((ts) => ({
        training_site_id: ts.tsite_id,
        role_id: ts.role,
      })),
    };

    storeUserMutation(
      {
        data: payload,
      },
      {
        onSuccess: (data) => {
          if (data?.status) {
            toast.success(data?.message || "User added successfully!");
            router.back();
          }
        },
      },
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title={"Add User"} />
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              name="firstName"
              label="First Name"
              placeholder="First name"
              rules={{ required: "First name is required" }}
            />
            <FormInput
              name="lastName"
              label="Last Name"
              placeholder="Last name"
              rules={{ required: "Last name is required" }}
            />
            <FormInput
              name="username"
              label="Username"
              placeholder="Username"
              rules={{ required: "Username is required" }}
            />
            <FormInput
              name="mobilePhone"
              label="Mobile Phone"
              placeholder="Mobile phone"
              rules={{ required: "Mobile phone is required" }}
            />
            <FormInput
              name="address1"
              label="Address 1"
              placeholder="Address line 1"
            />
            <FormInput
              name="address2"
              label="Address 2"
              placeholder="Address line 2"
            />
            <FormInput name="city" label="City" placeholder="City" />
            <FormInput
              name="stateProvince"
              label="State/Province/Region"
              placeholder="State/Province"
            />
            <FormInput
              name="zipPostalCode"
              label="Zip/Postal Code"
              placeholder="Zip/Postal code"
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
                  placeholder="Select country"
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
              placeholder="Name on card"
            />
            <FormInput
              name="ahaInstructorId"
              label="AHA Instructor ID"
              placeholder="AHA ID"
            />
            <FormInput
              name="hsiInstructorId"
              label="HSI (ASHI) Instructor ID"
              placeholder="HSI ID"
            />
            <FormInput
              name="rclcUsername"
              label="RCLC Username"
              placeholder="RCLC username"
            />
            <FormInput
              name="emailAddress"
              label="Email Address"
              placeholder="Email address"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
            />
            <FormInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              rules={{
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              }}
            />

            {/* Training Site and Roles */}
            <div className="col-span-2 bg-neutral-50 border px-1 sm:px-2 pt-2 pb-4 rounded-md">
              <h6 className="text-lg mb-1">Training Site and Roles</h6>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-1 sm:gap-4 mt-3 border-b pb-3"
                >
                  <div className="grid sm:grid-cols-2 gap-2 sm:gap-4 flex-1">
                    <Controller
                      name={`trainingSites.${index}.tsite_id`}
                      control={control}
                      rules={{ required: "Training site is required" }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          label="Training Site"
                          placeholder="Select site"
                          isLoading={trainingSiteLoading}
                          options={trainingSiteData?.data}
                          error={
                            errors?.trainingSites?.[index]?.tsite_id?.message
                          }
                        />
                      )}
                    />
                    <Controller
                      name={`trainingSites.${index}.role`}
                      control={control}
                      rules={{ required: "Role is required" }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          id="role"
                          label="Roles"
                          placeholder="Select role"
                          options={Roles}
                          error={errors?.trainingSites?.[index]?.role?.message}
                        />
                      )}
                    />
                  </div>

                  {fields.length > 1 && (
                    <div
                      onClick={() => remove(index)}
                      className="bg-neutral-200 p-2 -mb-6 rounded-md cursor-pointer hover:bg-neutral-300"
                    >
                      <LucideTrash2 className="size-4" />
                    </div>
                  )}
                </div>
              ))}

              <div
                onClick={() => append({ tsite_id: "", role: "" })}
                className="mt-4 px-2 py-1.5 inline-flex items-center gap-1 border rounded-md text-sm bg-neutral-700 text-neutral-100 cursor-pointer hover:bg-neutral-600 shadow-sm"
              >
                <FaPlus className="size-3" />
                Add more
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-8 gap-4">
            <BackButton />
            <Button
              type="submit"
              disabled={storeUserPending}
              className="px-6 py-2 bg-[#C1121F] text-white rounded-md text-sm font-medium hover:bg-[#a00e1a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {storeUserPending ? "Saving..." : "Add User"}
            </Button>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default AddUser;
