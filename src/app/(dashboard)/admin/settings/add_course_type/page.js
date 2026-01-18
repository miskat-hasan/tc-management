"use client";

import SectionTitle from "@/components/common/SectionTitle";
import CustomSelect from "@/components/shared/form/CustomSelect";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import FormTextarea from "@/components/shared/form/FormTextarea";
import { Button } from "@/components/ui/button";
import {
  getAllCardType,
  getAllDiscipline,
  getAllKeyCodeBank,
  getAllProductAddOns,
  getCourseImage,
  getSecondCardType,
  storeCourse,
} from "@/hooks/api/dashboardApi";
import { LucideTrash2, X } from "lucide-react";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const RichTextEditor = dynamic(() => import("@/components/shared/RichEditor"), {
  ssr: false,
});

const Page = () => {
  const descriptionRef = useRef(null);
  const emailBodyRef = useRef(null);

  const form = useForm({
    defaultValues: {
      course_name: "",
      mode: "",
      discipline: "",
      deposit_registration: false,
      multiple_pricing: false,
      deposit_amounts: "",
      price: "",
      price_level_prompt: "",
      addonPrompt: "",
      add_ons: [],
      shipping_price: "",
      keycode_bank: "",
      course_certifying_body: "",
      courseSKUs: "",
      cardType: "",
      secondCardType: "",
      course_image: "",
      prompt_certification: false,
      include_instructor_ratio: false,
      include_manikin_ratio: false,
      include_electronic_signature: false,
      use_certificate_number: false,
      show_seats_remaining: false,
      allow_will_call: false,
      prompt_license_number: false,
      require_license_number: false,
      allow_alternate_datetime: false,
      enable_waitlist: false,
      enable_roster_expirations: false,
      automatic_waitlist: false,
      ceu_credits: "",
      courseConfirmationEmailCCS: "",
      courseConfirmationEmailSubject: "",
      payloadConfirmationEmailSubject: "",
      use_email_for_payments: false,
      enable_seo: false,
      seoDescription: "",
      priceLevel: [
        {
          price: "",
          code: "",
          description: "",
        },
        {
          price: "",
          code: "",
          description: "",
        },
      ],
    },
  });

  const {
    register,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = form;

  const watchFields = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceLevel",
  });

  const { mutate: storeCourseMutation, isPending: storeCoursePending } =
    storeCourse();

  const { data: disciplineData, isLoading: disciplineLoading } =
    getAllDiscipline();

  const { data: addOnsData, isLoading: addOnsDataLoading } =
    getAllProductAddOns();

  const { data: keyCodeBank, isLoading: keyCodeBankLoading } =
    getAllKeyCodeBank();

  const { data: cardTypeData, isLoading: cardTypeDataLoading } =
    getAllCardType();

  const { data: secondCardTypeData, isLoading: secondCardTypeDataLoading } =
    getSecondCardType();

  const { data: courseImageData, isLoading: courseImageDataLoading } =
    getCourseImage();

  const imagePreview = courseImageData?.data?.data?.find(
    (item) => Number(item?.id) === Number(watchFields?.course_image),
  );

  const handleAddPriceLevel = () => {
    append({
      price: "",
      code: "",
      description: "",
    });
  };

  const handleRemovePriceLevel = (index) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  const handleAddAddOns = (value) => {
    const addOnsId = typeof value === "object" ? value?.id : value;
    const numericId = Number(addOnsId);

    if (numericId && !watchFields?.add_ons?.includes(numericId)) {
      setValue("add_ons", [...(watchFields?.add_ons || []), numericId]);
    }
  };

  const handleRemoveAddOns = (addOnsId) => {
    const numericId = Number(addOnsId);
    setValue(
      "add_ons",
      watchFields?.add_ons?.filter((id) => Number(id) !== numericId),
    );
  };

  const availableAddOns = addOnsData?.data?.data?.filter(
    (item) => !watchFields?.add_ons?.includes(Number(item.id)),
  );

  const onSubmit = (data) => {
    const description = descriptionRef.current?.getContent();
    const emailBody = emailBodyRef.current?.getContent();

    const formData = new FormData();

    // Basic Info
    formData.append("course_name", data?.course_name || "");
    formData.append("mode", data?.mode || "");
    formData.append("discipline", data?.discipline || "");

    // Price Options
    formData.append("deposit_registration", data?.deposit_registration ? 1 : 0);
    formData.append("multiple_pricing", data?.multiple_pricing ? 1 : 0);

    if (data?.deposit_registration) {
      formData.append("allow_deposit", data?.deposit_amounts || "");
    }

    // Price or Price Levels
    if (data?.multiple_pricing) {
      formData.append("price_level_prompt", data?.price_level_prompt || "");
      data?.priceLevel?.forEach((level, index) => {
        formData.append(`price_levels[${index}][price]`, level.price || "");
        formData.append(`price_levels[${index}][code]`, level.code || "");
        formData.append(
          `price_levels[${index}][description]`,
          level.description || "",
        );
      });
    } else {
      formData.append("price", data?.price || "");
    }

    // Add-ons
    formData.append("prompt", data?.addonPrompt || "");
    data?.add_ons?.forEach((id) => {
      formData.append("add_ons[]", id);
    });

    // Other fields
    formData.append("shipping_price", data?.shipping_price || "");
    formData.append("keycode_bank_id", data?.keycode_bank || "");
    formData.append(
      "course_certifying_body",
      data?.course_certifying_body || "",
    );

    if (data?.course_certifying_body === "American Red Cross") {
      formData.append("course_skus", data?.courseSKUs || "");
    }

    if (data?.course_certifying_body === "American Heart Association") {
      formData.append("card_type_id", data?.cardType || "");
      formData.append("second_card_type_id", data?.secondCardType || "");
    }

    formData.append("course_image_id", data?.course_image || "");

    // Options checkboxes
    formData.append("prompt_certification", data?.prompt_certification ? 1 : 0);
    formData.append(
      "include_instructor_ratio",
      data?.include_instructor_ratio ? 1 : 0,
    );
    formData.append(
      "include_manikin_ratio",
      data?.include_manikin_ratio ? 1 : 0,
    );
    formData.append(
      "include_electronic_signature",
      data?.include_electronic_signature ? 1 : 0,
    );
    formData.append(
      "use_certificate_number",
      data?.use_certificate_number ? 1 : 0,
    );
    formData.append("show_seats_remaining", data?.show_seats_remaining ? 1 : 0);
    formData.append("allow_will_call", data?.allow_will_call ? 1 : 0);
    formData.append(
      "prompt_license_number",
      data?.prompt_license_number ? 1 : 0,
    );
    formData.append(
      "require_license_number",
      data?.require_license_number ? 1 : 0,
    );
    formData.append(
      "allow_alternate_datetime",
      data?.allow_alternate_datetime ? 1 : 0,
    );
    formData.append("enable_waitlist", data?.enable_waitlist ? 1 : 0);
    formData.append(
      "enable_roster_expirations",
      data?.enable_roster_expirations ? 1 : 0,
    );
    formData.append("will_call_prompt", data?.will_call_prompt || "");

    formData.append("automatic_waitlist", data?.automatic_waitlist ? 1 : 0);

    // CEU Credits
    formData.append("ceu_credits", data?.ceu_credits || "");

    // Rich Text Editors
    formData.append("description", description || "");
    formData.append("email_body", emailBody || "");

    // Email Settings
    formData.append(
      "confirmation_email_ccs",
      data?.courseConfirmationEmailCCS || "",
    );
    formData.append(
      "confirmation_email_subject",
      data?.courseConfirmationEmailSubject || "",
    );
    formData.append(
      "payment_confirmation_email_subject",
      data?.payloadConfirmationEmailSubject || "",
    );
    formData.append(
      "use_email_for_payments",
      data?.use_email_for_payments ? 1 : 0,
    );
    formData.append("calendar_icon_color", data?.calendar_icon_color);

    // SEO
    formData.append("seo_rich_results", data?.enable_seo ? 1 : 0);
    if (data?.enable_seo) {
      formData.append("seo_description", data?.seoDescription || "");
    }

    storeCourseMutation(formData, {
      onSuccess: (data) => {
        reset();
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
    <section className="flex flex-col gap-4">
      <SectionTitle title={"Add / Edit Course Type"} />
      <div className="p-[13px] lg:p-[26px] bg-white rounded-[14px] flex flex-col gap-[24px]">
        <FormContainer form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-3 lg:gap-6">
            <FormInput
              name="course_name"
              label="Course Name"
              placeholder="Course name here"
            />

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Mode</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    value="on-site"
                    {...register("mode")}
                    className="accent-brown"
                  />
                  On-site: The course is taught in person at a physical
                  location.
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    value="blended"
                    {...register("mode")}
                    className="accent-brown"
                  />
                  Blended: The course has both online and in-person components.
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    value="online"
                    {...register("mode")}
                    className="accent-brown"
                  />
                  Online: All class instruction, assignments, and tests are
                  asynchronous and can be completed virtually.
                </label>
              </div>
            </div>

            <Controller
              name="discipline"
              control={control}
              rules={{ required: "Discipline is required" }}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  id={"discipline"}
                  label="Discipline"
                  placeholder="Select Discipline"
                  isLoading={disciplineLoading}
                  options={disciplineData?.data?.data}
                  error={errors?.discipline?.message}
                />
              )}
            />

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">
                Price Options
              </p>
              <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                <input
                  {...register("deposit_registration")}
                  type="checkbox"
                  className="accent-brown"
                />
                Allow registrations with a deposit
              </label>
              <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                <input
                  {...register("multiple_pricing")}
                  type="checkbox"
                  className="accent-brown"
                />
                Allow multiple pricing levels
              </label>
            </div>

            {watchFields?.deposit_registration && (
              <FormInput
                name="deposit_amounts"
                label="Deposit Amount"
                placeholder="$0.00"
              />
            )}

            {watchFields?.multiple_pricing ? (
              <div>
                <FormTextarea
                  name="price_level_prompt"
                  label="Price Level Prompt"
                  rows={3}
                />

                <div className="col-span-2 bg-neutral-50 border px-2 pt-2 pb-4 rounded-md mt-3">
                  <h6 className="text-lg mb-1">Price Level</h6>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-4 mt-3"
                    >
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <div className="flex items-center gap-2">
                          <FormInput
                            name={`priceLevel.${index}.price`}
                            placeholder="Price"
                          />
                          <FormInput
                            name={`priceLevel.${index}.code`}
                            placeholder="Code"
                          />
                        </div>
                        <FormInput
                          name={`priceLevel.${index}.description`}
                          placeholder="Description"
                        />
                      </div>
                      {fields.length > 2 && (
                        <div
                          onClick={() => handleRemovePriceLevel(index)}
                          className="bg-neutral-200 p-2 rounded-md cursor-pointer hover:bg-neutral-300"
                        >
                          <LucideTrash2 className="size-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div
                    onClick={handleAddPriceLevel}
                    className="mt-4 px-2 py-1.5 inline-flex items-center gap-1 border rounded-md text-sm bg-neutral-700 text-neutral-100 cursor-pointer hover:bg-neutral-600 shadow-sm"
                  >
                    <FaPlus className="size-3" />
                    Add more
                  </div>
                </div>
              </div>
            ) : (
              <FormInput name="price" label="Price" placeholder="Price" />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <FormTextarea
                name="addonPrompt"
                label="Add-on Prompt"
                placeholder="Prompt"
              />
              <div className="flex flex-col gap-2">
                <Controller
                  name="add_ons_selector"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      id="add_ons_selector"
                      label={"Add-ons"}
                      placeholder="Select Add-ons"
                      isLoading={addOnsDataLoading}
                      options={availableAddOns}
                      onChange={(value) => {
                        if (value) {
                          handleAddAddOns(value);
                          field.onChange("");
                        }
                      }}
                      value=""
                      className={"flex-1"}
                    />
                  )}
                />
                {errors.add_ons && (
                  <p className="text-red-500 text-sm">
                    {errors.add_ons.message}
                  </p>
                )}
                {watchFields?.add_ons?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {watchFields?.add_ons?.map((id) => {
                      const addOns = addOnsData?.data?.data?.find(
                        (item) => Number(item.id) === Number(id),
                      );
                      return (
                        <div
                          key={id}
                          className="inline-flex items-center gap-1 bg-neutral-200 text-neutral-800 px-3 py-1 rounded-full text-sm"
                        >
                          <span>{addOns?.name || `Add-on ${id}`}</span>
                          <div
                            onClick={() => handleRemoveAddOns(id)}
                            className="hover:bg-neutral-300 rounded-full p-0.5 cursor-pointer"
                          >
                            <X className="size-3" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <FormInput
                name="shipping_price"
                label="Shipping Price"
                placeholder="Shipping Price"
              />
              <Controller
                name="keycode_bank"
                control={control}
                rules={{ required: "Keycode Bank is required" }}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    id="keycode_bank"
                    label="Use Keycode Bank"
                    placeholder="Click to select"
                    isLoading={keyCodeBankLoading}
                    options={keyCodeBank?.data?.data}
                    error={errors?.keycode_bank?.message}
                    className="flex-1"
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <Controller
                name="course_certifying_body"
                control={control}
                rules={{ required: "Course Certifying Body is required" }}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    id="courseCertifyingBody"
                    label="Course Certifying Body"
                    placeholder="Choose body"
                    options={[
                      {
                        id: "none",
                        name: "None",
                      },
                      {
                        id: "American Red Cross",
                        name: "American Red Cross",
                      },
                      {
                        id: "American Heart Association",
                        name: "American Heart Association",
                      },
                    ]}
                    error={errors?.course_certifying_body?.message}
                  />
                )}
              />
              {watchFields?.course_certifying_body === "American Red Cross" && (
                <Controller
                  name="courseSKUs"
                  control={control}
                  rules={{ required: "Course SKUs is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      id="courseSKUs"
                      label="Course SKUs"
                      placeholder="Course SKUs"
                      isLoading={cardTypeDataLoading}
                      options={cardTypeData?.data?.data}
                      error={errors?.courseSKUs?.message}
                    />
                  )}
                />
              )}
            </div>

            {watchFields?.course_certifying_body ===
              "American Heart Association" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <Controller
                  name="cardType"
                  control={control}
                  rules={{ required: "Card Type is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      id="cardType"
                      label="Card Type"
                      placeholder="Choose type"
                      isLoading={cardTypeDataLoading}
                      options={cardTypeData?.data?.data}
                      error={errors?.cardType?.message}
                    />
                  )}
                />
                <Controller
                  name="secondCardType"
                  control={control}
                  rules={{ required: "Second Card Type is required" }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      id="secondCardType"
                      label="Second Card Type"
                      placeholder="Choose type"
                      isLoading={secondCardTypeDataLoading}
                      options={secondCardTypeData?.data?.data}
                      error={errors?.secondCardType?.message}
                    />
                  )}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="course_image"
                control={control}
                rules={{ required: "Course image is required" }}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    id="image"
                    label="Image"
                    placeholder="Image URL or upload"
                    isLoading={courseImageDataLoading}
                    options={courseImageData?.data?.data}
                    error={errors?.course_image?.message}
                  />
                )}
              />
              <div>
                <label className="text-sm sm:text-base font-medium text-gray-700 block mb-2">
                  Preview
                </label>
                {watchFields?.course_image && imagePreview?.image ? (
                  <figure className="border rounded-md overflow-hidden w-fit">
                    <Image
                      src={imagePreview.image}
                      width={100}
                      height={100}
                      alt="Course preview"
                      className="object-cover"
                    />
                  </figure>
                ) : (
                  <div className="w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">Options</p>
              <div className="grid grid-cols-2 gap-2 text-gray-700 max-w-[1400px]">
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("prompt_certification")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Prompt for certification / recertification during registration
                </label>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("include_instructor_ratio")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Include student to instructor ratio on roster
                </label>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("include_manikin_ratio")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Include student to manikin ratio on roster
                </label>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("include_electronic_signature")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Include electronic signature for AHA roster
                </label>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("use_certificate_number")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Use certificate number instead of test score (online course)
                </label>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("show_seats_remaining")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Show the number of seats remaining on the schedule page
                </label>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("allow_will_call")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Allow students to select &quot;will call to schedule&quot;
                </label>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("prompt_license_number")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Prompt for license number during registration
                </label>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("allow_alternate_datetime")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Allow an alternate date/time description
                </label>
                <div>
                  <label
                    className={`inline-flex items-center gap-2 text-[12px] sm:text-sm ml-4 ${!watchFields?.prompt_license_number && "opacity-40"}`}
                  >
                    <input
                      {...register("require_license_number")}
                      type="checkbox"
                      className="accent-brown"
                      disabled={!watchFields?.prompt_license_number}
                    />
                    Require license number during registration
                  </label>
                </div>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("enable_waitlist")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Enable Registration Waitlist
                </label>
                <label className="flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("enable_roster_expirations")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Enable Class Roster Expirations
                </label>
                <div>
                  <label
                    className={`inline-flex ml-4 items-center gap-2 text-[12px] sm:text-sm ${!watchFields?.enable_waitlist && "opacity-40"}`}
                  >
                    <input
                      {...register("automatic_waitlist")}
                      type="checkbox"
                      className="accent-brown"
                      disabled={!watchFields?.enable_waitlist}
                    />
                    Automatic Waitlist
                  </label>
                </div>
              </div>
            </div>
            {watchFields?.allow_will_call && (
              <FormInput
                name="will_call_prompt"
                label='"Will Call" Prompt'
                value="I will call to schedule my classroom session"
              />
            )}
            <FormInput
              name="ceu_credits"
              label="CEU Credits"
              placeholder="Enter CEU credits"
            />

            <div>
              <h6 className="leading-[1.45] mb-2.5 font-medium text-base">
                Description
              </h6>
              <RichTextEditor ref={descriptionRef} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="inline-flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("custom_sidebar")}
                    type="checkbox"
                    className="accent-brown"
                  />
                  Use a custom sidebar for this course
                </label>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 text-[12px] sm:text-sm">
                  <input
                    {...register("calendar_icon_color")}
                    type="color"
                    className="accent-brown size-[30px] rounded-full"
                  />
                  Calendar Icon Color
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <FormInput
                name="courseConfirmationEmailCCS"
                label="Course Confirmation Email CCS"
                placeholder="Email addresses"
              />
              <FormInput
                name="courseConfirmationEmailSubject"
                label="Course Confirmation Email Subject"
                placeholder="Subject line"
              />
            </div>

            <FormInput
              name="payloadConfirmationEmailSubject"
              label="Payment Confirmation Email Subject"
              placeholder="Subject line"
            />

            <div>
              <h6 className="leading-[1.45] mb-2.5 font-medium text-base">
                Course Confirmation Email Body
              </h6>
              <RichTextEditor ref={emailBodyRef} />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                {...register("use_email_for_payments")}
                type="checkbox"
                className="accent-brown"
              />
              Use the above email body for class registrations and general
              payments
            </label>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[15px] text-gray-700">
                SEO & Rich Results
              </p>
              <label className="flex items-center gap-2 text-sm">
                <input
                  {...register("enable_seo")}
                  type="checkbox"
                  className="accent-brown"
                />
                Enable
              </label>
            </div>

            {watchFields?.enable_seo && (
              <FormTextarea
                name="seoDescription"
                label="An SEO-friendly description of the course. Recommended length: 240 characters. Maximum length: 500 characters"
                placeholder="An SEO-friendly description..."
                rows={4}
              />
            )}
          </div>

          <div className="flex items-center justify-end">
            <div className="flex justify-end gap-4 mt-4 lg:mt-8">
              <Button
                asChild={true}
                type="button"
                className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50 focus:outline-none"
              >
                <Link href={`/admin/settings/course_type`}>Back</Link>
              </Button>
              <Button
                type="submit"
                disabled={storeCoursePending}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {storeCoursePending ? "Saving..." : "Save Course"}
              </Button>
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default Page;
