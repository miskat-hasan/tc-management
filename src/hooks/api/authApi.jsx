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
      if (data?.status) {
        setToken(data?.data?.token);
        console.log(data)
        
        Swal.fire({
          title: data?.message || "Login Successful",
          icon: "success",
          confirmButtonText: "Go To Dashboard",
          allowOutsideClick: true,
        }).then(() => {
          // if (data?.data?.roles?.name === "Admin") {
          // if (data?.data?.roles[0]?.name === "Admin") {
          if (data?.data?.roles?.find((item) => item.name === "Admin")) {
            return router.push("/admin/class_and_students/upcoming_classes");
          }
           router.push("/admin/class_and_students/classes");
          
          // const isAdmin = data?.data?.roles?.some(
          //   (role) => role.name === "Admin",
          // );

          // router.push(
          //   isAdmin
          //     ? "/admin/class_and_students/upcoming_classes"
          //     : "/admin/class_and_students/classes",
          // );
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
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { clearToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["logout"],
    isPrivate: true,
    endpoint: "/api/users/logout",
    onSuccess: (data) => {
      clearToken();
      router.push("/login");
    },
    onError: () => {
      clearToken();
      router.push("/login");
    },
  });
};
