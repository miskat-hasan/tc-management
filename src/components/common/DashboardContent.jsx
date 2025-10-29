"use client";
import React from "react";
import DashboardTopbar from "../dashboard/DashboardTopbar";
import { usePathname } from "next/navigation";

const DashboardContent = ({ content }) => {
  const pathname = usePathname();
  return (
    <div
      className={`grow px-[12px] py-[11.5px]  lg:px-[24px] lg:py-[22.5px] flex flex-col
      gap-[15px] lg:gap-[34px] ${
        pathname === "/admin/settings/file_manager"
          ? ""
          : "h-screen overflow-y-auto"
      }`}
    >
      <DashboardTopbar />
      {content}
    </div>
  );
};

export default DashboardContent;
