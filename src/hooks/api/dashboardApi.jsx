import Swal from "sweetalert2";
import useClientApi from "../useClientApi";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const createSingleTrainingSite = () => {
  return useClientApi({
    method: "post",
    endpoint: "/api/training-site/create",
    isPrivate: true,
  });
};

export const getallTrainingsite = (token, page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    key: ["get-all-training-site", page, perPage],
    isPrivate: true,
    enabled: !!token,
    endpoint: `/api/training-sites?page=${page}&per_page=${perPage}`,
  });
};

export const getSingleTrainingsite = (id) => {
  return useClientApi({
    method: "get",
    key: ["get-single-training-site"],
    isPrivate: true,
    endpoint: `/api/training-site/edit/${id}`,
  });
};

export const updateTrainingSite = (id) => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/training-site/update/${id}`,
    onSuccess: (data) => {
      Swal.fire({
        text: data?.message,
        icon: "success",
      });
    },
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

export const getAllCountry = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-country"],
    isPrivate: true,
    endpoint: `/api/country`,
  });
};

export const storeClient = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/clients/store",
  });
};

export const getSingleClient = (id) => {
  return useClientApi({
    method: "get",
    key: ["get-single-client"],
    isPrivate: true,
    endpoint: `/api/clients/${id}`,
  });
};

export const updateSingleClient = (id) => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/clients/${id}/update`,
  });
};

export const getAllClient = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    key: ["get-all-clients", page, perPage],
    isPrivate: true,
    endpoint: `/api/clients?page=${page}&per_page=${perPage}`,
  });
};

export const storeLocation = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/locations/store",
  });
};

export const updateLocation = (id) => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/locations/${id}/update`,
  });
};

export const getSingleLocation = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-location"],
    endpoint: `/api/locations/${id}`,
  });
};

export const getAllLocation = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    key: ["get-all-location", page, perPage],
    isPrivate: true,
    endpoint: `/api/locations?page=${page}&per_page=${perPage}`,
  });
};
export const getAllTcProducts = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    key: ["get-all-tcproduct", page, perPage],
    isPrivate: true,
    endpoint: `/api/tc-product?page=${page}&per_page=${perPage}`,
  });
};

export const getSingleTcProduct = (id) => {
  return useClientApi({
    method: "get",
    key: ["get-single-tcproduct"],
    isPrivate: true,
    endpoint: `/api/tc-product/${id}`,
  });
};

export const createInstructor = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/instructors/store",
  });
};

export const updateInstructor = (id) => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/instructors/${id}/update`,
  });
};

export const getAllInstructor = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    key: ["get-all-instructor", page, perPage],
    isPrivate: true,
    endpoint: `/api/instructors?page=${page}&per_page=${perPage}`,
  });
};

export const getSingleInstructor = (id) => {
  return useClientApi({
    method: "get",
    key: ["get-single-instructor"],
    isPrivate: true,
    endpoint: `/api/single-instructors?id=${id}`,
  });
};

export const getAllDiscipline = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-discipline", page, perPage],
    endpoint: `/api/discipline/index?page=${page}&per_page=${perPage}`,
  });
};

export const storeCertification = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/certifications/store",
  });
};

export const updateCertification = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/certifications/update",
  });
};

export const getAllCertification = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    key: ["get-all-certification", page, perPage],
    isPrivate: true,
    endpoint: `/api/certifications/index?page=${page}&per_page=${perPage}`,
  });
};

export const getSingleCertification = (id) => {
  return useClientApi({
    method: "get",
    key: ["get-single-certification"],
    isPrivate: true,
    endpoint: `/api/certifications/show?id=${id}`,
  });
};

export const storeDocument = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/documents/store",
  });
};

export const getAllDocuments = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    key: ["get-all-documents", page, perPage],
    isPrivate: true,
    endpoint: `/api/documents/index?page=${page}&per_page=${perPage}`,
  });
};

export const deleteDocument = () => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "delete",
    isPrivate: true,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["get-single-instructor"]);
      toast.success(data?.message || "Document deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    },
  });
};

export const getAllUserRole = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    key: ["get-all-roles", page, perPage],
    isPrivate: true,
    endpoint: `api/roles/index?page=${page}&per_page=${perPage}`,
  });
};

// product add ons
export const storeProductAddOns = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/addon_list/store",
  });
};

export const getSingleProductAddOns = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-product-add-ons"],
    endpoint: `/api/addon_list/show?id=${id}`,
  });
};

export const updateProductAddOns = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/addon_list/update",
  });
};

export const getAllProductAddOns = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-product-add-ons", page, perPage],
    endpoint: `/api/addon_list/index?page=${page}&per_page=${perPage}`,
  });
};

