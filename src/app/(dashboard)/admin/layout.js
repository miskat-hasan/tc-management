import DashboardContent from "@/components/common/DashboardContent";
import AdminDashboardSidebar from "@/components/dashboard/admin/AdminDashboardSidebar";
import AdminPrivateLayout from "@/private/PrivateAdmin";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Enroll Nation Wide",
};

export default function DashboardLayout({ children }) {
  return (
    <AdminPrivateLayout>
      <section className={`${poppins.variable} flex`}>
        <AdminDashboardSidebar />
        <DashboardContent content={children} />
      </section>
    </AdminPrivateLayout>
  );
}
