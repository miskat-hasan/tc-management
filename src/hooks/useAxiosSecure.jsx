// src/hooks/useAxiosSecure.jsx
import axios from "axios";
import { getItem, removeItem } from "@/lib/localStorage";
// import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
});

// const { selectedTrainingSiteId } = useAuth();

axiosSecure.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // if (selectedTrainingSiteId) {
    //   config.headers["X-Site-Id"] = selectedTrainingSiteId;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      removeItem("token");
    }
    return Promise.reject(error);
  },
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