// promo code
export const storePromoCode = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/promo-codes/store",
  });
};

export const getSinglePromoCode = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-promo-code"],
    endpoint: `/api/promo-codes/show?id=${id}`,
  });
};

export const updatePromoCode = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/promo-codes/update`,
  });
};

export const getAllPromoCode = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-promo-code", page, perPage],
    endpoint: `/api/promo-codes/index?page=${page}&per_page=${perPage}`,
  });
};

// key code
export const addKeyCodeBank = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/keycode/store",
  });
};

export const getSingleKeyCodeBank = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-keycode-bank"],
    endpoint: `/api/keycode/show?id=${id}`,
  });
};

export const updateKeyCodeBank = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/keycode/update`,
  });
};

export const getAllKeyCodeBank = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-keycode-bank", page, perPage],
    endpoint: `/api/keycode/index?page=${page}&per_page=${perPage}`,
  });
};

// course
export const storeCourse = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/couese/store",
  });
};

export const getSingleCourse = (id) => {
  return useClientApi({
    method: "get",
    key: ["get-single-course"],
    isPrivate: true,
    endpoint: `/api/couese/show?id=${id}`,
  });
};

export const updateCourse = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/couese/update",
  });
};
export const getAllCourses = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    key: ["get-all-course", page, perPage],
    isPrivate: true,
    endpoint: `/api/couese/index?page=${page}&per_page=${perPage}`,
  });
};

// course
export const getCourseOptions = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-course-type"],
    endpoint: `/api/course_option/index`,
  });
};
// card type
export const getAllCardType = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-card-type"],
    endpoint: `/api/card/index`,
  });
};

export const getCardSettings = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-card-settings"],
    endpoint: "/api/adjustment/index",
  });
};

export const updateCardSettings = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/adjustment/update",
  });
};

// class
export const storeClass = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/class/store",
  });
};

export const getSingleClass = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-class"],
    endpoint: `/api/class/show?id=${id}`,
  });
};

export const updateClass = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/class/update",
  });
};

export const getAllUpcomingClasses = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-upcoming-class", page, perPage],
    endpoint: `/api/class/upcoming`,
  });
};

export const getAllPastClasses = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-past-class", page, perPage],
    endpoint: `/api/class/past?page=${page}&per_page=${perPage}`,
  });
};

export const getAllClasses = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-classes", page, perPage],
    endpoint: `/api/class/index?page=${page}&per_page=${perPage}`,
  });
};

// class search

export const searchClasses = (
  is_enabled,
  course_id,
  instructor_id,
  location_id,
  id,
) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-searched-classes", course_id, instructor_id, location_id, id],
    params: { course_id, instructor_id, location_id, id },
    endpoint: "/api/class/search",
    enabled: is_enabled,
    queryOptions: {
      retry: false,
    },
  });
};

// card type
export const getSecondCardType = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-second-card-type"],
    isPrivate: true,
    endpoint: "/api/second_card/index",
  });
};

export const getCourseImage = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-course-image"],
    endpoint: "/api/course_image/index",
  });
};

export const searchStudent = (
  page = 1,
  perPage = 10,
  first_name,
  last_name,
  email,
  class_details_id,
  is_enabled,
) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: [
      "get-searched-student",
      page,
      perPage,
      first_name,
      last_name,
      email,
      class_details_id,
    ],
    endpoint: `/api/student/search?page=${page}&per_page=${perPage}`,
    params: { first_name, last_name, email, class_details_id },
    enabled: is_enabled,
    queryOptions: {
      retry: false,
    },
  });
};

// reports

export const getClassReport = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-class-report", page, perPage],
    endpoint: `/api/reports/class-report?page=${page}&per_page=${perPage}`,
  });
};

export const getEventLog = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-event-log", page, perPage],
    endpoint: `/api/reports/event-log?page=${page}&per_page=${perPage}`,
  });
};

export const getProductAddOnsReport = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-product-add-ons-report", page, perPage],
    endpoint: `/api/reports/addon-report?page=${page}&per_page=${perPage}`,
  });
};

// certification file
export const uploadCertification = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/certificates/store",
  });
};

export const getAllCertificationFile = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-certification-file", page, perPage],
    endpoint: `/api/certificates/index?page=${page}&per_page=${perPage}`,
  });
};

export const deleteSingleCertificationFile = (id) => {
  return useClientApi({
    method: "delete",
    isPrivate: true,
    endpoint: `/api/certificates/delete?id=${id}`,
  });
};

