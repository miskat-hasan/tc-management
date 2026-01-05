import Swal from "sweetalert2";
import useClientApi from "../useClientApi";

export const createSingleTrainingSite = () => {
  return useClientApi({
    method: "post",
    endpoint: "/api/training-site/create",
    isPrivate: true,
    onSuccess: (data) => {
      Swal.fire({
        text: data.message,
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

export const getAllClient = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-clients"],
    isPrivate: true,
    endpoint: `/api/clients`,
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

export const storeLocation = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/locations/store",
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

export const getAllLocation = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-location"],
    isPrivate: true,
    endpoint: `/api/locations`,
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
    endpoint: `/api/instructor/${id}`,
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
