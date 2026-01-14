"use client";

import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { getAllDiscipline, storeCertification } from "@/hooks/api/dashboardApi";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const NewCertification = ({ instructorId }) => {
  const form = useForm({
    defaultValues: {
      initial: "",
      expires: "",
    },
  });

  const { control, reset } = form;

  const { data: allDiscipline, isLoading: loadingDiscipline } =
    getAllDiscipline();

  const { mutateAsync, isPending } = storeCertification();
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("discipline_id", data?.discipline);
    formData.append("instructor_id", instructorId);
    formData.append("initial", data?.initial);
    formData.append("expires", data?.expires);

    await mutateAsync(formData, {
      onSuccess: (data) => {
        Swal.fire({
          text: data?.message,
          icon: "success",
        });
        reset();
        queryClient.invalidateQueries({
          queryKey: ["get-all-certification"],
          exact: true,
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
      <SectionTitle title="Add Certification" />

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
                  options={allDiscipline?.data}
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
              onClick={() => reset()}
              className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
            >
              Cancel
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
    </section>
  );
};

export default NewCertification;
