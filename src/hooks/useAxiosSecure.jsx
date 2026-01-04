import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = getCookie("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      deleteCookie("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
