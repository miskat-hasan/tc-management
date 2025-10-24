"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import SectionTitle from "@/components/common/SectionTitle";

const Page = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file first.");

    console.log("Uploading:", file.name);
    alert(`File "${file.name}" uploaded successfully!`);
  };

  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title={"Upload Certificate"} />
      <div className="w-full flex justify-center">
        <div className="w-full  bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 transition"
          >
            <div className="bg-gray-100 hover:bg-gray-200 p-4 rounded-full mb-3 transition">
              <Upload size={28} />
            </div>
            <p className="text-sm">
              To upload a new certificate, select your <b>.docx</b> file and
              click
              <b> Upload</b>. Existing files with the same name will be
              overwritten.
            </p>
            <input
              id="file-upload"
              type="file"
              accept=".docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {file && (
            <div className="mt-4 text-sm text-gray-600">
              Selected file: <b>{file.name}</b>
            </div>
          )}

          <button
            onClick={handleUpload}
            className="mt-4 bg-brown text-white px-6 py-2 rounded-lg hover:bg-brown-hover transition disabled:opacity-50 cursor-pointer"
            disabled={!file}
          >
            Upload
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
