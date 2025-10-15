import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import "../../globals.css";
export const metadata = {
  title: "Admin Dashboard",
  description: "Enroll Nation Wide",
};

const DashboardLayout = ({ children }) => {
  return (
    <section className="flex ">
      <DashboardSidebar />
      <div className="grow px-[24px] py-[22.5px] flex flex-col gap-[34px]">
        <DashboardTopbar />
        {children}
      </div>
    </section>
  );
};

export default DashboardLayout;
