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
      <div
        className="grow px-[12px] py-[11.5px]  lg:px-[24px] lg:py-[22.5px] flex flex-col
      gap-[15px] lg:gap-[34px] h-screen overflow-y-auto"
      >
        <DashboardTopbar />
        {children}
      </div>
    </section>
  );
}
