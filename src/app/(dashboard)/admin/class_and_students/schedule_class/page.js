"use client";
import SectionTitle from "@/components/common/SectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import FormTextarea from "@/components/shared/form/FormTextarea";
import { Button } from "@/components/ui/button";
import {
  getAllClient,
  getAllCourses,
  getAllInstructor,
  getAllLocation,
} from "@/hooks/api/dashboardApi";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm({
    defaultValues: {
      agent: "",
      garageCode: "",
      doorCode: "",
      gateCode: "",
      lockboxCode: "",
      lockboxLocation: "",
      parking: "",
      showingInstructions: "",
    },
  });

  const {
    control,
    register,
    reset,
    formState: { errors },
  } = form;

  const { data: coursesData, isLoading: coursesLoading } = getAllCourses();
  const { data: clientData, isLoading: clientDataLoading } = getAllClient();
  const { data: locationData, isLoading: locationDataLoading } =
    getAllLocation();
  const { data: instructorData, isLoading: instructorDataLoading } =
    getAllInstructor();

  const onSubmit = (values) => {};
  return (
    <div className="flex flex-col gap-[10px] lg:gap-[20px]">
      <SectionTitle title={"Schedule a Class"} />
      <FormContainer
        form={form}
        onSubmit={onSubmit}
        className="bg-white p-4 lg:p-6 rounded-lg shadow"
      >
        {/* Main form layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Controller
            name="course"
            control={control}
            rules={{ required: "Course is required" }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                id="course"
                label="Course"
                placeholder="Course"
                isLoading={coursesLoading}
                options={coursesData?.data}
                error={errors.course?.message}
                className="flex-1"
              />
            )}
          />
          <FormInput name="classId" label="Class Id" placeholder="Class Id" />
          <Controller
            name="client"
            control={control}
            rules={{ required: "Client is required" }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                id="client"
                label={"Client"}
                placeholder="Client"
                isLoading={clientDataLoading}
                options={clientData?.data?.data}
                error={errors.client?.message}
                className={"flex-1"}
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                id="location"
                label={"Location"}
                placeholder="Location"
                isLoading={locationDataLoading}
                options={locationData?.data?.data}
                error={errors.location?.message}
                className={"flex-1"}
              />
            )}
          />
          <div className="gap-6 grid grid-cols-2 col-span-2">
            <div className="flex-1">
              <Controller
                name="instructor"
                control={control}
                rules={{ required: "Instructor is required" }}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    id="instructor"
                    label={"Instructor"}
                    placeholder="Instructor"
                    isLoading={instructorDataLoading}
                    options={instructorData?.data}
                    error={errors.instructor?.message}
                    className={"flex-1"}
                  />
                )}
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="bidding-checkbox"
                type="checkbox"
                {...form.register("openForBidding")}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="bidding-checkbox"
                className="text-sm text-gray-600"
              >
                Open for bidding
              </label>
            </div>
          </div>
          {/* <FormInput
            name="instructorClassId"
            label="Class Id"
            placeholder="Class Id"
          /> */}

          {/* Class Times Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Times
            </label>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="classTimeFrom"
                label=""
                placeholder="from"
                type="time"
              />
              <FormInput
                name="classTimeTo"
                label=""
                placeholder="to"
                type="time"
              />
            </div>
          </div>

          {/* Pricing and Capacity Section */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormInput name="price" label="Price" placeholder="e.g., 100" />
              <FormInput
                name="totalHours"
                label="Total Hours"
                placeholder="e.g., 8"
              />
              <FormInput
                name="maxStudents"
                label="Max Students"
                placeholder="e.g., 25"
              />
            </div>
          </div>

          <div>
            <FormInput
              name="studentManikinRatio"
              label="Student/Manikin Ratio"
            />
            <p className="text-xs text-gray-500 mt-1">if applicable</p>
          </div>

          <FormInput
            name="assistants"
            label="Assistants"
            placeholder="Click to select"
          />

          <FormInput
            name="additionalAssistants"
            label="Assistants"
            placeholder="Click to select"
          />
          <div>
            <FormInput
              name="closeRegistrationEarly"
              label="Close Registration Early"
              type="number"
            />
            <p className="text-xs text-gray-500 mt-1">
              days and hours before class start date
            </p>
          </div>

          {/* Notes Section */}
          <div className="md:col-span-2">
            <FormTextarea name="publicNotes" label="Public Notes" />
          </div>
          <div className="md:col-span-2">
            <FormTextarea name="internalNotes" label="Internal Notes" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50 focus:outline-none"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown cursor hover:bg-brown-hover focus:outline-none"
          >
            Update Class
          </Button>
        </div>
      </FormContainer>
    </div>
  );
};

export default Page;
