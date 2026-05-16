import useAuth from "../useAuth";
import useClientApi from "../useClientApi";
import Swal from "sweetalert2";
import { toast } from "sonner";

export const useLogin = () => {
  const { setToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["login"],
    endpoint: "/api/users/login",
    onSuccess: (data) => {
      if (data?.status) {
        setToken(data.data.token);
        toast.success(data?.message || "Login Successful");
      }
    },
    onError: (err) => {
      Swal.fire({
        title: err?.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    },
  });
};

export const useGetUserData = (token) => {
  return useClientApi({
    method: "get",
    key: ["user", token],
    enabled: !!token,
    endpoint: "/api/users/data",
    isPrivate: true,
    queryOptions: {
      retry: false,
    },
  });
};

export const useLogout = () => {
  const { clearToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["logout"],
    isPrivate: true,
    endpoint: "/api/users/logout",
    onSuccess: () => {
      clearToken();
      window.location.href = "/login";
    },
  });
};

export const useVerifyEmail = () => {
  return useClientApi({
    method: "post",
    isPrivate: false,
    endpoint: "/api/users/login/email-verify",
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

export const useVerifyOTP = () => {
  return useClientApi({
    method: "post",
    isPrivate: false,
    endpoint: "/api/users/login/otp-verify",
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

export const useResendOTP = () => {
  return useClientApi({
    method: "post",
    isPrivate: false,
    endpoint: "/api/users/login/otp-resend",
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};

export const useResetPassword = () => {
  return useClientApi({
    method: "post",
    isPrivate: false,
    endpoint: "/api/users/login/reset-password",
    onError: (error) => {
      Swal.fire({
        text: error?.response?.data?.message,
        icon: "error",
      });
    },
  });
};
