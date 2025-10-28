"use client";
import { NotificationIcon } from "@/svg/SvgContainer";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import MobileSidebar from "../common/MobileSidebar";

const DashboardTopbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative flex justify-between xl:justify-end items-center">
      <button onClick={handleSidebar} className="xl:hidden block z-50 relative">
        <CgMenuLeft className="text-3xl hover:text-brown cursor-pointer" />
      </button>

      {/* Right-side icons */}
      <div className="flex items-center gap-2.5">
        <Link
          href={"/admin/notifications"}
          className="w-[60px] h-[60px] bg-white rounded-[14px] flex items-center justify-center"
        >
          <NotificationIcon />
        </Link>

        <Link
          href={"/admin/manage_profile"}
          className="h-[60px] bg-white rounded-[14px] flex p-1 w-auto gap-[11px]"
        >
          <div className="w-[50px] h-[50px] overflow-hidden rounded-[11px]">
            <Image
              src="/user_pic.jpg"
              width={64}
              height={64}
              alt="User picture"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col pr-[12px]">
            <h6 className="text-xl font-medium">Nathan</h6>
            <p className="text-[12px] text-[#8C8C8C]">Client ID: 882</p>
          </div>
        </Link>
      </div>

      {/* Mobile Sidebar */}

      <MobileSidebar isSidebarOpen={isSidebarOpen} onClose={handleSidebar} />
      {isSidebarOpen && (
        <>
          <div
            onClick={handleSidebar}
            className="fixed inset-0 bg-black/20 z-40 xl:hidden"
          ></div>
        </>
      )}
    </div>
  );
};

export default DashboardTopbar;