export const downloadCertificationFile = () => {
  return useClientApi({
    method: "post",
    key: ["download-certification-file"],
    isPrivate: true,
    endpoint: `/api/certificates/download`,
    axiosOptions: {
      responseType: "blob",
    },
  });
};

// help
// what's new
export const getWhatsNew = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-whats-new"],
    endpoint: "/api/whats_new/index",
  });
};

// support request
export const storeSupportRequest = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/support_request/request",
  });
};

// External SKU
// get all data
export const getAllExternalSKU = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-external-sku", page, perPage],
    endpoint: `/api/external_sku/index?page=${page}&per_page=${perPage}`,
  });
};

// delete a data
export const deleteSingleExternalSKU = () => {
  return useClientApi({
    method: "delete",
    isPrivate: true,
  });
};

// store external SKU
export const storeExternalSKU = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/external_sku/store",
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

// get class-course details for enrolment
export const getEnrollmentDetails = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    endpoint: `/api/show/course/info?id=${id}`,
  });
};

// student registration
export const useStudentEnrollment = (id) => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/student/registration?id=${id}`,
    onError: (err) => {
      Swal.fire({
        text: err?.response?.data?.message || "Payment failed",
        icon: "error",
      });
    },
  });
};

// payment process
export const usePaymentProcess = () => {
  return useClientApi({
    method: "post",
    isPrivate: false,
    endpoint: `/api/student/payment/process`,
    onError: (err) => {
      Swal.fire({
        text: err?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

// get student
export const useGetStudentByClassId = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-student-by-class", id],
    endpoint: `/api/student/by_course?course_id=${id}`,
  });
};

export const useGetInstructorByDiscipline = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-instructor-by-discipline"],
    endpoint: `/api/reports/instructors-and-discipline`,
  });
};

export const useGetClassAndStudentReport = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-class-and-student"],
    endpoint: `/api/reports/classes-and-students`,
  });
};

export const useGetClassAndStudentByDiscipline = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-class-and-student-by-discipline"],
    endpoint: `/api/reports/classes-students-discipline`,
  });
};

export const useStoreStudentData = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/student/store",
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

export const useUpdateStudentData = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/student/by_course",
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

// get student data
export const useGetStudent = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-student", id],
    endpoint: `/api/student/show?id=${id}`,
  });
};

// update student score data
export const useUpdateStudentScore = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/score/update`,
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

export const useFinalizeRoster = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/student/finalize`,
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

export const useDownloadStudentListPDF = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/student/export-pdf`,
    axiosOptions: {
      responseType: "blob",
    },
  });
};

export const useDownloadRoster = (id) => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/student/${id}`,
    axiosOptions: {
      responseType: "blob",
    },
  });
};

// ----- tc product ------

// get all
export const useGetTCProduct = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-tc-product", page, perPage],
    endpoint: `/api/tc-product?page=${page}&per_page=${perPage}`,
  });
};

// store
export const useStoreTCProduct = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/tc-product`,
    onError: (err) => {
      Swal.fire({
        text: err?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

// show
export const useGetSingleTCProduct = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-tc-product", id],
    endpoint: `/api/tc-product/${id}`,
  });
};

// update
export const useUpdateTCProduct = (id) => {
  return useClientApi({
    method: "put",
    isPrivate: true,
    endpoint: `/api/tc-product/${id}`,
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

// ======== tc product order
export const useGetTCProductOrder = (page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-tc-product-order", page, perPage],
    endpoint: `/api/tc-product-orders?page=${page}`,
  });
};

export const useGetSingleTCProductOrder = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-tc-product-order", id],
    endpoint: `/api/tc-product-order/${id}`,
  });
};

export const useChangeOrderStatus = (id) => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["change-order-status", id],
    endpoint: `/api/tc-product-orders/${id}/status`,
  });
};

export const useMarkAsPaid = (id) => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["mark-as-paid", id],
    endpoint: `/api/tc-product-orders/${id}/mark-paid`,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["change-order-status"]);
      toast.success(data?.message || "Document deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    },
  });
};

export const useGetTSProductOrder = (id, page = 1, perPage = 10) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-ts-product-order", id, page, perPage],
    endpoint: `/api/my/tc-product-orders/${id}?page=${page}`,
  });
};

export const useTSProductCheckout = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/purchase-tc-product",
    onSuccess: (data) => {
      toast.success(data?.message);
    },
     onError: (err) => {
        Swal.fire({
          text: err?.response?.data?.message || "Something went wrong",
          icon: "error",
        });
      },
  });
};

// connect payment account
export const useConnectAccount = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: `/api/instructor-account-connect`,
    onError: (err) => {
      Swal.fire({
        text: err?.response?.data?.message,
        icon: "error",
      });
    },
  });
};