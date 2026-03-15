"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import TableSkeleton from "@/components/common/TableSkelation";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import { Button } from "@/components/ui/button";
import { getAllInstructor } from "@/hooks/api/dashboardApi";
import useAuth from "@/hooks/useAuth";
import { SearchIcon } from "@/svg/SvgContainer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

const Page = () => {
  const form = useForm({
    defaultValues: {
      instructorId: "",
    },
  });

  const { control } = form;

  const { trainingSiteData, trainingSiteDataLoading, selectedTrainingSiteId } =
    useAuth();

  const { data: instructorData, isLoading: instructorDataLoading } =
    getAllInstructor();

  const [selectedTrainingSiteData, setSelectedTrainingSiteData] =
    useState(null);

  const [filteredClasses, setFilteredClasses] = useState(null);

  useEffect(() => {
    let data = null;
    if (selectedTrainingSiteId) {
      data = trainingSiteData?.data?.find(
        (item) => item?.id == selectedTrainingSiteId,
      );
    }

    if (trainingSiteData?.data && !trainingSiteDataLoading) {
      setSelectedTrainingSiteData(
        data?.classes ?? trainingSiteData?.data?.[0]?.classes,
      );
    }
    if (selectedTrainingSiteData) {
      setFilteredClasses(selectedTrainingSiteData);
    }
  }, [
    trainingSiteData,
    trainingSiteDataLoading,
    selectedTrainingSiteId,
    selectedTrainingSiteData,
  ]);

  const onSubmit = (data) => {
    const selectedInstructor = instructorData?.data?.data?.find(
      (item) => String(item.id) === String(data?.instructorId),
    );

    const classData = selectedTrainingSiteData.filter(
      (item) =>
        item?.instructor?.first_name === selectedInstructor?.first_name &&
        item?.instructor?.last_name === selectedInstructor?.last_name,
    );
    setFilteredClasses(classData);
  };

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Classes"} />
      </div>

      {/* Search filters */}
      {/* <FormContainer form={form} onSubmit={onSubmit}>
        <div className=" px-[16px] py-[16px] lg:px-[32px] lg:py-[32px] bg-white rounded-[16px] flex flex-wrap lg:flex-nowrap gap-[10px] xl:gap-[24px]">
          <Controller
            name="instructorId"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                id="Instructor"
                label="Instructor"
                placeholder="All instructor"
                options={instructorData?.data?.data}
                isLoading={instructorDataLoading}
                className="flex-1"
              />
            )}
          />

          <div className="flex justify-end items-end">
            <Button className="py-[12px] lg:py-[24px] text-[13px] lg:text-base cursor-pointer bg-brown flex items-center gap-2">
              <SearchIcon />
              Search
            </Button>
          </div>
        </div>
      </FormContainer> */}

      {/* Table */}
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <SubSectionTitle subtitle="All Lists" />
        {trainingSiteDataLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full  text-sm sm:text-base text-left text-gray-700 min-w-[800px]">
              <thead className="bg-gray-50 text-black capitalize text-[16px] sm:text-[18px] font-semibold">
                <tr>
                  <th className="px-3 sm:px-6 py-3">Date/Time</th>
                  <th className="px-3 sm:px-6 py-3">Course</th>
                  <th className="px-3 sm:px-6 py-3">Instructor</th>
                  <th className="px-3 sm:px-6 py-3">Location</th>
                  <th className="px-3 sm:px-6 py-3">Students</th>
                  <th className="px-3 sm:px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses?.length > 0 ? (
                  filteredClasses?.map((item, index) => (
                    <tr
                      key={item?.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                        {item?.class_times?.[0]?.date}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-gray-800 whitespace-nowrap">
                        {item?.course?.course_name}
                      </td>

                      <td className="px-3 sm:px-6 py-3 truncate max-w-[160px] sm:max-w-[220px]">
                        {item?.instructor?.first_name}{" "}
                        {item?.instructor?.last_name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 truncate max-w-[160px] sm:max-w-[220px]">
                        {item?.location_name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-gray-600">
                        {item?.student}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-center space-x-2">
                        <Link href={`classes/${item.id}`}>
                          <button className="p-1.5 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                            <CiEdit className="text-gray-600 text-[14px] sm:text-[16px]" />
                          </button>
                        </Link>
                        <Link href={`classes/roster/${item.id}`}>
                          <button className="p-1.5 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                            <GoArrowUpRight className="text-gray-600 text-[14px] sm:text-[16px]" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
