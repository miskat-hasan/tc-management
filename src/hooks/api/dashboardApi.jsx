import useClientApi from "../useClientApi";

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

export const getAllCountry = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-country"],
    isPrivate: true,
    endpoint: `/api/country`,
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

export const getAllLocation = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-location"],
    isPrivate: true,
    endpoint: `/api/location`,
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

export const getAllInstructor = () => {
  return useClientApi({
    method: "get",
    key: ["get-all-instructor"],
    isPrivate: true,
    endpoint: `/api/instructor`,
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
