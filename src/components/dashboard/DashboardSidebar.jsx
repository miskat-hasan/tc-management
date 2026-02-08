"use client";
import { DashboardIcon, Logo } from "@/svg/SvgContainer";
import { FaChevronRight } from "react-icons/fa";
import React, { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CustomSelect from "../shared/form/CustomSelect";
import useAuth from "@/hooks/useAuth";

import { useLogout } from "@/hooks/api/authApi";
import { getallTrainingsite } from "@/hooks/api/dashboardApi";
import { Controller, useForm } from "react-hook-form";
import { AuthContextProvider } from "@/Provider/AuthProvider/AuthProvider";

const menuItems = [
  {
    label: "Classes and Students",
    href: "#",
    submenu: [
      {
        label: "Upcoming Classes",
        href: "/admin/class_and_students/upcoming_classes",
      },
      {
        label: "Schedule a Class",
        href: "/admin/class_and_students/schedule_class",
      },
      { label: "Past Classes", href: "/admin/class_and_students/past_class" },
      // {
      //   label: "Instructor Bidding",
      //   href: "/admin/class_and_students/instructor_bidding",
      // },
      // {
      //   label: "Keycode Sales",
      //   href: "/admin/class_and_students/keycode_sales",
      // },
      {
        label: "Student Search",
        href: "/admin/class_and_students/student_search",
      },
      // {
      //   label: "Unscheduled Students",
      //   href: "/admin/class_and_students/unscheduled_students",
      // },
      // { label: "Shipping", href: "/admin/class_and_students/shipping" },
    ],
  },
  {
    label: "Clients",
    href: "#",
    submenu: [
      { label: "Manage Clients", href: "/admin/clients/manage_clients" },
      { label: "Add Clients", href: "/admin/clients/add_client" },
      // {
      //   label: "Client Activity Reports",
      //   href: "/admin/clients/client_activity_reports",
      // },
    ],
  },
  {
    label: "Instructors",
    href: "#",
    submenu: [
      {
        label: "Instructor Records",
        href: "/admin/instructors/instructor_records",
      },
      { label: "Add Instructor", href: "/admin/instructors/add_instructor" },
      // {
      //   label: "Certifications",
      //   href: "/admin/instructors/certifications",
      // },
      // {
      //   label: "Expiring Certifications",
      //   href: "/admin/instructors/expiring_certifications",
      // },
    ],
  },
  // {
  //   label: "Asset Tracking",
  //   href: "#",
  //   submenu: [
  //     {
  //       label: "Manage Asset Installations",
  //       href: "/admin/asset_tracking/manage_asset_installations",
  //     },
  //     {
  //       label: "Service Due Report",
  //       href: "/admin/asset_tracking/service_due_report",
  //     },
  //     { label: "Parts Setup", href: "/admin/asset_tracking/parts_setup" },
  //     { label: "Search Assets", href: "/admin/asset_tracking/search_assets" },
  //   ],
  // },
  {
    label: "Training Center",
    href: "#",
    submenu: [
      {
        label: "Training Sites",
        href: "/admin/training_center/training_sites",
      },
      {
        label: "Training Site Rosters",
        href: "/admin/training_center/training_site_rosters",
      },
      {
        label: "TC Product Orders",
        href: "/admin/training_center/tc_product_orders",
      },
    ],
  },
  {
    label: "Reports",
    href: "#",
    submenu: [
      { label: "Activity Reports", href: "/admin/reports/activity_reports" },
      { label: "Class Report", href: "/admin/reports/class_reports" },
      {
        label: "Product Add-on Report",
        href: "/admin/reports/product_addon_report",
      },
      { label: "Promo Code Report", href: "/admin/reports/promo_code_report" },
      {
        label: "Registration Report",
        href: "/admin/reports/registration_report",
      },
      { label: "Student Export", href: "/admin/reports/student_export" },
      { label: "Event Log", href: "/admin/reports/event_log" },
    ],
  },
  {
    label: "Credit Card Services",
    href: "#",
    submenu: [
      {
        label: "Merchant Track",
        href: "/admin/credit_card_services/merchant_track",
      },
      {
        label: "Payment Report",
        href: "/admin/credit_card_services/payment_report",
      },
      {
        label: "Virtual Report",
        href: "/admin/credit_card_services/virtual_terminal",
      },
    ],
  },
  {
    label: "Help",
    href: "#",
    submenu: [
      { label: "Search Help", href: "https://help.enrollware.com/" },
      { label: "Support Request", href: "/admin/help/support_request" },
      { label: "Whats New", href: "/admin/help/whats_new" },
    ],
  },
  {
    label: "Settings",
    href: "#",
    submenu: [
      { label: "Course Type", href: "/admin/settings/course_type" },
      { label: "Product Add-ons", href: "/admin/settings/product_add_ons" },
      { label: "Online Keycodes", href: "/admin/settings/online_keycodes" },
      { label: "Promo Codes", href: "/admin/settings/promo_codes" },
      { label: "Locations", href: "/admin/settings/location" },
      // { label: "File Manager", href: "/admin/settings/file_manager" },
      { label: "Site Manager", href: "/admin/settings/site_manager" },
      { label: "Card Settings", href: "/admin/settings/cards_settings" },
      { label: "Certificates", href: "/admin/settings/certificates" },
      { label: "External SKu's", href: "/admin/settings/external_sku" },
      // { label: "Email Campaigns", href: "/admin/settings/emails_campaigns" },
      // { label: "Text Messaging", href: "/admin/settings/text_messaging" },
      { label: "Users", href: "/admin/settings/users" },
    ],
  },
];

const menuItems2 = [
  {
    label: "Classes",
    href: "#",
    submenu: [
      { label: "Classes", href: "/admin/class_and_students/classes" },
      // {
      //   label: "Schedule a Class",
      //   href: "/admin/class_and_students/schedule_class",
      // },
      {
        label: "Student Search",
        href: "/admin/class_and_students/student_search",
      },
      { label: "Student Export", href: "/admin/reports/student_export" },
      {
        label: "TC Product Orders",
        href: "/admin/training_center/tc_product_orders",
      },
    ],
  },
  {
    label: "Settings",
    href: "#",
    submenu: [
      { label: "Course Type", href: "/admin/settings/course_type" },
      // { label: "Product Add-ons", href: "/admin/settings/product_add_ons" },
      // { label: "Online Keycodes", href: "/admin/settings/online_keycodes" },
      // { label: "Promo Codes", href: "/admin/settings/promo_codes" },
      { label: "Locations", href: "/admin/settings/location" },
      // { label: "File Manager", href: "/admin/settings/file_manager" },
      // { label: "Site Manager", href: "/admin/settings/site_manager" },
      { label: "Card Settings", href: "/admin/settings/cards_settings" },
      // { label: "Certificates", href: "/admin/settings/certificates" },
      // { label: "External SKu's", href: "/admin/settings/external_sku" },
      // { label: "Email Campaigns", href: "/admin/settings/emails_campaigns" },
      // { label: "Text Messaging", href: "/admin/settings/text_messaging" },
      { label: "Users", href: "/admin/settings/users" },
    ],
  },
  {
    label: "Help",
    href: "#",
    submenu: [
      { label: "Search Help", href: "https://help.enrollware.com/" },
      { label: "Support Request", href: "/admin/help/support_request" },
      { label: "Whats New", href: "/admin/help/whats_new" },
    ],
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  // const { selectedTrainingSiteId, setSelectedTrainingSiteId } =
  //   useContext(AuthContextProvider);

  const form = useForm();

  const { control } = form;

  const [openMenu, setOpenMenu] = useState(null);
  // const [selectOption, setSelectOption] = useState(null);
  const router = useRouter();
  const initialRender = useRef(true);
  const {
    user,
    token,
    trainingSiteData,
    trainingSiteDataLoading,
    selectedTrainingSiteId,
    setSelectedTrainingSiteId,
  } = useAuth();

  // if (user?.role_name === "Admin") {
  //   setSelectOption("admin");
  // }
  // useEffect(() => {
  //   if (selectedTrainingSiteId == "1") {
  //     return router.push("/admin/class_and_students/upcoming_classes");
  //   } else {
  //     return router.push("/admin/class_and_students/classes");
  //   }
  // }, [selectedTrainingSiteId]);

  useEffect(() => {
    const activeMenus = user?.roles?.find((item) => item.name === "Admin") &&
            selectedTrainingSiteId == "1"
              ? menuItems
              : menuItems2
      // selectOption === "training_site" ? menuItems2 : menuItems;

    for (const item of activeMenus) {
      if (
        item.submenu &&
        item.submenu.some((sub) => pathname.startsWith(sub.href))
      ) {
        setOpenMenu(item.label);
        return;
      }
    }
  }, [pathname, user, selectedTrainingSiteId]);

  const handleSelectChange = (val) => {
    // setSelectOption(val);
    setSelectedTrainingSiteId(val);
  };

  // useEffect(() => {
  // if (initialRender.current) {
  //   initialRender.current = false;
  //   return;
  // }

  //   if (user?.role_name === "Admin") {
  //     router.push("/admin/class_and_students/upcoming_classes");
  //   } else {
  //     router.push("/admin/class_and_students/classes");
  //   }
  // }, [user, token]);

  const toggleMenu = (label) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const { mutateAsync: logoutAsync, isPending: logoutPending } = useLogout();

  const handleLogout = async () => {
    await logoutAsync();
  };

  return (
    <div className="max-w-[250px] xl:max-w-[300px] 2xl:max-w-[345px] w-full px-[17px] pt-[22.5px] h-screen overflow-y-auto scroll-bar bg-white text-black hidden xl:flex xl:flex-col gap-[31.5px]">
      <div className="flex items-center gap-1.5 justify-center">
        <Logo />
        <h5 className="font-black text-[14px]">ENROLL NATIONWIDE</h5>
      </div>

      <div className="flex flex-col">
        <Controller
          name="training-site"
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              id="training-site"
              value={selectedTrainingSiteId}
              options={trainingSiteData?.data}
              isLoading={trainingSiteDataLoading}
              onChange={handleSelectChange}
              placeholder="select training site"
              className="flex-1 mb-2"
            />
          )}
        />
        <div className="flex items-center gap-[12px] px-[20px] py-[10px]">
          <DashboardIcon />
          <h6>Dashboard</h6>
        </div>

        {/* Dynamic Menu */}
        <nav className="flex-grow">
          <ul>
            {(user?.roles?.find((item) => item.name === "Admin") &&
            selectedTrainingSiteId == "1"
              ? menuItems
              : menuItems2
            ).map((item) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isOpen = openMenu === item.label;

              return (
                <li key={item.label} className="text-sm font-semibold">
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`w-full flex items-center justify-between px-5 py-3 rounded-[10px] transition-colors ${
                        isOpen ? "bg-brown text-white" : "hover:bg-gray-100"
                      }`}
                    >
                      <span>{item.label}</span>
                      <FaChevronRight
                        className={`h-3 w-3 ${isOpen ? "rotate-90" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`w-full block px-5 py-3 rounded-[10px] ${
                        pathname === item.href
                          ? "bg-brown text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {hasSubmenu && (
                    <div
                      className={`transition-all overflow-hidden ${
                        !isOpen && "max-h-0"
                      }`}
                    >
                      <ul className="bg-gray-50 rounded-[10px] pt-1">
                        {item.submenu.map((sub) => {
                          const active = pathname === sub.href;
                          return (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                className={`flex items-center pl-16 pr-6 py-2.5 text-xs relative ${
                                  active
                                    ? "text-gray-900 font-semibold"
                                    : "text-gray-600 hover:text-brown"
                                }`}
                              >
                                <span
                                  className={`absolute left-6 h-5 w-1 rounded-full ${
                                    active ? "bg-brown" : "bg-gray-200"
                                  }`}
                                ></span>
                                {sub.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}

            <button
              onClick={handleLogout}
              className="text-sm font-semibold mt-10 cursor-pointer px-[20px] py-[10px] bg-brown rounded-[10px] text-white text-center"
              disabled={logoutPending}
            >
              {logoutPending ? "logging out ..." : "Log Out"}
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
