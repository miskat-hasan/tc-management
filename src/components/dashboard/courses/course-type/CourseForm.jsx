"use client";

import { useEffect, useRef } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import FormContainer from "@/components/shared/form/FormContainer";
import FormInput from "@/components/shared/form/FormInput";
import FormTextarea from "@/components/shared/form/FormTextarea";
import CustomSelect from "@/components/shared/form/CustomSelect";
import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import {
  getAllDiscipline,
  getAllProductAddOns,
  getAllKeyCodeBank,
  getAllCardType,
  getSecondCardType,
  getCourseImage,
  getCourseOptions,
} from "@/hooks/api/dashboardApi";
import { LucideTrash2, X } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const RichTextEditor = dynamic(() => import("@/components/shared/RichEditor"), {
  ssr: false,
});

// These keys must match the payload options object exactly
const OPTION_KEYS = [
  { key: "prompt_for_certification", label: "Prompt for certification" },
  {
    key: "include_student_instructor_ratio",
    label: "Include student/instructor ratio",
  },
  {
    key: "include_student_manikin_ratio",
    label: "Include student/manikin ratio",
  },
  {
    key: "include_electronic_signature_aha",
    label: "Include electronic signature (AHA)",
  },
  {
    key: "use_certificate_number_instead_score",
    label: "Use certificate number instead of score",
  },
  { key: "show_seats_remaining", label: "Show seats remaining" },
  { key: "allow_will_call_to_schedule", label: "Allow will-call to schedule" },
  { key: "prompt_for_license_number", label: "Prompt for license number" },
  { key: "require_license_number", label: "Require license number" },
  { key: "allow_alternate_date_time", label: "Allow alternate date/time" },
  {
    key: "enable_class_roster_expirations",
    label: "Enable class roster expirations",
  },
  {
    key: "enable_registration_waitlist",
    label: "Enable registration waitlist",
  },
  { key: "automatic_waitlist", label: "Automatic waitlist" },
  { key: "allow_students_reschedule", label: "Allow students to reschedule" },
];

const DEFAULT_OPTIONS = Object.fromEntries(
  OPTION_KEYS.map(o => [o.key, false]),
);

