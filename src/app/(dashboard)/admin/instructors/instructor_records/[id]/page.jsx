"use client";
import {
  getallTrainingsite,
  getAllUserRole,
  getSingleInstructor,
  updateInstructor,
} from "@/hooks/api/dashboardApi";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import React, { use } from "react";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { getAllCountry } from "@/hooks/api/dashboardApi";
import Link from "next/link";
import Certification from "../../certifications/page";
import DocumentList from "@/components/dashboard/Instructors/DocumentList";
import Swal from "sweetalert2";

const Page = ({ params }) => {
  const form = useForm({
    defaultValues: {},
  });

  const {
    register,
    control,
    reset,
    formState: { errors },
  } = form;

  const { id } = params;

  const { data: trainingSitesData, isLoading: trainingSitesLoading } =
    getallTrainingsite();

  const { data: countryData, isLoading: countryDataLoading } = getAllCountry();

  const { data: userRoles, isLoading: rolesLoading } = getAllUserRole();

  const { data: instructorData, isLoading: instructorLoading } =
    getSingleInstructor(id);

  console.log("instructorData", instructorData);

  React.useEffect(() => {
    if (
      instructorData?.data &&
      countryData?.data?.data &&
      trainingSitesData?.data &&
      userRoles?.data
    ) {
      reset({
        username: instructorData?.data?.username ?? "",
        trainingSite: instructorData?.data?.training_site_id ?? "",
        firstName: instructorData?.data?.first_name ?? "",
        lastName: instructorData?.data?.last_name ?? "",
        address1: instructorData?.data?.address_line_1 ?? "",
        address2: instructorData?.data?.address_line_2 ?? "",
        city: instructorData?.data?.city ?? "",
        stateProvince: instructorData?.data?.state_province_region ?? "",
        country: instructorData?.data?.country_id ?? "",
        mobilePhone: instructorData?.data?.mobile_phone ?? "",
        emailAddress: instructorData?.data?.email ?? "",
        zipPostalCode: instructorData?.data?.zip_postal_code ?? "",
        nameOnCard: instructorData?.data?.name_to_print_on_card ?? "",
        ahaInstructorId: instructorData?.data?.aha_instructor_id ?? "",
        hsiInstructorId: instructorData?.data?.hsi_instructor_id ?? "",
        rclcUsername: instructorData?.data?.rclc_username ?? "",
        active_user: Boolean(instructorData?.data?.active_user),
        read_only_user: Boolean(instructorData?.data?.read_only_user),
        allow_bid_on_open_classes: Boolean(
          instructorData?.data?.allow_bid_on_open_classes,
        ),
        roles: instructorData?.data?.roles?.map((role) => role.id),
      });
    }
  }, [instructorData, trainingSitesData, reset, userRoles, countryData]);

  const { mutateAsync: instructorMutation, isPending: instructorPending } =
    updateInstructor(id);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("username", data?.username);
    formData.append("training_site_id", data?.trainingSite);
    formData.append("first_name", data?.firstName);
    formData.append("last_name", data?.lastName);
    formData.append("address_line_1", data?.address1);
    formData.append("address_line_2", data?.address2);
    formData.append("city", data?.city);
    formData.append("state_province_region", data?.stateProvince);
    formData.append("country_id", data?.country);
    formData.append("mobile_phone", data?.mobilePhone);
    formData.append("email", data?.emailAddress);
    formData.append("zip_postal_code", data?.zipPostalCode);
    formData.append("name_to_print_on_card", data?.nameOnCard);
    formData.append("aha_instructor_id", data?.ahaInstructorId);
    formData.append("hsi_instructor_id", data?.hsiInstructorId);
    formData.append("rclc_username", data?.rclcUsername);
    formData.append("active_user", Number(data?.active_user));
    formData.append("read_only_user", Number(data?.read_only_user));
    formData.append(
      "allow_bid_on_open_classes",
      Number(data?.allow_bid_on_open_classes),
    );

    data?.roles?.forEach((id) => {
      formData.append("roles[]", Number(id));
    });

    await instructorMutation(formData, {
      onSuccess: (data) => {
        Swal.fire({
          text: data?.message,
          icon: "success",
        });
      },
      onError: (err) => {
        Swal.fire({
          text: err?.response?.data?.message,
          icon: "error",
        });
      },
    });
  };

  return (
    <div>
      {instructorLoading &&
      trainingSitesLoading &&
      countryDataLoading &&
      rolesLoading ? (
        "Loading Data ..."
      ) : (
        <section className="flex flex-col gap-2 lg:gap-4">
          {/* Title */}
          <SectionTitle title="Edit Instructor" />

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
                <Controller
                  name="trainingSite"
                  control={control}
                  rules={{ required: "Training center is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      id="trainingsite"
                      label="Training Site"
                      placeholder="Training Site"
                      options={trainingSitesData?.data}
                      isLoading={trainingSitesLoading}
                      error={errors.trainingSite?.message}
                      className="flex-1"
                    />
                  )}
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

                <FormInput
                  name="mobilePhone"
                  label="Mobile Phone"
                  placeholder="Mobile"
                />
                <FormInput
                  name="emailAddress"
                  label="Email Address"
                  placeholder="Email"
                  readOnly
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
              </div>

              {/* Options + Roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 mt-4 md:mt-8">
                <div className="flex flex-col gap-1 md:gap-2">
                  <p className="font-semibold text-[15px] text-gray-700">
                    Options
                  </p>
                  <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                    <input
                      {...register("active_user")}
                      type="checkbox"
                      className="accent-brown"
                    />
                    Active User
                  </label>
                  <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                    <input
                      {...register("read_only_user")}
                      type="checkbox"
                      className="accent-brown"
                    />
                    Archive Only User
                  </label>
                  <label className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
                    <input
                      {...register("allow_bid_on_open_classes")}
                      type="checkbox"
                      className="accent-brown"
                    />
                    Allow this instructor to bid on open classes
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-[15px] text-gray-700">
                    Roles
                  </p>
                  {userRoles?.data?.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm"
                    >
                      <Controller
                        name="roles"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={field.value?.includes(role.id)}
                            onChange={(e) => {
                              const updatedRoles = e.target.checked
                                ? [...(field.value || []), role.id]
                                : (field.value || []).filter(
                                    (id) => id !== role.id,
                                  );
                              field.onChange(updatedRoles);
                            }}
                            className="accent-brown"
                          />
                        )}
                      />
                      {role.role_name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 lg:gap-4 mt-5 lg:mt-10">
                <Button
                  asChild={true}
                  className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
                >
                  <Link href={"/admin/instructors/instructor_records"}>
                    Back
                  </Link>
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover"
                  disabled={instructorPending}
                >
                  {instructorPending ? "Saving ..." : "Save Changes"}
                </Button>
              </div>
            </FormContainer>
          </div>
          {/* document */}
          <DocumentList
            instructorId={instructorData?.data?.id}
            documentData={instructorData?.data?.documents}
          />

          <Certification
            instructorId={instructorData?.data?.id}
            CertificationData={instructorData?.data?.certifications}
          />
        </section>
      )}
    </div>
  );
};

export default Page;
