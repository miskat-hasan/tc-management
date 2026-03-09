"use client";

import TableSkeleton from "@/components/common/TableSkelation";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { Button } from "@/components/ui/button";
import {
  deleteSingleExternalSKU,
  getAllExternalSKU,
  storeExternalSKU,
} from "@/hooks/api/dashboardApi";
import { PlusIcon } from "@/svg/SvgContainer";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";

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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const queryClient = useQueryClient();

  const [selectedExternal, setSelectedExternal] =
    useState("American Red Cross");
  const [tableData, setTableData] = useState([]);

  // store external sku mutation
  const {
    mutate: storeExternalSkuMutation,
    isPending: storeExternalSkuPending,
  } = storeExternalSKU();

  // get External SKU data
  const { data: externalSkuData, isLoading: externalSkuDataLoading } =
    getAllExternalSKU();

  // update table when dropdown value changes
  useEffect(() => {
    setTableData(allData[selectedExternal] || []);
  }, [selectedExternal]);

  const handleSelectChange = (val) => {
    setSelectedExternal(val);
  };

  // delete mutation
  const {
    mutate: deleteExternalSKUMutation,
    isPending: deleteExternalSKUPending,
  } = deleteSingleExternalSKU();

  const handleDeleteExternalSKU = (id) => {
    deleteExternalSKUMutation(
      {
        endpoint: `/api/external_sku/delete?id=${id}`,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries("get-all-external-sku");
          Swal.fire({
            text: data?.message,
            icon: "success",
          });
        },
        onError: (err) => {
          Swal.fire({
            text: err?.response?.data?.message,
            icon: "error",
          });
        },
      },
    );
  };

  return (
    <div className="space-y-3 lg:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">External SKU</h2>
        <Button asChild={true}>
          <Link href={"add_external_sku"}>
            Add External SKU
            <PlusIcon />
          </Link>
        </Button>
      </div>

      <CustomSelect
        id="externalskill"
        placeholder="Select External Sku"
        options={[
          { id: "American Red Cross", name: "American Red Cross" },
          {
            id: "National Safety Council",
            name: "National Safety Council",
          },
        ]}
        value={selectedExternal}
        onChange={handleSelectChange}
      />
      {/* Table */}
      <div className="p-[13px] lg:p-[26px]  bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        {externalSkuDataLoading ? (
          <TableSkeleton />
        ) : (
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
                {externalSkuData?.data?.data?.length > 0 ? (
                  externalSkuData?.data?.data?.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-t hover:bg-gray-50 transition-all"
                    >
                      <td className="p-3 whitespace-nowrap">{item?.date}</td>
                      <td className="p-3 whitespace-nowrap">{item?.name}</td>
                      <td className="p-3 whitespace-nowrap">{item?.code}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDeleteExternalSKU(item?.id)}
                          className={`p-2 bg-gray-100 rounded-lg hover:bg-red-300 transition ${deleteExternalSKUPending ? "cursor-not-allowed" : "cursor-pointer"}`}
                          disabled={deleteExternalSKUPending}
                        >
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
        )}
        {/* Footer controls */}
        <div className="flex flex-col md:flex-row items-center justify-end mt-3 lg:mt-6 gap-3">
          {/* Show per page */}
          {/* <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Show:</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div> */}

          {/* Pagination */}
          <div className="flex items-center gap-2">
            {externalSkuData?.data?.links?.map((link, index) => (
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

export default ExternalSkillsPage;
