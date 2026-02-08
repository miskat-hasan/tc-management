"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import TableSkeleton from "@/components/common/TableSkelation";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { courseSchedule } from "@/data/data";
import {
  getAllClasses,
  getAllCourses,
  getAllInstructor,
  getAllLocation,
  getAllPastClasses,
} from "@/hooks/api/dashboardApi";
import { SearchIcon } from "@/svg/SvgContainer";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { X } from "lucide-react";

const Page = () => {
  const form = useForm();
  const { control, watch, setValue } = form;
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({
    class_id: "",
    course: "",
    instructor: "",
    location: "",
  });

  const onSubmit = (data) => {
    // console.log(data)
  };

  const { data: pastClassData, isLoading: pastClassDataLoading } =
    getAllPastClasses(page, perPage);

  const { data: locationData, isLoading: locationDataLoading } =
    getAllLocation();

  const { data: instructorData, isLoading: instructorDataLoading } =
    getAllInstructor();

  const { data: courseData, isLoading: courseDataLoading } = getAllCourses();

  // Watch form values for filtering
  const watchedClassId = watch("class_id");
  const watchedCourse = watch("courses");
  const watchedInstructor = watch("instructor");
  const watchedLocation = watch("location");

  // Update filters whenever form values change
  useEffect(() => {
    setFilters({
      class_id: watchedClassId || "",
      course: watchedCourse || "",
      instructor: watchedInstructor || "",
      location: watchedLocation || "",
    });
  }, [watchedClassId, watchedCourse, watchedInstructor, watchedLocation]);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    if (!pastClassData?.data?.data) return [];

    return pastClassData.data.data.filter((item) => {
      // Filter by class ID (search by index + 1 or item.id)
      const matchClassId =
        !filters.class_id ||
        item.id?.toString().includes(filters.class_id) ||
        (pastClassData.data.data.indexOf(item) + 1)
          .toString()
          .includes(filters.class_id);

      // Filter by course
      const matchCourse =
        !filters.course || item.course?.id === filters.course;

      // Filter by instructor
      const matchInstructor =
        !filters.instructor || item.instructor?.id === filters.instructor;

      // Filter by location
      const matchLocation =
        !filters.location || item.location?.id === filters.location;

      return matchClassId && matchCourse && matchInstructor && matchLocation;
    });
  }, [pastClassData, filters]);

  // Check if any filter is active
  const hasActiveFilters =
    filters.class_id || filters.course || filters.instructor || filters.location;

  // Clear all filters
  const handleClearFilters = () => {
    setValue("class_id", "");
    setValue("courses", "");
    setValue("instructor", "");
    setValue("location", "");
    setFilters({
      class_id: "",
      course: "",
      instructor: "",
      location: "",
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
        <div className="px-[16px] py-[16px] lg:px-[32px] lg:py-[32px] bg-white rounded-[16px] flex flex-wrap lg:flex-nowrap gap-[10px] xl:gap-[24px]">
          <Controller
            name="courses"
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
            name="instructor"
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
            name="location"
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
          />
          <div className="flex-1">
            <FormInput
              name="class_id"
              label="Class Id"
              placeholder={"search by class id"}
            />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <Button
                type="button"
                onClick={handleClearFilters}
                className="py-[12px] lg:py-[24px] text-[13px] lg:text-base cursor-pointer bg-red-500 hover:bg-red-600 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </FormContainer>

      {/* Table */}
      <div className="p-[13px] lg:p-[26px]  bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <div className="flex justify-between items-center">
          <SubSectionTitle subtitle="All Lists" />
          {hasActiveFilters && (
            <span className="text-sm text-gray-600">
              Showing {filteredData.length} of{" "}
              {pastClassData?.data?.data?.length || 0} results
            </span>
          )}
        </div>
        {pastClassDataLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm sm:text-base text-left text-gray-700">
              <thead className="bg-gray-50 text-black capitalize text-[16px] sm:text-[18px] font-semibold">
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
              </thead>

              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-3 sm:px-6 py-3 text-gray-800">
                        {item.class_id}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-gray-800 whitespace-nowrap">
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
                      <td className="px-3 sm:px-6 py-3 text-gray-600">
                        {item.max_student}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-center">
                        <Link
                          href={`/admin/class_and_students/past_class/${item.id}`}
                        >
                          <button className="p-1.5 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                            <CiEdit className="text-gray-600 text-[14px] sm:text-[16px]" />
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
                      {hasActiveFilters
                        ? "No results match your filters"
                        : "No results found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex flex-col md:flex-row items-center justify-end mt-3 lg:mt-6 gap-3">
          {/* Pagination */}
          <div className="flex items-center gap-2">
            {pastClassData?.data?.links?.map((link, index) => (
              <button
                key={index}
                disabled={link.url === null || link.page === null}
                onClick={() => link.page && setPage(link.page)}
                className={`px-3 py-1 text-sm border rounded-md ${
                  link.active
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "hover:bg-gray-100"
                } ${
                  link.url === null || link.page === null
                    ? "text-gray-400 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;