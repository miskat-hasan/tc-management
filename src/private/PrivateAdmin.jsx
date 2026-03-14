// "use client";
// import React, { useEffect } from "react";

// import { unauthorized, useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";
// import Loader from "@/components/common/Loader";
// import NotFound from "@/app/not-found";
// import Unauthorized from "@/app/unauthorized";

// const AdminPrivateLayout = ({ children }) => {
//   const router = useRouter();
//   const { user, token, loading, trainingSiteData } = useAuth();

//   useEffect(() => {
//     if (!token && !user) {
//       router.push("/login");
//     }
//   }, [token, user, router]);

//   if (loading && !trainingSiteData) {
//     return (
//       <div className="h-screen w-full flex justify-center items-center">
//         <Loader />
//       </div>
//     );
//   }

//   if (
//     token &&
//     user &&
//     trainingSiteData &&
//     user?.roles?.find((item) => item.role_name === "Admin")
//   ) {
//     return <>{children}</>;
//   }

//   if (
//     token &&
//     user &&
//     trainingSiteData &&
//     user?.roles?.find((item) => item.role_name !== "Admin")
//   ) {
//       Unauthorized();
//   }

//   // return <NotFound />;
// };

// export default AdminPrivateLayout;

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/common/Loader";

const AdminPrivateLayout = ({ children }) => {
  const router = useRouter();
  const { user, token, loading, trainingSiteData } = useAuth();

  // Redirect logic
  useEffect(() => {
    // Not logged in
    if (!token && !user) {
      router.replace("/login");
      return;
    }

    // Logged in but NOT admin
    if (
      token &&
      user &&
      trainingSiteData &&
      !user?.roles?.some((item) => item.role_name === "Admin" || "Instructor")
    ) {
      router.replace("/unauthorized");
    }
  }, [token, user, trainingSiteData, router]);

  // Loading state
  if (loading || !trainingSiteData) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // Allow render only if admin
  const isAdmin = user?.roles?.some((role) => role.role_name === "Admin" || "Instructor");

  if (!isAdmin) return null;

  return <>{children}</>;
};

export default AdminPrivateLayout;
