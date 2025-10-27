"use client";
import SectionTitle from "@/components/common/SectionTitle";
import SubSectionTitle from "@/components/common/SubSectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/svg/SvgContainer";
import React, { useState, useMemo } from "react";

const tableData = [
  {
    depositDate: "Sat 10/18/25",
    month: "october",
    salesCount: 5,
    salesTotal: 417.0,
    refundCount: 0,
    refundTotal: 0.0,
    chargebackCount: 0,
    chargebackTotal: 0.0,
    grossAmount: 417.0,
    totalFees: -13.13,
    netAmount: 403.87,
  },
  {
    depositDate: "Thu 10/02/25",
    month: "october",
    salesCount: 0,
    salesTotal: 417.0,
    refundCount: 0,
    refundTotal: 0.0,
    chargebackCount: 0,
    chargebackTotal: 0.0,
    grossAmount: 0.0,
    totalFees: -167.71,
    netAmount: -167.71,
  },
  {
    depositDate: "Thu 03/02/25",
    month: "march",
    salesCount: 11,
    salesTotal: 417.0,
    refundCount: 0,
    refundTotal: 0.0,
    chargebackCount: 0,
    chargebackTotal: 0.0,
    grossAmount: 989.25,
    totalFees: -30.94,
    netAmount: 958.31,
  },
  {
    depositDate: "Fri 02/02/25",
    month: "february",
    salesCount: 15,
    salesTotal: 417.0,
    refundCount: 0,
    refundTotal: 0.0,
    chargebackCount: 0,
    chargebackTotal: 0.0,
    grossAmount: 1534.0,
    totalFees: -47.47,
    netAmount: 1486.53,
  },
  {
    depositDate: "Wed 01/02/25",
    month: "january",
    salesCount: 12,
    salesTotal: 417.0,
    refundCount: 0,
    refundTotal: 0.0,
    chargebackCount: 0,
    chargebackTotal: 0.0,
    grossAmount: 1534.0,
    totalFees: -40.86,
    netAmount: 1486.53,
  },
];

const Page = () => {
  const [selectedShow, setSelectedShow] = useState(50);
  const [filters, setFilters] = useState({ month: "" });
  const [filteredData, setFilteredData] = useState(tableData);

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

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, curr) => {
        acc.salesCount += curr.salesCount;
        acc.salesTotal += curr.salesTotal;
        acc.refundTotal += curr.refundTotal;
        acc.chargebackTotal += curr.chargebackTotal;
        acc.grossAmount += curr.grossAmount;
        acc.totalFees += curr.totalFees;
        acc.netAmount += curr.netAmount;
        return acc;
      },
      {
        salesCount: 0,
        salesTotal: 0,
        refundTotal: 0,
        chargebackTotal: 0,
        grossAmount: 0,
        totalFees: 0,
        netAmount: 0,
      }
    );
  }, [filteredData]);

  return (
    <div className="flex flex-col gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Funding Reports"} />
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
                <th className="px-6 py-3 w-[40px]">Deposit Date</th>
                <th className="px-6 py-3">Sales Count</th>
                <th className="px-6 py-3">Sales Total</th>
                <th className="px-6 py-3">Refund Count</th>
                <th className="px-6 py-3">Refund Total</th>
                <th className="px-6 py-3">Chargeback Count</th>
                <th className="px-6 py-3 ">Chargeback Total</th>
                <th className="px-6 py-3 ">Gross Amount</th>
                <th className="px-6 py-3">Total Fees</th>
                <th className="px-6 py-3">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 text-gray-800">
                      {item.depositDate}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {item.salesCount}
                    </td>
                    <td className="px-6 py-4">${item.salesTotal.toFixed(2)}</td>
                    <td className="px-6 py-4">{item.refundCount}</td>
                    <td className="px-6 py-4">
                      ${item.refundTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{item.chargebackCount}</td>
                    <td className="px-6 py-4">
                      ${item.chargebackTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      ${item.grossAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-red-600">
                      ${item.totalFees.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-green-600">
                      ${item.netAmount.toFixed(2)}
                    </td>
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

              {/* Totals row */}
              <tr className="bg-gray-50 font-semibold border-t-2">
                <td className="px-6 py-2">Totals</td>
                <td className="px-6 py-2">{totals.salesCount}</td>
                <td className="px-6 py-2">${totals.salesTotal.toFixed(2)}</td>
                <td className="px-6 py-2">0</td>
                <td className="px-6 py-2">${totals.refundTotal.toFixed(2)}</td>
                <td className="px-6 py-2">0</td>
                <td className="px-6 py-2">
                  ${totals.chargebackTotal.toFixed(2)}
                </td>
                <td className="px-6 py-2">${totals.grossAmount.toFixed(2)}</td>
                <td className="px-6 py-2 text-red-600">
                  ${totals.totalFees.toFixed(2)}
                </td>
                <td className="px-6 py-2 text-green-600">
                  ${totals.netAmount.toFixed(2)}
                </td>
              </tr>
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
