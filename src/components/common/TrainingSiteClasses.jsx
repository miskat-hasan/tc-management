"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import TableSkeleton from "@/components/common/TableSkelation";
import { getAllClasses } from "@/hooks/api/dashboardApi";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

const TrainingSiteClasses = () => {
  const { trainingSiteData, trainingSiteDataLoading, selectedTrainingSiteId } =
    useAuth();

    const {data: classData, isLoading: classLoading} = getAllClasses()

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


  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Classes"} />
      </div>
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
                {classData?.data?.data?.length > 0 ? (
                  classData?.data?.data?.map((item) => (
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
                        {item?.enrollments_count ?? "0"}/{item?.max_student}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-center space-x-2">
                          <div className="flex items-center flex-nowrap gap-2 justify-center">

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
                          </div>
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

export default TrainingSiteClasses;
