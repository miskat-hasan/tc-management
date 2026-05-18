"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { roleSegment, roleDefaultPage } from "@/config";
import Loader from "@/components/common/Loader";
import Cookies from "js-cookie";

export default function SelectRolePage() {
  const router = useRouter();
  const { token, siteRoles, setActiveRole } = useAuth();

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  const handleRoleSelect = (siteRole) => {
    // Persist the chosen role
    setActiveRole(siteRole);

    Cookies.set("role", siteRole.role_name, { sameSite: "strict" });

    const segment = roleSegment[siteRole.role_name];
    const page = roleDefaultPage[siteRole.role_name];
    if (segment === "student" || segment === "client") {
      router.push(`/dashboard/${segment}/${page}`);
    } else {
      router.push(`/dashboard/${segment}/${siteRole.training_site_id}/${page}`);
    }
  };

  if (!siteRoles.length) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // Group by role_name so each role appears once even if multiple sites
  const uniqueRoles = siteRoles.reduce((acc, sr) => {
    if (!acc.find((r) => r.role_name === sr.role_name)) acc.push(sr);
    return acc;
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">Select a Role</h1>
      <p className="text-gray-500 text-sm">
        You have access to multiple roles. Choose how you want to continue.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        {uniqueRoles.map((siteRole) => {
          // Count how many sites this role has access to
          const siteCount = siteRoles.filter(
            (sr) => sr.role_name === siteRole.role_name,
          ).length;

          return (
            <button
              key={siteRole.role_id}
              onClick={() => handleRoleSelect(siteRole)}
              className="w-full px-6 cursor-pointer py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-brown hover:shadow-md transition-all text-left"
            >
              <p className="font-semibold text-gray-800">
                {siteRole.role_name}
              </p>
              <p className="text-sm text-gray-500">
                {siteCount} training site{siteCount > 1 ? "s" : ""}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
