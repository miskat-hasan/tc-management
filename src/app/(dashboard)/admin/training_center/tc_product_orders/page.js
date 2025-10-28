"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { Button } from "@/components/ui/button";
import { courseSchedule, productOrder } from "@/data/data";
import { SearchIcon } from "@/svg/SvgContainer";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);
  const [filters, setFilters] = useState({
    date: "",
    course: "",
    instructor: "",
    location: "",
  });

  const [filteredData, setFilteredData] = useState(courseSchedule);

  // Handle select changes
  const handleSelectChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Search / filter button logic
  const handleSearch = () => {
    const filtered = courseSchedule.filter((item) => {
      const matchDate =
        !filters.date ||
        item.dateTime.toLowerCase().includes(filters.date.toLowerCase());
      const matchCourse =
        !filters.course ||
        item.course.toLowerCase().includes(filters.course.toLowerCase());
      const matchInstructor =
        !filters.instructor ||
        item.instructor
          .toLowerCase()
          .includes(filters.instructor.toLowerCase());
      const matchLocation =
        !filters.location ||
        item.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchDate && matchCourse && matchInstructor && matchLocation;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Activity Report"} />
      </div>

      {/* Search filters */}
      <div className="lg:px-[32px] px-[16px] py-[16px] lg:py-[32px] bg-white rounded-[16px] flex gap-[12px] lg:gap-[24px]">
        <CustomSelect
          id="dates"
          label="Dates"
          placeholder="All dates"
          options={[
            { value: "today", label: "Today" },
            { value: "yesterday", label: "Yesterday" },
            { value: "last7days", label: "Last 7 days" },
          ]}
          onChange={(val) => handleSelectChange("date", val)}
          className="flex-1"
        />

        <div className="flex justify-end items-end">
          <Button
            onClick={handleSearch}
            className="py-[12px] lg:py-[24px] cursor-pointer bg-brown flex items-center gap-2"
          >
            <SearchIcon />
            Search
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        <SubSectionTitle subtitle="All Lists" />
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm sm:text-base text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[14px] sm:text-[20px] font-semibold">
              <tr>
                <th className="px-3 sm:px-6 py-3 w-[40px]">Date</th>
                <th className="px-3 sm:px-6 py-3">Site / Class</th>
                <th className="px-3 sm:px-6 py-3">Ordered By</th>
                <th className="px-3 sm:px-6 py-3">Status</th>
                <th className="px-3 sm:px-6 py-3">Paid</th>
                <th className="px-3 sm:px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {productOrder.length > 0 ? (
                productOrder.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-3 sm:px-6 py-3 text-gray-800 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-3 sm:px-6 py-3 text-gray-800 truncate max-w-[150px] sm:max-w-[200px]">
                      {item.site_class}
                    </td>
                    <td className="px-3 sm:px-6 py-3 truncate max-w-[150px] sm:max-w-[200px]">
                      {item.ordered_by}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                      {item.status}
                    </td>
                    <td className="px-3 sm:px-6 py-3 text-gray-600 whitespace-nowrap">
                      {item.paid}
                    </td>
                    <td className="px-3 sm:px-6 py-3 text-center">
                      <button className="p-1.5 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        <CiEdit className="text-gray-600 text-[14px] sm:text-[16px]" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-3 sm:py-6 text-gray-500 italic"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Show:</span>
            <select
              value={selectedShow}
              onChange={(e) => setSelectedShow(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-500 border rounded-md hover:bg-gray-100">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-blue-500 rounded-md text-blue-600">
              1
            </button>
            <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 border rounded-md hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
