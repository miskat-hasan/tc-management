import { InfoIcon } from "@/svg/SvgContainer";
import React from "react";

const NotFound = ({ title }) => {
  return (
    <div className="p-[8px] lg:p-[24px] bg-[#FFF3F3] border border-brown w-full rounded-[10px] flex items-center gap-[5px] lg:gap-[10px] font-medium">
      <div className="shrink-0">
        <InfoIcon />
      </div>
      <p className="text-[12px] lg:text-[18px] text-brown">
        {title || "No Records Found"}
      </p>
    </div>
  );
};

export default NotFound;
