import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SelectRoleClient from "@/components/auth/SelectRoleClient";

export default async function SelectRolePage() {
  const cookieStore = await cookies();
  const token       = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  return <SelectRoleClient />;
}