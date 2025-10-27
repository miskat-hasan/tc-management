"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import CustomInput from "@/components/shared/form/CustomInput";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/svg/SvgContainer";
import { CiEdit } from "react-icons/ci";
import { StudentSearchResultsdemo } from "@/data/data";

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);

  // Filter states
  const [searchBy, setSearchBy] = useState("name");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [singleInput, setSingleInput] = useState("");

  const [filteredData, setFilteredData] = useState(StudentSearchResultsdemo);

  const handleSearch = () => {
    const filtered = StudentSearchResultsdemo.filter((item) => {
      let match = true;

      // Name search
      if (searchBy === "name") {
        const fullName = item.name.toLowerCase();
        if (firstName && !fullName.includes(firstName.toLowerCase()))
          match = false;
        if (lastName && !fullName.includes(lastName.toLowerCase()))
          match = false;
      }

      // Email search
      if (searchBy === "email" && singleInput) {
        match = item.email.toLowerCase().includes(singleInput.toLowerCase());
      }

      // Phone search
      if (searchBy === "phone" && singleInput) {
        match = item.phone.toLowerCase().includes(singleInput.toLowerCase());
      }

      return match; // ✅ return the match result
    });

    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Student Search Results"} />
      </div>

      {/* Search Filters */}
      <div className="px-[32px] py-[32px] bg-white rounded-[16px] flex flex-wrap gap-[24px] items-end">
        {/* Search By Dropdown */}
        <CustomSelect
          id="searchBy"
          label="Search By"
          placeholder="Select"
          value={searchBy}
          options={[
            { value: "name", label: "Name" },
            { value: "email", label: "Email" },
            { value: "phone", label: "Phone Number" },
          ]}
          onChange={(val) => {
            setSearchBy(val);
            setFirstName("");
            setLastName("");
            setSingleInput("");
          }}
          className="w-[200px]"
        />

        {/* Dynamic Inputs */}
        {searchBy === "name" ? (
          <>
            <CustomInput
              id="firstName"
              label="First Name"
              placeholder="Enter first name"
              value={firstName}
              onChange={setFirstName}
              className="w-[200px]"
            />
            <CustomInput
              id="lastName"
              label="Last Name"
              placeholder="Enter last name"
              value={lastName}
              onChange={setLastName}
              className="w-[200px]"
            />
          </>
        ) : (
          <CustomInput
            id={searchBy}
            label={searchBy === "email" ? "Email" : "Phone Number"}
            placeholder={`Enter ${
              searchBy === "email" ? "email" : "phone number"
            }`}
            value={singleInput}
            onChange={setSingleInput}
            className="w-[250px]"
          />
        )}

        {/* Search Button */}
        <div className="flex justify-end items-end">
          <Button
            onClick={handleSearch}
            className="py-[22px] cursor-pointer bg-brown flex items-center gap-2"
          >
            <SearchIcon />
            Search
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <SubSectionTitle subtitle="All List" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-black capitalize text-[20px] font-semibold">
              <tr>
                <th className="px-6 py-3 w-[40px]">SL</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Reg Date</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Class</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-800">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs text-gray-500">{item.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.reg_date}</td>
                    <td className="px-6 py-4">{item.phone}</td>
                    <td className="px-6 py-4 truncate max-w-[250px]">
                      {item.class}
                    </td>
                    <td className="px-6 py-4">
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
