import Swal from "sweetalert2";
import useClientApi from "../useClientApi";

export const createSingleTrainingSite = () => {
  return useClientApi({
    method: "post",
    endpoint: "/api/training-site/create",
    isPrivate: true,
  });
};

export const getallTrainingsite = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-training-site"],
    isPrivate: true,
    endpoint: "/api/training-sites",
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

export const getAllClient = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-clients"],
    isPrivate: true,
    endpoint: `/api/clients`,
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
export const getAllTcProducts = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-tcproduct"],
    isPrivate: true,
    endpoint: `/api/tc-product`,
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
    endpoint: `/instructors/${id}/update`,
  });
};

export const getAllInstructor = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-instructor"],
    isPrivate: true,
    endpoint: `/api/instructors`,
  });
};

export const getSingleInstructor = (id) => {
  return useClientApi({
    method: "get",
    key: ["get-single-instructor"],
    isPrivate: true,
    endpoint: `/api/instructors?id=${id}`,
  });
};

export const getAllCourses = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-course"],
    isPrivate: true,
    endpoint: `/api/couese/index`,
  });
};

export const getAllDiscipline = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-discipline"],
    endpoint: "/api/discipline/index",
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

export const getAllCertification = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-certification"],
    isPrivate: true,
    endpoint: "/api/certifications/index",
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

export const getAllDocuments = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-documents"],
    isPrivate: true,
    endpoint: "/api/documents/index",
  });
};

export const deleteDocument = (id) => {
  return useClientApi({
    method: "delete",
    isPrivate: true,
    endpoint: `/documents/delete?id=${id}`,
  });
};

export const getAllUserRole = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-roles"],
    isPrivate: true,
    endpoint: "api/roles/index",
  });
};

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

export const getAllProductAddOns = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-product-add-ons"],
    endpoint: "/api/addon_list/index",
  });
};

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
    endpoint: `/api/promo-codes/show?id=${id}`
  })
}

export const updatePromoCode = () => {
  return useClientApi({
    method: "post",
    isPrivate: true, 
    endpoint: `/api/promo-codes/update`
  })
}

export const getAllPromoCode = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-promo-code"],
    endpoint: "/api/promo-codes/index",
  });
};
