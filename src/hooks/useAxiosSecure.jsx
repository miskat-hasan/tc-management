import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
});

const useAxiosSecure = () => {
  const router = useRouter();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = getCookie("token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        deleteCookie("token");
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
