// "use client";
// import React, { useEffect } from "react";

// import { unauthorized, useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";
// import Loader from "@/components/common/Loader";

// const PrivateLayout = ({ children }) => {
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
//     user?.roles?.find((item) => item.role_name === "Super Admin")
//   ) {
//     return <>{children}</>;
//   }

//   if (
//     token &&
//     user &&
//     trainingSiteData &&
//     user?.roles?.find((item) => item.role_name !== "Super Admin")
//   ) {
//     unauthorized();
//   }
//   // return null;
// };

// export default PrivateLayout;


"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/common/Loader";

const PrivateLayout = ({ children }) => {
  const router = useRouter();
  const { user, token, loading, trainingSiteData } = useAuth();

  useEffect(() => {
    // Not logged in → login
    if (!token && !user) {
      router.replace("/login");
      return;
    }

    // Logged in but not Super Admin → unauthorized
    if (
      token &&
      user &&
      trainingSiteData &&
      !user?.roles?.some(
        (item) => item.role_name === "Super Admin"
      )
    ) {
      router.replace("/unauthorized");
    }
  }, [token, user, trainingSiteData, router]);

  if (loading || !trainingSiteData) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

    const isSuperAdmin = user?.roles?.some((role) => role.role_name === "Super Admin");

  if (!isSuperAdmin) return null;

  return <>{children}</>;
};

export default PrivateLayout;