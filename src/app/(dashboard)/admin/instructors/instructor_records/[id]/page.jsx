"use client";
import { getAllDocuments, getSingleInstructor } from "@/hooks/api/dashboardApi";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { createInstructor, getAllCountry } from "@/hooks/api/dashboardApi";
import Link from "next/link";
import { Download, PlusIcon, Trash2 } from "lucide-react";

const page = ({ params }) => {
  const form = useForm({
    defaultValues: {},
  });

  const {
    register,
    control,
    reset,
    formState: { errors },
  } = form;

  const { data: instructorData, isLoading: instructorLoading } =
    getSingleInstructor(params?.id);

  const { data: documentData, isLoading: documentLoading } = getAllDocuments();

  const { data: countryData, isLoading: countryDataLoading } = getAllCountry();

  React.useEffect(() => {
    if (instructorData?.data && countryData) {
      reset({
        username: instructorData?.data?.username ?? "",
        training_site: instructorData?.data?.training_site_id ?? "",
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
        active_user: instructorData?.data?.active_user ?? 0,
        read_only_user: instructorData?.data?.read_only_user ?? 0,
        allow_bid_on_open_classes:
          instructorData?.data?.allow_bid_on_open_classes ?? 0,
      });
    }
  }, [instructorData, reset]);

  const { mutateAsync: instructorMutation, isPending: instructorPending } =
    createInstructor();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("username", data?.username);
    formData.append("training_site_id", data?.training_site);
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
    formData.append("password", data?.password);
    formData.append("active_user", Number(data?.active_user));
    formData.append("read_only_user", Number(data?.read_only_user));
    formData.append(
      "allow_bid_on_open_classes",
      Number(data?.allow_bid_on_open_classes)
    );

    await instructorMutation(formData);
  };

  return (
    <div>
      {!countryData && instructorLoading && countryDataLoading ? (
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
                  name="training_site"
                  control={control}
                  rules={{ required: "Training center is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      id="trainingsite"
                      label="Training Site"
                      placeholder="Training Site"
                      options={[
                        {
                          id: "1",
                          name: "CODE BLUE CPR SERVICES. LLC",
                        },
                      ]}
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
                      options={countryData?.data}
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

              {/* document */}
              <div className="bg-white rounded-[14px] p-4 border border-gray-200 mt-8 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xl font-medium">Documents</h5>
                  <label className="py-[7px] cursor-pointer rounded-sm text-white px-3 text-sm bg-brown flex items-center gap-2">
                    <input type="file" className="hidden" />
                    Add Document
                    <PlusIcon size={16} />
                  </label>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[700px] w-full text-sm sm:text-base text-left text-gray-700">
                    <thead className="bg-gray-50 text-black text-[14px] sm:text-[16px] font-semibold">
                      <tr>
                        <th className="px-3 sm:px-6 py-3">Filename</th>
                        <th className="px-3 sm:px-6 py-3 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {documentLoading && (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-6 text-gray-500 italic"
                          >
                            Loading documents data ...
                          </td>
                        </tr>
                      )}
                      {documentLoading || documentData?.data?.length > 0 ? (
                        documentData?.data?.map((item, index) => (
                          <tr
                            key={item.id}
                            className="border-b hover:bg-gray-50 transition-all"
                          >
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                              {item.document_path}
                            </td>
                            <td className="px-3 sm:px-6 py-3 text-center">
                              <div className="flex items-center gap-1 justify-center">
                                <Link
                                  href={``}
                                  className="p-1.5 sm:p-2 bg-gray-100 rounded-lg inline-block hover:bg-gray-200 transition"
                                >
                                  <Download size={16} />
                                </Link>
                                <Link
                                  href={`/documents/delete?id=${item?.id}`}
                                  className="p-1.5 sm:p-2 bg-gray-100 rounded-lg inline-block hover:bg-gray-200 transition"
                                >
                                  <Trash2 size={16} />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-6 text-gray-500 italic"
                          >
                            No results found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
        </section>
      )}
    </div>
  );
};

export default page;
