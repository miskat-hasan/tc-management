"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { Button } from "@/components/ui/button";
import { clientData } from "@/data/data";
import { SearchIcon } from "@/svg/SvgContainer";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);
  const [filters, setFilters] = useState({
    date: "",
    client: "",
  });

  const [filteredData, setFilteredData] = useState(clientData);

  // Handle select changes
  const handleSelectChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Search / filter button logic
  const handleSearch = () => {
    const filtered = clientData.filter((item) => {
      const matchDate =
        !filters.date ||
        item.dateTime.toLowerCase().includes(filters.date.toLowerCase());
      const matchClient =
        !filters.client ||
        item.client.toLowerCase().includes(filters.client.toLowerCase());

      return matchDate && matchClient;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Client Activity Report"} />
      </div>

      {/* Search filters */}
      <div className="px-[32px] py-[32px] bg-white rounded-[16px] flex gap-[24px]">
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
        <CustomSelect
          id="Client"
          label="Client"
          placeholder="All Client"
          options={[
            { value: "TOP HAT CPR LLC", label: "TOP HAT CPR LLC" },
            {
              value: "LIFELINE MEDICAL TRAINING",
              label: "LIFELINE MEDICAL TRAINING",
            },
            { value: "HEARTSAFE SOLUTIONS", label: "HEARTSAFE SOLUTIONS" },
            { value: "CPR READY INSTITUTE", label: "CPR READY INSTITUTE" },
            {
              value: "FIRST RESPONSE ACADEMY",
              label: "FIRST RESPONSE ACADEMY",
            },
            {
              value: "EMERGENCY CARE PARTNERS",
              label: "EMERGENCY CARE PARTNERS",
            },
            {
              value: "RESCUE TRAINING CENTER",
              label: "RESCUE TRAINING CENTER",
            },
            {
              value: "SAFE LIFE CPR SERVICES",
              label: "SAFE LIFE CPR SERVICES",
            },
          ]}
          onChange={(val) => handleSelectChange("client", val)}
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
        <SubSectionTitle subtitle="Client Registrations" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[20px] font-semibold">
              <tr>
                <th className="px-6 py-3 w-[200px] ">Name</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Class</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Due</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 text-gray-800">
                      <p>{item.name}</p>
                      <p>{item.email}</p>
                    </td>
                    <td className="px-6 py-4">{item.client}</td>
                    <td className="px-6 py-4 truncate max-w-[220px]">
                      {item.class}
                    </td>
                    <td className="px-6 py-4 truncate max-w-[220px]">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.due}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "Complete"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        <CiEdit className="text-gray-600 text-[16px]" />
                      </button>
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
