"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import CustomSelect from "@/components/shared/form/CustomSelect";
import {
  getAllDiscipline,
  getSingleCertification,
  updateCertification,
} from "@/hooks/api/dashboardApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const router = useRouter();
  const { data: singleCertification, isLoading: loadingSingleCertification } =
    getSingleCertification(params?.id);

  const form = useForm({
    defaultValues: {
      discipline: Number(singleCertification?.data?.discipline_id),
      initial: singleCertification?.data?.initial,
      expires: singleCertification?.data?.expires,
    },
  });

  const { reset, control } = form;

  const { data: allDiscipline, isLoading: loadingDiscipline } =
    getAllDiscipline();

  useEffect(() => {
    if (singleCertification && allDiscipline) {
      reset({
        discipline: Number(singleCertification?.data?.discipline_id),
        initial: singleCertification?.data?.initial,
        expires: singleCertification?.data?.expires,
      });
    }
  }, [reset, singleCertification, allDiscipline]);

  const { mutateAsync, isPending } = updateCertification();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("discipline_id", data?.discipline);
    formData.append("initial", data?.initial);
    formData.append("expires", data?.expires);
    formData.append("id", singleCertification?.data?.id);

    await mutateAsync(formData, {
      onSuccess: (data) => {
        Swal.fire({
          text: data?.message,
          icon: "success",
        });
      },
      onError: (err) => {
        Swal.fire({
          text: err?.response?.data?.message,
          icon: "error",
        });
      },
    });
  };

  return (
    <section className="flex flex-col gap-2 lg:gap-4">
      {/* Title */}
      <SectionTitle title="Edit Certification" />

      {loadingSingleCertification ? (
        <div className="bg-white rounded-[14px] p-4 lg:p-8 shadow-sm animate-pulse">
          <div className="space-y-6">
            {/* Discipline Select Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-100 rounded-md"></div>
            </div>

            {/* Date Inputs Skeleton */}
            <div className="flex gap-6">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-100 rounded-md"></div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-100 rounded-md"></div>
              </div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex justify-end gap-4 mt-10">
              <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
              <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* White Form Card */}
          <div className="bg-white rounded-[14px] p-4 lg:p-8 shadow-sm">
            <FormContainer form={form} onSubmit={onSubmit}>
              {/* Grid Layout */}
              <div className="space-y-2.5 lg:space-y-5">
                <Controller
                  name="discipline"
                  control={control}
                  rules={{ required: "Discipline is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      id="Discipline"
                      label="Discipline"
                      isLoading={loadingDiscipline}
                      placeholder="Chose Discipline"
                      options={allDiscipline?.data?.data}
                      className="flex-1"
                    />
                  )}
                />
                <div className="flex gap-6">
                  <FormInput name="initial" label="Initial Date" type="date" />
                  <FormInput name="expires" label="Expires Date" type="date" />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 lg:gap-4 mt-5 lg:mt-10">
                <Button
                  onClick={() => router.back()}
                  className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover"
                  disabled={isPending}
                >
                  {isPending ? "Saving ..." : "Save Changes"}
                </Button>
              </div>
            </FormContainer>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
