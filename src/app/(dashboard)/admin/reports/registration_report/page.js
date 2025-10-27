"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/svg/SvgContainer";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

// ===== Demo data =====
export const courseSchedule = [
  {
    id: 1,
    student: "John Doe",
    dateTime: "2025-10-25",
    course: "Anatomy Basics",
    promoCode: "NEW2025",
    status: "Active",
  },
  {
    id: 2,
    student: "Jane Smith",
    dateTime: "2025-10-20",
    course: "Pharmacology Fundamentals",
    promoCode: "WELCOME10",
    status: "Used",
  },
  {
    id: 3,
    student: "Michael Brown",
    dateTime: "2025-09-15",
    course: "Medical Imaging Techniques",
    promoCode: "SUMMER50",
    status: "Expired",
  },
  {
    id: 4,
    student: "Emily Davis",
    dateTime: "2025-08-02",
    course: "Emergency Medicine Essentials",
    promoCode: "BLACK75",
    status: "Active",
  },
  {
    id: 5,
    student: "William Lee",
    dateTime: "2025-10-27",
    course: "Anatomy Basics",
    promoCode: "NEW2025",
    status: "Active",
  },
];

// ===== Helper =====
const parseDate = (value) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

// ===== Page Component =====
const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);

  const [filters, setFilters] = useState({
    registration: "",
    month: "",
    promoCode: "",
  });

  const [filteredData, setFilteredData] = useState(courseSchedule);

  const handleSelectChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const now = new Date();

    const filtered = courseSchedule.filter((item) => {
      const dt = parseDate(item.dateTime);

      // Registration range filter
      let matchRegistration = true;
      if (filters.registration && dt) {
        const diffDays = Math.floor((now - dt) / (1000 * 60 * 60 * 24));
        switch (filters.registration) {
          case "today":
            matchRegistration = diffDays === 0;
            break;
          case "yesterday":
            matchRegistration = diffDays === 1;
            break;
          case "last7":
            matchRegistration = diffDays >= 0 && diffDays <= 6;
            break;
          case "last30":
            matchRegistration = diffDays >= 0 && diffDays <= 29;
            break;
          default:
            matchRegistration = true;
        }
      }

      // Month filter
      let matchMonth = true;
      if (filters.month && dt) {
        const monthName = filters.month.toLowerCase();
        const monthIndex = dt.getMonth();
        const months = [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ];
        matchMonth = months[monthIndex] === monthName;
      }

      // Promo code filter
      let matchCode = true;
      if (filters.promoCode) {
        matchCode = item.promoCode
          .toLowerCase()
          .includes(filters.promoCode.toLowerCase());
      }

      return matchRegistration && matchMonth && matchCode;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Promo Code Reports"} />
      </div>

      {/* Filters */}
      <div className="px-[32px] py-[32px] bg-white rounded-[16px] flex gap-[24px]">
        <CustomSelect
          id="registration"
          label="Registration Date"
          placeholder="Select registration range"
          options={[
            { value: "today", label: "Today" },
            { value: "yesterday", label: "Yesterday" },
            { value: "last7", label: "Last 7 days" },
            { value: "last30", label: "Last 30 days" },
          ]}
          onChange={(val) => handleSelectChange("registration", val)}
          className="flex-1"
        />
        <CustomSelect
          id="month"
          label="Month"
          placeholder="Select month"
          options={[
            { value: "January", label: "January" },
            { value: "February", label: "February" },
            { value: "March", label: "March" },
            { value: "April", label: "April" },
            { value: "May", label: "May" },
            { value: "June", label: "June" },
            { value: "July", label: "July" },
            { value: "August", label: "August" },
            { value: "September", label: "September" },
            { value: "October", label: "October" },
            { value: "November", label: "November" },
            { value: "December", label: "December" },
          ]}
          onChange={(val) => handleSelectChange("month", val)}
          className="flex-1"
        />
        <CustomSelect
          id="promoCode"
          label="Promo Code"
          placeholder="Select promo code"
          options={[
            { value: "NEW2025", label: "NEW2025" },
            { value: "WELCOME10", label: "WELCOME10" },
            { value: "SUMMER50", label: "SUMMER50" },
            { value: "BLACK75", label: "BLACK75" },
          ]}
          onChange={(val) => handleSelectChange("promoCode", val)}
          className="flex-1"
        />

        <div className="flex justify-end items-end">
          <Button
            onClick={handleSearch}
            className="py-[24px] cursor-pointer bg-brown flex items-center gap-2"
          >
            <SearchIcon />
            Search
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <SubSectionTitle subtitle="All Lists" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[20px] font-semibold">
              <tr>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Reg Date</th>
                <th className="px-6 py-3">Class Date</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Balance Due</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 text-gray-800">{item.student}</td>
                    <td className="px-6 py-4 text-gray-800">{item.dateTime}</td>
                    <td className="px-6 py-4">{item.dateTime}</td>
                    <td className="px-6 py-4">{item.course}</td>
                    <td className="px-6 py-4 text-gray-600">0.00</td>
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

        {/* Footer */}
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
