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
