// // src/app/dashboard/layout.js
// import Sidebar from "@/components/dashboard/Sidebar";
// import Topbar from "@/components/dashboard/Topbar";
// import { Poppins } from "next/font/google";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardTopbar from "@/components/dashboard/Topbar";

// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   weight: ["400", "500", "600", "700"],
// });

// export default function DashboardLayout({ children }) {
//   return (
//     <div className={`${poppins.variable} flex h-screen overflow-hidden`}>
//       <Sidebar />
//       <div className="flex flex-1 flex-col min-w-0">
//         <Topbar />
//         <div className="flex-1 overflow-y-auto px-6 py-10">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }




// No Poppins here — already set in root layout via CSS variable
// No PrivateGuard here — middleware already handled it

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardTopbar />
        <div className="flex-1 overflow-y-auto px-6 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}