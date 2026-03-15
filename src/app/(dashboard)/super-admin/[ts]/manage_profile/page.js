"use client";

import React from "react";
import { useForm } from "react-hook-form";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/hooks/api/dashboardApi";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";

const Page = () => {
  /* ================= PROFILE FORM ================= */
  const { user } = useAuth();

  const profileForm = useForm({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      country: "",
      emailOnAssign: false,
      emailOnUpdate: false,
      emailReminder: false,
      smsReminder: false,
      showAllClasses: false,
    },
  });

  const onProfileSubmit = (values) => {
    console.log("Profile Data:", values);
  };

  /* ================= PASSWORD FORM ================= */
  const passwordForm = useForm({
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { reset } = passwordForm;

  const password = passwordForm.watch("password");

  const { mutate: changePasswordMutation, isPending: changePasswordPending } =
    useChangePassword();

  const onPasswordSubmit = (data) => {
    changePasswordMutation(
      { user_id: user?.id, ...data },
      {
        onSuccess: (data) => {
          reset();
          Swal.fire({
            text: data?.message,
            icon: "success",
          });
        },
      },
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title="My Account" />

      {/* ================= GENERAL INFORMATION ================= */}
      <div className="bg-white rounded-[14px] p-4 lg:p-8">
        <SectionTitle title="1. General Information" className="mb-3" />

        <FormContainer form={profileForm} onSubmit={onProfileSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <FormInput
              name="username"
              label="User Name"
              placeholder="User name"
            />

            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />

            <FormInput name="address1" label="Address 1" />
            <FormInput name="address2" label="Address 2" />

            <FormInput name="city" label="City" />
            <FormInput name="stateProvince" label="State / Province / Region" />

            <FormInput name="zipPostalCode" label="Zip / Postal Code" />

            <CustomSelect
              name="country"
              label="Country"
              placeholder="Country"
              options={[
                { value: "germany", label: "Germany" },
                { value: "canada", label: "Canada" },
              ]}
            />

            <FormInput name="mobilePhone" label="Mobile Phone" type="tel" />
            <FormInput name="emailAddress" label="Email Address" type="email" />

            <FormInput name="nameOnCard" label="Name To Print On Card" />
            <FormInput name="ahaInstructorId" label="AHA Instructor ID" />
            <FormInput
              name="hsiInstructorId"
              label="HSI (ASHI) Instructor ID"
            />
            <FormInput name="rclcUsername" label="RCLC Username" />
            <FormInput name="ahaEcardKey" label="AHA eCard Key" />
            <FormInput name="icalFeedUrl" label="ICal Feed URL" />
          </div>

          {/* ================= OPTIONS & ROLES ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-700">Options</p>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  {...profileForm.register("emailOnAssign")}
                  className="accent-brown"
                />
                Send me an email when I am assigned to a class
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  {...profileForm.register("emailOnUpdate")}
                  className="accent-brown"
                />
                Send me an email when there are updates to a class
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  {...profileForm.register("emailReminder")}
                  className="accent-brown"
                />
                Send me reminder emails prior to my classes
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-700">Roles</p>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  {...profileForm.register("smsReminder")}
                  className="accent-brown"
                />
                Send me reminder text messages prior to my classes
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  {...profileForm.register("showAllClasses")}
                  className="accent-brown"
                />
                Default upcoming class list page size to Show All
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" className="bg-brown hover:bg-brown-hover">
              Save Changes
            </Button>
          </div>
        </FormContainer>
      </div>

      {/* ================= PASSWORD CHANGE ================= */}
      <div className="bg-white rounded-[14px] p-4 lg:p-8">
        <SectionTitle title="2. Password Change" className="mb-3" />

        <FormContainer form={passwordForm} onSubmit={onPasswordSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <FormInput
              name="old_password"
              label="Current Password"
              type="password"
              rules={{ required: "Current Password is required" }}
            />
            <FormInput
              name="password"
              label="New Password"
              type="password"
              rules={{ required: "Password is required" }}
            />

            <FormInput
              name="password_confirmation"
              label="Confirm Password"
              type="password"
              rules={{
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
            />

            <div className="col-span-full flex justify-end mt-6">
              <Button
                disabled={changePasswordPending}
                type="submit"
                className="bg-brown hover:bg-brown-hover disabled:opacity-50"
              >
                {changePasswordPending ? "Processing..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
