"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/svg/SvgContainer";
import React, { useState } from "react";

const products = [
  {
    productCode: "BLOODBORNE PATHOGENS TRAINING",
    productName: "Bloodborne Pathogens Training",
    quantity: 1,
    totalSales: "$25.00",
  },
  {
    productCode: "CHILD AND INFANT CPR CERTIFICATION",
    productName: "Child and Infant CPR Certification",
    quantity: 1,
    totalSales: "$20.00",
  },
  {
    productCode:
      "LIFE-THREATENING BLEEDING & TOURNIQUET APPLICATION CERTIFICATION",
    productName:
      "Life-Threatening Bleeding & Tourniquet Application Certification",
    quantity: 0,
    totalSales: "$00.00",
  },
  {
    productCode: "CODE BLUE BACKPACK PACKAGE",
    productName: "Code Blue CPR Services Backpack Package",
    quantity: 0,
    totalSales: "$00.00",
  },
  {
    productCode: "REDCROSS BACKPACK PACKAGE COLOR",
    productName: "Redcross CPR Services Backpack Package Color",
    quantity: 0,
    totalSales: "$00.00",
  },
];
const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);
  const [filters, setFilters] = useState({ month: "" });

  const handleSelectChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const filtered = tableData.filter((item) => {
      const matchMonth =
        !filters.month ||
        item.month.toLowerCase().includes(filters.month.toLowerCase());
      return matchMonth;
    });
    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Products Add-on Reports"} />
      </div>

      {/* Search filters */}
      <div className="px-[32px] py-[32px] bg-white rounded-[16px] flex gap-[24px]">
        <CustomSelect
          id="month"
          label="Month"
          placeholder="All Month"
          options={[
            { value: "january", label: "January" },
            { value: "february", label: "February" },
            { value: "march", label: "March" },
            { value: "october", label: "October" },
          ]}
          onChange={(val) => handleSelectChange("month", val)}
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
            <thead className="bg-gray-50  text-black capitalize text-[16px] font-semibold">
              <tr>
                <th className="px-6 py-3 ">Product Code</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 text-gray-800">
                      {item.productCode}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.totalSales}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
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
