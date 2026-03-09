// "use client";
// import useAuth from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();
//   const { token, user } = useAuth();

//   // if (token && user) {
//   //   router.push("/admin/class_and_students/upcoming_classes");
//   // }
//   // router.push("/login");
//   if (!token && !user) {
//     return router.push("/login");
//   }
//   // router.push("/admin/class_and_students/upcoming_classes");

//   if (user?.role_name === "Admin") {
//   router.push("/admin/class_and_students/upcoming_classes");
//   } else {
//     router.push("/admin/class_and_students/classes");
//   }
// }

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";

// export default function Home() {
//   const router = useRouter();
//   const { token, user } = useAuth();

//   useEffect(() => {
//     // Wait until auth state is known
//     if (!token && !user) {
//       router.replace("/login");
//       return;
//     }

//     // if (user?.role_name === "Admin") {
//     // if (user?.data?.roles?.find((item) => item.role_name === "Super Admin")) {
//     //   router.replace("/admin/class_and_students/upcoming_classes");
//     // } else if (user) {
//     //   router.replace("/admin/class_and_students/classes");
//     // }

//     if (user?.roles?.find((item) => item.role_name === "Super Admin")) {
//       return router.push("/super-admin");
//     } else if (user?.roles?.find((item) => item.role_name === "Admin")) {
//       return router.push("/admin");
//     } else if (
//       user?.roles?.find((item) => item.role_name === "Instructor")
//     ) {
//       return router.push("/instructor");
//     }
//   }, [token, user, router]);

//   // Optional loading UI
//   return null;
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/common/Loader";

export default function Page() {
  const router = useRouter();
  const { user, token, loading, selectedTrainingSiteId } = useAuth();


  useEffect(() => {
    if (!token && !user) {
      router.replace("/login");
      return;
    }
    if (user?.roles?.find((item) => item.role_name === "Super Admin")) {
      return router.push(
        `/super-admin/${selectedTrainingSiteId}/class_and_students/upcoming_classes`,
      );
    }
    if (user?.roles?.find((item) => item.role_name === "Admin")) {
      return router.push(
        `/admin/${selectedTrainingSiteId}/class_and_students/classes`,
      );
    }
    if (user?.roles?.find((item) => item.role_name === "Instructor")) {
      return router.push(
        `/instructor/${selectedTrainingSiteId}/class_and_students/classes`,
      );
    }
  }, [user, token, router, selectedTrainingSiteId]);

  
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
}
