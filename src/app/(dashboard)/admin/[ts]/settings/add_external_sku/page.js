"use client";
import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import { FormInput } from "lucide-react";
import { useForm } from "react-hook-form";

const Page = () => {
  const form = useForm();

  const { reset } = form;

  const onSubmit = (data) => {
    console.log(data)
  };
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title="Add Course Type" />

      <div className="px-1.5 py-3 min-[374px]:p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-3 lg:gap-6">
            <FormInput
              name="course_name"
              label="Course Name"
              placeholder="Course name here"
            />
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
