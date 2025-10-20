import { InfoIcon } from "@/svg/SvgContainer";
import React from "react";

const NotFound = ({ title }) => {
  return (
    <div className="p-[24px] bg-[#FFF3F3] border border-brown w-full rounded-[10px] flex items-center gap-[10px] font-medium">
      <InfoIcon />
      <p className="text-[18px] text-brown">{title || "No Records Found"}</p>
    </div>
  );
};

export default NotFound;
