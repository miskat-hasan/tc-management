import SectionTitle from "@/components/common/SectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/svg/SvgContainer";

import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex justify-between">
        <SectionTitle title={"Upcoming Classes"} />
        <div className="flex items-center gap-2 text-[#8C8C8C]">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 bg-transparent  accent-[#8C8C8C]"
          />
          <label className="text-[12px]">Hide Empty Classes</label>
        </div>
      </div>
      {/* search select section */}
      <div className="px-[32px] py-[32px] bg-white  rounded-[16px] flex gap-[24px] ">
        <CustomSelect
          id="dates"
          label="Dates"
          placeholder="All dates"
          options={[
            { value: "today", label: "Today" },
            { value: "yesterday", label: "Yesterday" },
            { value: "last7days", label: "Last 7 days" },
          ]}
          className="!flex-1"
        />
        <CustomSelect
          id="Courses"
          label="Courses"
          placeholder="All courses"
          options={[
            { value: "anatomy_basics", label: "Anatomy Basics" },
            { value: "physiology_intro", label: "Introduction to Physiology" },
            {
              value: "pharmacology_fundamentals",
              label: "Pharmacology Fundamentals",
            },
            { value: "clinical_skills", label: "Clinical Skills Training" },
            { value: "pathology_overview", label: "Pathology Overview" },
            { value: "medical_imaging", label: "Medical Imaging Techniques" },
            {
              value: "emergency_medicine",
              label: "Emergency Medicine Essentials",
            },
            { value: "microbiology", label: "Medical Microbiology" },
            {
              value: "nutrition_and_dietetics",
              label: "Nutrition and Dietetics",
            },
            { value: "pediatrics_intro", label: "Introduction to Pediatrics" },
          ]}
          className="flex-1"
        />
        <CustomSelect
          id="Instructor"
          label="Instructor"
          placeholder="All instructor"
          options={[
            { value: "alice_johnson", label: "Alice Johnson" },
            { value: "bob_smith", label: "Bob Smith" },
            { value: "clara_williams", label: "Clara Williams" },
            { value: "david_lee", label: "David Lee" },
            { value: "eva_brown", label: "Eva Brown" },
          ]}
          className="flex-1"
        />
        <CustomSelect
          id="Location"
          label="Location"
          placeholder="All locations"
          options={[
            { value: "downtown_campus", label: "Downtown Campus" },
            { value: "tech_park", label: "Tech Park" },
            { value: "northside_center", label: "Northside Center" },
            { value: "west_end_campus", label: "West End Campus" },
          ]}
          className="flex-1"
        />
        <div className="flex justify-end items-end ">
          <Button
            className={"py-[24px] cursor-pointer bg-brown flex items-center"}
          >
            <SearchIcon />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
