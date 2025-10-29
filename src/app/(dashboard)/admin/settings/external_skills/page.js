"use client";
import CustomSelect from "@/components/shared/form/CustomSelect";
import React, { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";

const allData = {
  "American Red Cross": [
    {
      date: "9/29/2025 8:05:23 PM",
      name: "Redcross Basic Life Support",
      code: "AP-HSSBSL101-r:21",
    },
    {
      date: "9/8/2025 8:40:20 PM",
      name: "Blended Learning Adult First Aid/CPR/AED Online Session",
      code: "AP-HSSSFA514-BL-r:21",
    },
  ],
  "National Safety Council": [
    {
      date: "9/18/2025 10:30:00 PM",
      name: "First Aid & CPR NSC",
      code: "NSC-CPR101",
    },
    {
      date: "9/12/2025 5:45:00 PM",
      name: "Workplace Safety Training",
      code: "NSC-WST201",
    },
  ],
};

const ExternalSkillsPage = () => {
  const [selectedExternal, setSelectedExternal] =
    useState("American Red Cross");
  const [tableData, setTableData] = useState([]);

  // update table when dropdown value changes
  useEffect(() => {
    setTableData(allData[selectedExternal] || []);
  }, [selectedExternal]);

  const handleSelectChange = (val) => {
    setSelectedExternal(val);
  };

  return (
    <div className="space-y-3 lg:space-y-6">
      <h2 className="text-lg font-semibold">External SKU</h2>

      <CustomSelect
        id="externalskill"
        placeholder="Select External Skills"
        options={[
          { value: "American Red Cross", label: "American Red Cross" },
          {
            value: "National Safety Council",
            label: "National Safety Council",
          },
        ]}
        value={selectedExternal}
        onChange={handleSelectChange}
      />

      <div className="overflow-x-auto bg-white border rounded-lg">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-gray-50 text-sm font-semibold text-gray-900">
            <tr>
              <th className="p-3 whitespace-nowrap">Create Date</th>
              <th className="p-3 whitespace-nowrap">Name</th>
              <th className="p-3 whitespace-nowrap">Code</th>
              <th className="p-3 whitespace-nowrap text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="p-3 whitespace-nowrap">{item.date}</td>
                  <td className="p-3 whitespace-nowrap">{item.name}</td>
                  <td className="p-3 whitespace-nowrap">{item.code}</td>
                  <td className="p-3 text-center">
                    <button className="p-2 bg-gray-100 cursor-pointer rounded-lg hover:bg-red-300 transition">
                      <HiOutlineTrash className="text-gray-600 text-[16px]" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExternalSkillsPage;
