import Link from "next/link";
import React from "react";
import { ArrowIcon } from "@/svg/SvgContainer";
import SubSectionTitle from "../common/SubSectionTitle";

const InfoCard = ({ icon, title, linkText, linkHref, className = "" }) => {
  return (
    <div
      className={`h-[136px] w-[384px] p-[20px] bg-white rounded-[20px] flex flex-col justify-between ${className}`}
    >
      <div className="flex gap-[20px] items-center">
        <div
          className={`w-[45px] h-[45px] bg-[linear-gradient(180deg,_#FF9A9A_0%,_#B70000_100%)]  rounded-full flex items-center justify-center`}
        >
          {icon}
        </div>

        <SubSectionTitle className={"text-[20px]"} subtitle={title} />
      </div>

      <Link
        className="flex items-center justify-between text-gray-500"
        href={linkHref}
      >
        {linkText} <ArrowIcon />
      </Link>
    </div>
  );
};

export default InfoCard;