export default function CourseForm({
  defaultValues,
  onSubmit,
  isPending,
  isEdit = false,
}) {
  const descriptionRef = useRef(null);
  const emailBodyRef = useRef(null);

  const form = useForm({
    defaultValues: defaultValues ?? {
      course_name: "",
      mode: "on-site",
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
      course_certifying_body: "none",
      courseSKUs: "",
      cardType: "",
      secondCardType: "",
      course_image: "",
      upload_image: null,
      options: DEFAULT_OPTIONS,
      ceu_credits: "",
      courseConfirmationEmailCCS: "",
      courseConfirmationEmailSubject: "",
      payloadConfirmationEmailSubject: "",
      use_email_for_payments: false,
      enable_seo: false,
      seoDescription: "",
      priceLevel: [
        { price: "", code: "", description: "", price_level_prompt: "" },
        { price: "", code: "", description: "", price_level_prompt: "" },
      ],
    },
  });

  const { register, watch, control, setValue, reset } = form;
  const watchFields = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceLevel",
  });

  // Populate editor content when defaultValues arrive (edit mode)
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      if (descriptionRef.current && defaultValues.description) {
        descriptionRef.current?.setHTML?.(defaultValues.description);
      }
      if (emailBodyRef.current && defaultValues.email_body) {
        emailBodyRef.current?.setHTML?.(defaultValues.email_body);
      }
    }
  }, [defaultValues, reset]);

  // Data fetching
  const { data: disciplineData, isLoading: disciplineLoading } =
    getAllDiscipline();
  const { data: addOnsData, isLoading: addOnsLoading } = getAllProductAddOns();
  const { data: keyCodeBank, isLoading: keyCodeBankLoading } =
    getAllKeyCodeBank();
  const { data: cardTypeData, isLoading: cardTypeLoading } = getAllCardType();
  const { data: secondCardData, isLoading: secondCardLoading } =
    getSecondCardType();
  const { data: courseImageData, isLoading: courseImageLoading } =
    getCourseImage();

  const imagePreview = courseImageData?.data?.data?.find(
    item => Number(item?.id) === Number(watchFields?.course_image),
  );

  // Add-ons helpers
  const availableAddOns = addOnsData?.data?.data?.filter(
    item => !watchFields?.add_ons?.includes(Number(item.id)),
  );

  const handleAddAddOn = value => {
    const id = Number(typeof value === "object" ? value?.id : value);
    if (id && !watchFields?.add_ons?.includes(id)) {
      setValue("add_ons", [...(watchFields.add_ons ?? []), id]);
    }
  };

  const handleRemoveAddOn = id => {
    setValue(
      "add_ons",
      watchFields.add_ons.filter(a => Number(a) !== Number(id)),
    );
  };

  const handleFormSubmit = data => {
    const description =
      descriptionRef.current?.getHTML?.() ??
      descriptionRef.current?.innerHTML ??
      "";
    const emailBody =
      emailBodyRef.current?.getHTML?.() ??
      emailBodyRef.current?.innerHTML ??
      "";

    // Build JSON payload matching API spec
    const payload = {
      course_name: data.course_name,
      mode: data.mode === "on-site" ? "onsite" : data.mode,
      discipline: Number(data.discipline),
      allow_deposit: data.deposit_registration,
      allow_multiple: data.multiple_pricing,
      shipping_price: Number(data.shipping_price) || 0,
      keycode_bank_id: data.keycode_bank
        ? Number(data.keycode_bank)
        : undefined,
      prompt: data.addonPrompt,
      selected_addons: data.add_ons,
      ecu_credits: data.ceu_credits,
      description,
      email_body: emailBody,
      confirmation_email: data.courseConfirmationEmailCCS
        ? data.courseConfirmationEmailCCS
            .split(",")
            .map(e => e.trim())
            .filter(Boolean)
        : [],
      course_confirmation_email_subject: data.courseConfirmationEmailSubject,
      payment_confirmation_email_subject: data.payloadConfirmationEmailSubject,
      use_general_email_body: data.use_email_for_payments ? 1 : 0,
      options: data.options,
    };

    // Deposit
    if (data.deposit_registration) {
      payload.deposit_amount = Number(data.deposit_amounts);
    }

    // Pricing
    if (data.multiple_pricing) {
      payload.multiple_price = data.priceLevel.map(level => ({
        price_level_prompt: data.price_level_prompt,
        price: Number(level.price),
        code: level.code,
        description: level.description,
      }));
    } else {
      payload.price = Number(data.price);
    }

    // Certifying body
    let certifyingBody = "none";
    if (data.course_certifying_body === "American Red Cross") {
      certifyingBody = "american_red_cross";
      payload.course_skus = data.courseSKUs;
    } else if (data.course_certifying_body === "American Heart Association") {
      certifyingBody = "american_heart_association";
      payload.card_type_id = Number(data.cardType);
      payload.second_card_type_id = Number(data.secondCardType);
    }
    payload.course_certifying_body = certifyingBody;

    // Image — upload takes priority
    if (data.upload_image) {
      // Must use FormData when uploading a file
      const formData = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        if (val === undefined) return;
        if (Array.isArray(val)) {
          val.forEach((v, i) => {
            if (typeof v === "object") {
              Object.entries(v).forEach(([k, vv]) =>
                formData.append(`${key}[${i}][${k}]`, vv ?? ""),
              );
            } else {
              formData.append(`${key}[]`, v);
            }
          });
        } else if (typeof val === "object" && val !== null) {
          Object.entries(val).forEach(([k, vv]) =>
            formData.append(`${key}[${k}]`, vv ? "1" : "0"),
          );
        } else {
          formData.append(key, val);
        }
      });
      formData.append("image", data.upload_image);
      onSubmit(formData, true); // true = isFormData
    } else {
      if (data.course_image) {
        payload.course_image_id = Number(data.course_image);
      }
      onSubmit(payload, false);
    }
  };

  return (
    <FormContainer form={form} onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-5 lg:gap-6">
        {/* Course Name */}
        <FormInput
          name="course_name"
          label="Course Name"
          placeholder="Course name"
          rules={{ required: "Course name is required" }}
        />

        {/* Mode */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm text-gray-700 dark:text-gray">
            Mode
          </p>
          <div className="flex flex-col gap-2">
            {[
              {
                value: "on-site",
                label: "On-site",
                desc: "Taught in person at a physical location.",
              },
              {
                value: "blended",
                label: "Blended",
                desc: "Has both online and in-person components.",
              },
              {
                value: "online",
                label: "Online",
                desc: "All instruction is asynchronous and virtual.",
              },
            ].map(({ value, label, desc }) => (
              <label
                key={value}
                className="flex items-center gap-2 text-sm cursor-pointer w-fit dark:text-gray"
              >
                <input
                  type="radio"
                  value={value}
                  {...register("mode")}
                  className="accent-brown"
                />
                <span>
                  <strong>{label}:</strong> {desc}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Discipline */}
        <Controller
          name="discipline"
          control={control}
          rules={{ required: "Discipline is required" }}
          render={({ field, fieldState }) => (
            <CustomSelect
              {...field}
              label="Discipline"
              placeholder="Select discipline"
              isLoading={disciplineLoading}
              options={disciplineData?.data?.data}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Price Options */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm text-gray-700 dark:text-gray">
            Price Options
          </p>
          <label className="flex items-center gap-2 text-sm cursor-pointer w-fit dark:text-gray">
            <input
              {...register("deposit_registration")}
              type="checkbox"
              className="accent-brown"
            />
            Allow registrations with a deposit
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer w-fit dark:text-gray">
            <input
              {...register("multiple_pricing")}
              type="checkbox"
              className="accent-brown"
            />
            Allow multiple pricing levels
          </label>
        </div>

        {watchFields.deposit_registration && (
          <FormInput
            name="deposit_amounts"
            label="Deposit Amount"
            placeholder="$0.00"
          />
        )}

        {watchFields.multiple_pricing ? (
          <div className="flex flex-col gap-3">
            <FormTextarea
              name="price_level_prompt"
              label="Price Level Prompt"
              rows={2}
            />
            <div className="bg-neutral-50 dark:bg-dark border dark:border-gray-700 px-3 pt-3 pb-4 rounded-md">
              <h6 className="text-base font-semibold mb-2 dark:text-gray">
                Price Levels
              </h6>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 mt-3">
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <FormInput
                      name={`priceLevel.${index}.price`}
                      placeholder="Price"
                    />
                    <FormInput
                      name={`priceLevel.${index}.code`}
                      placeholder="Code"
                    />
                    <FormInput
                      name={`priceLevel.${index}.description`}
                      placeholder="Description"
                    />
                  </div>
                  {fields.length > 2 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 bg-neutral-200 dark:bg-gray-700 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition cursor-pointer"
                    >
                      <LucideTrash2 className="size-4 text-gray-600 dark:text-gray" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  append({
                    price: "",
                    code: "",
                    description: "",
                    price_level_prompt: "",
                  })
                }
                className="mt-3 px-3 py-1.5 inline-flex items-center gap-1.5 border rounded-md text-sm bg-neutral-700 dark:bg-gray-800 text-neutral-100 cursor-pointer hover:bg-neutral-600 w-fit"
              >
                <FaPlus className="size-3" /> Add more
              </button>
            </div>
          </div>
        ) : (
          <FormInput name="price" label="Price" placeholder="0.00" />
        )}

        {/* Add-ons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormTextarea
            name="addonPrompt"
            label="Add-on Prompt"
            placeholder="Prompt for add-ons"
          />
          <div className="flex flex-col gap-2">
            <Controller
              name="add_ons_selector"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  label="Add-ons"
                  placeholder="Select add-ons"
                  isLoading={addOnsLoading}
                  options={availableAddOns}
                  value=""
                  onChange={val => {
                    if (val) {
                      handleAddAddOn(val);
                      field.onChange("");
                    }
                  }}
                />
              )}
            />
            {watchFields.add_ons?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {watchFields.add_ons.map(id => {
                  const addon = addOnsData?.data?.data?.find(
                    a => Number(a.id) === id,
                  );
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 bg-neutral-200 dark:bg-gray-700 text-neutral-800 dark:text-gray px-3 py-1 rounded-full text-sm"
                    >
                      {addon?.name ?? `Add-on #${id}`}
                      <button
                        type="button"
                        onClick={() => handleRemoveAddOn(id)}
                      >
                        <X size={12} className="hover:text-red-500" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Shipping + Keycode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            name="shipping_price"
            label="Shipping Price"
            placeholder="0.00"
          />
          <Controller
            name="keycode_bank"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label="Keycode Bank"
                placeholder="Select keycode bank"
                isLoading={keyCodeBankLoading}
                options={keyCodeBank?.data?.data}
              />
            )}
          />
        </div>

        {/* Certifying Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="course_certifying_body"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label="Course Certifying Body"
                placeholder="Select certifying body"
                options={[
                  { id: "none", name: "None" },
                  { id: "American Red Cross", name: "American Red Cross" },
                  {
                    id: "American Heart Association",
                    name: "American Heart Association",
                  },
                ]}
              />
            )}
          />

          {watchFields.course_certifying_body === "American Red Cross" && (
            <Controller
              name="courseSKUs"
              control={control}
              rules={{ required: "Course SKUs required for ARC" }}
              render={({ field, fieldState }) => (
                <CustomSelect
                  {...field}
                  label="Course SKUs"
                  placeholder="Select SKU"
                  options={cardTypeData?.data?.data}
                  error={fieldState.error?.message}
                />
              )}
            />
          )}
        </div>

        {watchFields.course_certifying_body ===
          "American Heart Association" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="cardType"
              control={control}
              rules={{ required: "Card type required" }}
              render={({ field, fieldState }) => (
                <CustomSelect
                  {...field}
                  label="Card Type"
                  placeholder="Select card type"
                  isLoading={cardTypeLoading}
                  options={cardTypeData?.data?.data}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="secondCardType"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  label="Second Card Type"
                  placeholder="Select second card type"
                  isLoading={secondCardLoading}
                  options={secondCardData?.data?.data}
                />
              )}
            />
          </div>
        )}

        {/* Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Controller
              name="course_image"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  label="Course Image"
                  placeholder="Select course image"
                  isLoading={courseImageLoading}
                  options={courseImageData?.data?.data}
                  onChange={val => {
                    field.onChange(val);
                    setValue("upload_image", null);
                  }}
                />
              )}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray">
                Or Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-neutral-100 dark:file:bg-gray-700 dark:file:text-gray file:text-neutral-800 hover:file:bg-neutral-200 cursor-pointer dark:text-gray"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("upload_image", file);
                    setValue("course_image", "");
                  }
                }}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray block mb-2">
              Preview
            </label>
            {watchFields.upload_image ? (
              <Image
                src={URL.createObjectURL(watchFields.upload_image)}
                width={120}
                height={120}
                alt="Upload preview"
                className="object-cover rounded border dark:border-gray-700"
              />
            ) : watchFields.course_image && imagePreview?.image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_SITE_URL}/${imagePreview.image}`}
                width={120}
                height={120}
                alt="Course preview"
                className="object-cover rounded border dark:border-gray-700"
              />
            ) : (
              <div className="w-28 h-28 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded flex items-center justify-center text-gray-400 text-xs">
                No image
              </div>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm text-gray-700 dark:text-gray">
            Options
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {OPTION_KEYS.map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 text-sm cursor-pointer dark:text-gray"
              >
                <input
                  type="checkbox"
                  {...register(`options.${key}`)}
                  className="accent-brown"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* CEU Credits */}
        <FormInput
          name="ceu_credits"
          label="CEU Credits"
          placeholder="e.g. 8.0"
        />

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray">
            Description
          </label>
          <RichTextEditor ref={descriptionRef} />
        </div>

        {/* Email fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            name="courseConfirmationEmailCCS"
            label="Confirmation Email CC"
            placeholder="email1@example.com, email2@example.com"
          />
          <FormInput
            name="courseConfirmationEmailSubject"
            label="Confirmation Email Subject"
            placeholder="Your Course Registration Confirmation"
          />
        </div>

        <FormInput
          name="payloadConfirmationEmailSubject"
          label="Payment Confirmation Email Subject"
          placeholder="Payment Received - Course Enrollment"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray">
            Course Confirmation Email Body
          </label>
          <RichTextEditor ref={emailBodyRef} />
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer dark:text-gray w-fit">
          <input
            {...register("use_email_for_payments")}
            type="checkbox"
            className="accent-brown"
          />
          Use the same email body for payments / general registrations
        </label>

        {/* SEO */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm text-gray-700 dark:text-gray">
            SEO & Rich Results
          </p>
          <label className="flex items-center gap-2 text-sm cursor-pointer dark:text-gray w-fit">
            <input
              {...register("enable_seo")}
              type="checkbox"
              className="accent-brown"
            />
            Enable SEO rich results
          </label>
        </div>

        {watchFields.enable_seo && (
          <FormTextarea
            name="seoDescription"
            label="SEO Description (recommended: 240 chars, max: 500)"
            placeholder="SEO-friendly description..."
            rows={4}
          />
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-3">
          <BackButton />
          <Button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 text-sm font-medium rounded-md text-white bg-brown dark:bg-dark-brown hover:bg-brown-hover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : isEdit ? "Save Course" : "Create Course"}
          </Button>
        </div>
      </div>
    </FormContainer>
  );
}
