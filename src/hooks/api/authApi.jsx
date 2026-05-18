import { useRouter } from "next/navigation";
import useAuth from "../useAuth";
import useClientApi from "../useClientApi";
import { toast } from "sonner";

export const useLogin = () => {
  const { setToken, setSiteRoles, setActiveRole } = useAuth();
  const router = useRouter();

  return useClientApi({
    method: "post",
    key: ["login"],
    endpoint: "/api/users/login",
    onSuccess: (data) => {
      if (data?.status) {
        const { token, site_roles } = data.data;

        setToken(token);
        setSiteRoles(site_roles ?? []); // ← persisted to localStorage

        toast.success(data?.message || "Login Successful");

        if (site_roles.length > 1) {
          // Multiple roles → let user pick
          router.push("/select-role");
        } else {
          // Single role → set it as active immediately
          setActiveRole(site_roles[0]);
          // AuthLayout handles the redirect once activeRole is set
        }
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong!");
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
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

export const useVerifyOTP = () => {
  return useClientApi({
    method: "post",
    isPrivate: false,
    endpoint: "/api/users/login/otp-verify",
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

export const useResendOTP = () => {
  return useClientApi({
    method: "post",
    isPrivate: false,
    endpoint: "/api/users/login/otp-resend",
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

export const useResetPassword = () => {
  return useClientApi({
    method: "post",
    isPrivate: false,
    endpoint: "/api/users/login/reset-password",
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};
