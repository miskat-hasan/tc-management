"use client";
import SectionTitle from "@/components/common/SectionTitle";
import TableSkeleton from "@/components/common/TableSkelation";

import { Button } from "@/components/ui/button";
import {
  deleteSingleCertificationFile,
  downloadCertificationFile,
  getAllCertificationFile,
} from "@/hooks/api/dashboardApi";
import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";

const Page = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const router = useRouter();

  // get all certification file
  const {
    data: certificationFileData,
    isLoading: certificationFileDataLoading,
  } = getAllCertificationFile(page, perPage);

  // delete a single certification file
  const {
    mutate: deleteCertificationFileMutation,
    isPending: deleteCertificationFilePending,
  } = deleteSingleCertificationFile(selectedFileId);

  const queryClient = useQueryClient();
  // delete a single certification file
  const handleDeleteCertificationFile = (id) => {
    setSelectedFileId(id);

    deleteCertificationFileMutation(id, {
      onSuccess: (data) => {
        setSelectedFileId(null);
        queryClient.invalidateQueries("get-all-certification-file");
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
    });
  };

  // download certification api
  const {
    mutate: downloadCertificationFileMutation,
    isPending: downloadCertificationFilePending,
  } = downloadCertificationFile();

  const handleDownloadCertificationFile = (id) => {
    downloadCertificationFileMutation(
      { id },
      {
        onSuccess: (blob) => {
          const file = new Blob([blob], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          console.log(file);
          const url = window.URL.createObjectURL(file);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `certificate.docx`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-[12.5px] lg:gap-[25px]">
      {/* Header */}
      <div className="flex justify-between">
        <SectionTitle title={"Certificates"} />
        <Button
          onClick={()=> router.push("upload_certificate")}
          className="py-[11px] lg:py-[22px] cursor-pointer bg-brown flex items-center gap-2"
        >
          Upload Certificate
        </Button>
      </div>

      {/* Table */}
      <div className="p-[11px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[12px] lg:gap-[24px]">
        {certificationFileDataLoading ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 text-black capitalize text-[16px] md:text-[20px] font-semibold">
                <tr>
                  <th className="px-3 md:px-6 py-3 whitespace-nowrap">Name</th>
                  <th className="px-3 md:px-6 py-3 text-right whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {certificationFileData?.data?.length > 0 ? (
                  certificationFileData?.data?.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-3 md:px-6 py-4 text-gray-800 whitespace-nowrap">
                        {item.file}
                      </td>

                      <td className="px-3 md:px-6 py-4 flex gap-2.5 justify-end">
                        <button
                          onClick={() =>
                            handleDownloadCertificationFile(item?.id)
                          }
                          className="p-2 cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                        >
                          <HiOutlineDownload className="text-gray-600 text-[16px]" />
                        </button>
                        <button
                          onClick={() => handleDeleteCertificationFile(item.id)}
                          className="p-2 bg-gray-100 cursor-pointer rounded-lg hover:bg-red-300 transition"
                        >
                          <HiOutlineTrash className="text-gray-600 text-[16px]" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No results found
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
            {certificationFileData?.data?.links?.map((link, index) => (
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
