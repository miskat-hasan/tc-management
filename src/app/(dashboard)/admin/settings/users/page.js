"use client";

import CustomSelect from "@/components/shared/form/CustomSelect";
import { Check, Download, FileText, Plus } from "lucide-react";
import React, { useState, useMemo } from "react";

const dummyUsers = [
  {
    id: "1",
    name: "Abdul-Majied, Aishah",
    email: "nurse2jdmc@gmail.com",
    active: true,
    username: "Aishah Abdul-Majied",
    trainingSite: { name: "AHA SHELL CPR, LLC", phone: "815-230-7991" },
    isAdmin: false,
    lastActivity: "09/17/2025",
  },
  {
    id: "2",
    name: "Almusa, Hamza",
    email: "halmusa@gmail.com",
    active: true,
    username: "Hamza Almusa",
    trainingSite: { name: "AHA SHELL CPR, LLC", phone: "815-230-7991" },
    isAdmin: false,
    lastActivity: "09/22/2025",
  },
  {
    id: "3",
    name: "Baker, James",
    email: "bakej025@icloud.com",
    active: false,
    username: "bakej025@icloud.com",
    trainingSite: { name: "Training Site 2", phone: "222-222-2222" },
    isAdmin: false,
    lastActivity: "07/17/2024",
  },
  {
    id: "4",
    name: "Blair 2024, James",
    email: "blairj@mmpl-us.com",
    active: true,
    username: "James F. Blair",
    trainingSite: { name: "Training Site 1", phone: "111-111-1111" },
    isAdmin: false,
    lastActivity: "09/02/2025",
  },
  {
    id: "5",
    name: "Bono, Jennifer",
    email: "bono.j@rhodes.edu",
    active: false,
    username: "Jennifer Bone",
    trainingSite: { name: "AHA SHELL CPR, LLC", phone: "815-230-7991" },
    isAdmin: false,
    lastActivity: "09/22/2025",
  },
  {
    id: "6",
    name: "Borja, Michael",
    email: "mborja@jsd.gmail.com",
    active: true,
    username: "Michael Borja",
    trainingSite: { name: "Training Site 2", phone: "222-222-2222" },
    isAdmin: false,
    lastActivity: "09/22/2025",
  },
];

const UserManager = () => {
  const [trainingFilter, setTrainingFilter] = useState("all site");
  const [showInactive, setShowInactive] = useState(false);
  const [selectedShow, setSelectedShow] = useState(50);

  const filteredUsers = useMemo(() => {
    return dummyUsers.filter((user) => {
      const matchTraining =
        trainingFilter === "all site" ||
        user.trainingSite.name.toLowerCase() === trainingFilter.toLowerCase();

      const matchActive = showInactive ? true : user.active;

      return matchTraining && matchActive;
    });
  }, [trainingFilter, showInactive]);

  return (
    <div className="w-full mx-auto p-6  bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2.5">
            <label className="block text-sm text-black font-semibold mb-1">
              Training Site
            </label>
            <CustomSelect
              id="training_site"
              placeholder="Select Training Site"
              options={[
                { value: "all site", label: "All Sites" },
                { value: "AHA SHELL CPR, LLC", label: "AHA SHELL CPR, LLC" },
                { value: "Training Site 1", label: "Training Site 1" },
                { value: "Training Site 2", label: "Training Site 2" },
              ]}
              onChange={(val) => setTrainingFilter(val || "all site")}
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="show-inactive"
              type="checkbox"
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-brown focus:ring-brown"
            />
            <label htmlFor="show-inactive" className="text-sm text-gray-600">
              Show Inactive Users
            </label>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <button className="p-2.5 border border-brown rounded-md text-brown hover:bg-red-50 transition-colors cursor-pointer">
            <Download size={20} />
          </button>
          <button className="flex items-center gap-2 py-2.5 px-4 bg-brown text-white font-semibold rounded-md hover:bg-brown transition-colors cursor-pointer">
            <Plus size={20} />
            Add User
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                Active
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                Username
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                Training Site
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                Admin
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                Last Activity
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="font-semibold text-sm text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {user.active && (
                    <Check size={20} className="text-green-600" />
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {user.username}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.trainingSite.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user.trainingSite.phone}
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {user.isAdmin ? "Yes" : "--"}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {user.lastActivity}
                </td>
                <td className="py-4 px-4">
                  <button className="text-gray-400 cursor-pointer hover:text-gray-600 p-1">
                    <FileText size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 text-center text-gray-500 text-sm"
                >
                  No users found for the selected filters.
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
  );
};

export default UserManager;
