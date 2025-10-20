import { NotificationIcon } from "@/svg/SvgContainer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiSearch } from "react-icons/fi";

const DashboardTopbar = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="relative w-full max-w-[742px] flex items-center">
        <FiSearch className="absolute left-5 text-[20px] text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="h-[60px] w-full bg-white rounded-[14px] pl-[50px] pr-4  focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          href={"#"}
          className="w-[60px] h-[60px] bg-white rounded-[14px] flex items-center justify-center "
        >
          <NotificationIcon />
        </Link>
        <Link
          href={"/admin/manage_profile"}
          className="h-[60px] bg-white rounded-[14px] flex p-1 w-auto gap-[11px] "
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
          <div className="flex flex-col pr-[12px] ">
            <h6 className="text-xl font-medium">Nathan</h6>
            <p className="text-[12px] text-[#8C8C8C]">Client ID: 882</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardTopbar;
