import SectionTitle from "@/components/common/SectionTitle";

import InfoCard from "@/components/dashboard/InfoCard";
import { SalesDashboard } from "@/components/dashboard/SalesDashboard";
import { overviewData } from "@/data/data";
import { CardIcon, DollarIcon } from "@/svg/SvgContainer";

import React from "react";

const page = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <SectionTitle title={"Shortcuts"} />
        {/* <div className="w-[384px] h-[136px] p-[20px] bg-white rounded-[20px] flex flex-col justify-between">
          <div className="flex gap-[20px] items-center">
            <div className="w-[45px] h-[45px] bg-[linear-gradient(180deg,_#FF9A9A_0%,_#B70000_100%)] rounded-full flex items-center justify-center">
              <DollarIcon />
            </div>
            <SubSectionTitle
              className={"text-[20px]"}
              subtitle={"Recent Funding Activity"}
            />
          </div>
          <Link
            className="flex items-center justify-between text-gray-500"
            href={""}
          >
            View Report <ArrowIcon />
          </Link>
        </div> */}

        <div className="flex gap-[30px]">
          <InfoCard
            icon={<DollarIcon />}
            title="Recent Funding Activity"
            linkText="View Report"
            linkHref="/reports/funding"
          />
          <InfoCard
            icon={<CardIcon />}
            title="Recent Transactions"
            linkText="View Report"
            linkHref="/reports/funding"
          />
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex grow flex-col gap-5">
          <SectionTitle title={"Daily Volumes"} />
          <SalesDashboard />
        </div>
        <div className="flex w-[500px] flex-col gap-5">
          <SectionTitle title={"Overview"} />
          <div className="w-full h-[450px] bg-white rounded-[20px] p-[20px] flex flex-col gap-[20px]">
            {overviewData?.map((data, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="text-[12px] font-bold">{data?.label}</p>
                <span className="text-[#969688] text-[12px]">
                  {data?.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
