import SectionTitle from "@/components/common/SectionTitle";
import { InfoIcon } from "@/svg/SvgContainer";
import React from "react";

const page = () => {
  return (
    <section className="w-full flex flex-col gap-[25px]">
      <SectionTitle title={"Instructor Bidding"} />

      <div className="px-[24px] py-[24px] bg-white rounded-[16px] flex gap-[24px] w-full">
        <div className="p-[24px] bg-[#FFF3F3] border border-brown w-full rounded-[10px] flex items-center gap-[10px] font-medium">
          <InfoIcon />
          <p className="text-[18px] text-brown">
            No classes are current open for bidding
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
