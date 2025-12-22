import { useRouter } from "next/navigation";
import useAuth from "../useAuth";
import useClientApi from "../useClientApi";
import Swal from "sweetalert2";

export const useLogin = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["login"],
    endpoint: "/api/users/login",
    onSuccess: (data) => {
      if (data?.success) {
        setToken(data?.data?.token);

        Swal.fire({
          title: data?.message,
          icon: "success",
          confirmButtonText: "Go To Dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("admin/class_and_students/upcoming_classes");
          }

          if (
            result.dismiss === Swal.DismissReason.backdrop ||
            result.dismiss === Swal.DismissReason.esc
          ) {
            router.push("admin/class_and_students/upcoming_classes");
          }
        });
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
      refetchInterval: 1000 * 60 * 60,
    },
  });
};
