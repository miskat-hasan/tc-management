"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { getAllPastClasses, searchClasses } from "@/hooks/api/dashboardApi";
import { SearchIcon } from "@/components/svg/SvgContainer";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import {
  Table,
  TableBodyRow,
  TableButton,
  TableFooter,
  TableHead,
} from "@/components/common/TableElement";

const Page = () => {
  const form = useForm();
  const { reset } = form;
  const [enableSearch, setEnableSearch] = useState(false);
  const [classId, setClassId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [instructorId, setInstructorId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const type = "past";

  const { data: pastClassData, isLoading: pastClassDataLoading } =
    getAllPastClasses(page, perPage);

  const { data: searchedClassData, isLoading: searchedClassDataLoading } =
    searchClasses(
      enableSearch,
      courseId,
      type,
      instructorId,
      locationId,
      classId,
    );

  const tableData = enableSearch
    ? searchedClassData?.data?.data
    : pastClassData?.data?.data;

  const tableLoading = enableSearch
    ? searchedClassDataLoading
    : pastClassDataLoading;

  const onSubmit = (data) => {
    if (data?.class_id) {
      setClassId(data.class_id);
      setEnableSearch(true);
    }
  };

  const handleClearSearch = () => {
    setEnableSearch(false);
    setClassId(null);

    reset({
      class_id: "",
    });
  };

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Past Classes"} />
        {/* <div className="flex items-center gap-1 lg:gap-2 text-[#8C8C8C]">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 bg-transparent accent-[#8C8C8C]"
          />
          <label className="text-[10px] md:text-[12px]">
            Hide Empty Classes
          </label>
        </div> */}
      </div>
      <FormContainer form={form} onSubmit={onSubmit}>
        {/* Search filters */}
        <div className="px-[16px] py-[16px] lg:px-[32px] lg:py-[32px] bg-white dark:bg-black rounded-[16px]">
          <div className="flex flex-wrap lg:flex-nowrap gap-[10px] xl:gap-[24px]">
            {/* <div className="flex-1">
              <FormInput name="dateTime" label="Date/Time" type="date" />
            </div> */}
            {/* <Controller
              name="course_id,"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  id="Courses"
                  label="Courses"
                  placeholder="All courses"
                  isLoading={courseDataLoading}
                  options={courseData?.data?.data}
                  className="flex-1"
                />
              )}
            />
            <Controller
              name="instructor_id"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  id="Instructor"
                  label="Instructor"
                  placeholder="All instructor"
                  isLoading={instructorDataLoading}
                  options={instructorData?.data?.data}
                  className="flex-1"
                />
              )}
            />
            <Controller
              name="location_id"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  id="Location"
                  label="Location"
                  placeholder="All locations"
                  isLoading={locationDataLoading}
                  options={locationData?.data?.data}
                  className="flex-1"
                />
              )}
            /> */}
            <div>
              <FormInput name="class_id" label="Class Id" />
            </div>
            <div className="flex items-end gap-3 mt-4">
              <Button
                type="submit"
                className="py-[12px] lg:py-[24px] text-[13px] lg:text-base cursor-pointer bg-brown dark:bg-dark-brown flex items-center gap-2"
              >
                <SearchIcon />
                Search
              </Button>

              {enableSearch && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-1.5 sm:p-2 bg-gray-100 dark:bg-transparent dark:border dark:border-[#343536] dark:hover:bg-[#292b2c] rounded-lg hover:bg-gray-200 transition cursor-pointer"
                >
                  <IoClose size={18} className="text-gray-600 dark:text-gray" />
                </button>
              )}
            </div>
          </div>
        </div>
      </FormContainer>

      {/* Table */}
      <div className="p-[13px] lg:p-[26px]  bg-white dark:bg-black rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <div className="flex justify-between items-center">
          <SubSectionTitle subtitle="All Lists" />
          {/* {hasActiveFilters && (
            <span className="text-sm text-gray-600">
              Showing {filteredData.length} of{" "}
              {pastClassData?.data?.data?.length || 0} results
            </span>
          )} */}
        </div>
        {tableLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <tr>
                  <th className="px-3 sm:px-6 py-3 w-[40px] text-nowrap">
                    Class ID
                  </th>
                  <th className="px-3 sm:px-6 py-3">Instructor</th>
                  <th className="px-3 sm:px-6 py-3">Date/Time</th>
                  <th className="px-3 sm:px-6 py-3">Course</th>
                  <th className="px-3 sm:px-6 py-3">Location</th>
                  <th className="px-3 sm:px-6 py-3">Enrolled</th>
                  <th className="px-3 sm:px-6 py-3 text-center">Action</th>
                </tr>
              </TableHead>
              <tbody>
                {tableData?.length > 0 ? (
                  tableData?.map((item, index) => (
                    <TableBodyRow key={item.id}>
                      <td className="px-3 sm:px-6 py-3">{item.class_id}</td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                        {item.instructor?.first_name}{" "}
                        {item.instructor?.last_name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                        {item.class_times[0]?.date || item.class_times[0]?.day}
                      </td>
                      <td className="px-3 sm:px-6 py-3 truncate max-w-[140px] sm:max-w-[220px]">
                        {item.course?.course_name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 truncate max-w-[140px] sm:max-w-[220px]">
                        {item.location?.name}
                      </td>
                      <td className="px-3 sm:px-6 py-3">{item.max_student}</td>
                      <td className="px-3 sm:px-6 py-3 text-center">
                        <div className="flex items-center flex-nowrap gap-2 justify-center">
                          <TableButton href={`past_class/${item.id}`}>
                            <CiEdit className="text-gray-600 dark:text-gray text-[14px] sm:text-[16px]" />
                          </TableButton>

                          {/* <TableButton isLink={false} onClick={() => alert("View Roster")}>
                            <CiEdit className="text-gray-600 dark:text-gray text-[14px] sm:text-[16px]" />
                          </TableButton> */}

                          <Link href={`past_class/roster/${item.id}`}>
                            <button className="p-1.5 sm:p-2 bg-gray-100 dark:bg-transparent dark:border dark:border-[#343536] dark:hover:bg-[#292b2c] rounded-lg hover:bg-gray-200 transition cursor-pointer">
                              <GoArrowUpRight className="text-gray-600 dark:text-gray text-[14px] sm:text-[16px]" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </TableBodyRow>
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
            </Table>
          </div>
        )}

        <TableFooter Links={pastClassData?.data?.links} setPage={setPage} />
      </div>
    </div>
  );
};

export default Page;
