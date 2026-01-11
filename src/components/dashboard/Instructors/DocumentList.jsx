import SectionTitle from "@/components/common/SectionTitle";
import FormContainer from "@/components/shared/form/FormContainer";
import { getAllDocuments, storeDocument } from "@/hooks/api/dashboardApi";
import { Button } from "@nolesh/react-file-manager";
import { Download, PlusIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

const DocumentList = ({ instructorId }) => {
  const form = useForm({
    defaultValues: {},
  });
const {watch, register,} = form;
  const { data: documentData, isLoading: documentLoading } = getAllDocuments();

  const {
    mutateAsync: storeDocumentMutation,
    isPending: storeDocumentLoading,
  } = storeDocument();

  const documentPathWatch = watch("document_path");
  console.log("documentPathWatch", documentPathWatch);
  console.log("documentPathWatch", documentPathWatch?.[0]?.name);

  const documentOnSubmit = (data) => {
    const formData = new FormData();
    formData.append("instructor_id", instructorId);
    formData.append("document_path", data.document_path);

    storeDocumentMutation(formData, {
      onSuccess: (data) => {
        Swal.fire({
          text: data?.message,
          icon: "success",
        });
      },
      onError: (err) => {
        Swal.fire({
          text: err?.response?.data?.message,
        });
      },
    });
  };

  return (
    <div>
      <div className="mt-8">
        <FormContainer form={form} onSubmit={documentOnSubmit}>
          <div className="flex items-center justify-between mb-3">
            <SectionTitle title={"Documents"} />
            <label className="py-[7px] cursor-pointer rounded-sm text-white px-3 text-sm bg-brown flex items-center gap-2">
              <input
                {...register("document_path")}
                type="file"
                className="hidden"
              />
              Add Document
              <PlusIcon size={16} />
            </label>
          </div>
          <div className="bg-white rounded-[14px] p-4 border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full text-sm sm:text-base text-left text-gray-700">
                <thead className="bg-gray-50 text-black text-[14px] sm:text-[16px] font-semibold">
                  <tr>
                    <th className="px-3 sm:px-6 py-3">Filename</th>
                    <th className="px-3 sm:px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {documentLoading && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 italic"
                      >
                        Loading documents data ...
                      </td>
                    </tr>
                  )}
                  {documentPathWatch?.[0]?.name && (
                    <tr
                      // key={item.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                        {documentPathWatch?.[0]?.name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <Button className="px-6 py-2 bg-transparent border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50">
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white bg-brown hover:bg-brown-hover"
                            disabled={storeDocumentLoading}
                          >
                            {storeDocumentLoading ? "Saving ..." : "Save"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                  {documentLoading ||
                  documentPathWatch?.[0]?.name ||
                  documentData?.data?.length > 0 ? (
                    documentData?.data?.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 transition-all"
                      >
                        <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                          {item.document_path}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-center">
                          <div className="flex items-center gap-1 justify-center">
                            <Link
                              href={``}
                              className="p-1.5 sm:p-2 bg-gray-100 rounded-lg inline-block hover:bg-gray-200 transition"
                            >
                              <Download size={16} />
                            </Link>
                            <Link
                              href={`/documents/delete?id=${item?.id}`}
                              className="p-1.5 sm:p-2 bg-gray-100 rounded-lg inline-block hover:bg-gray-200 transition"
                            >
                              <Trash2 size={16} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 italic"
                      >
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default DocumentList;
