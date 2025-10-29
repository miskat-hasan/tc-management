import DashboardContent from "@/components/common/DashboardContent";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
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
    <section className={`${poppins.variable} flex`}>
      <DashboardSidebar />
      <DashboardContent content={children} />
    </section>
  );
}
