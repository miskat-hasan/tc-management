"use client";
import { DashboardIcon, Logo } from "@/svg/SvgContainer";
import { FaChevronRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      {
        label: "Instructor Bidding",
        href: "/admin/class_and_students/instructor_bidding",
      },
      {
        label: "Keycode Sales",
        href: "/admin/class_and_students/keycode_sales",
      },
      {
        label: "Student Search",
        href: "/admin/class_and_students/student_search",
      },
      {
        label: "Unscheduled Students",
        href: "/admin/class_and_students/unscheduled_students",
      },
      { label: "Shipping", href: "/admin/class_and_students/shipping" },
    ],
  },
  {
    label: "Clients",
    href: "#",
    submenu: [
      { label: "Manage Clients", href: "/admin/clients/manage_clients" },
      { label: "Add Clients", href: "/admin/clients/add_client" },
      {
        label: "Client Activity Reports",
        href: "/admin/clients/client_activity_reports",
      },
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
      {
        label: "Expiring Certifications",
        href: "/admin/instructors/expiring_certifications",
      },
    ],
  },
  {
    label: "Asset Tracking",
    href: "#",
    submenu: [
      {
        label: "Manage Asset Installations",
        href: "/admin/asset_tracking/manage_asset_installations",
      },
      {
        label: "Service Due Report",
        href: "/admin/asset_tracking/service_due_report",
      },
      { label: "Parts Setup", href: "/admin/asset_tracking/parts_setup" },
      { label: "Search Assets", href: "/admin/asset_tracking/search_assets" },
    ],
  },
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
        label: "Virtual Terminal",
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
      { label: "What's New", href: "/admin/help/whats_new" },
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
      { label: "File Manager", href: "/admin/settings/file_manager" },
      { label: "Site Manager", href: "/admin/settings/site_manager" },
      { label: "Card Settings", href: "/admin/settings/cards_settings" },
      { label: "Certificates", href: "/admin/settings/certificates" },
      { label: "External SKUs", href: "/admin/settings/external_skills" },
      { label: "Email Campaigns", href: "/admin/settings/emails_campaigns" },
      { label: "Text Messaging", href: "/admin/settings/text_messaging" },
      { label: "Users", href: "/admin/settings/users" },
    ],
  },
];

const MobileSidebar = ({ onClose, isSidebarOpen }) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    for (const item of menuItems) {
      if (item.submenu?.some((sub) => pathname.startsWith(sub.href))) {
        setOpenMenu(item.label);
        return;
      }
    }
    setOpenMenu(null);
  }, [pathname]);

  const toggleMenu = (label) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <div
      className={`fixed top-0 ${
        isSidebarOpen ? "left-0" : "-left-full"
      } w-[280px] h-screen bg-white text-black duration-300 z-50 shadow-lg overflow-y-auto scroll-bar`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-1.5">
          <Logo />
          <h5 className="font-black text-[14px]">ENROLL NATIONWIDE</h5>
        </div>
        <button
          onClick={onClose}
          className="text-xl font-bold text-gray-600 cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Menu */}
      <nav className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <DashboardIcon />
          <h6 className="font-medium">Dashboard</h6>
        </div>

        <ul>
          {menuItems.map((item) => {
            const hasSubmenu = item.submenu?.length > 0;
            const isMenuOpen = openMenu === item.label;

            return (
              <li key={item.label} className="mb-1">
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`flex justify-between items-center w-full px-2 py-2 rounded-lg text-left ${
                        isMenuOpen ? "bg-brown text-white" : "hover:bg-gray-100"
                      }`}
                    >
                      <span>{item.label}</span>
                      <FaChevronRight
                        className={`h-3 w-3 transition-transform ${
                          isMenuOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    <ul
                      className={`overflow-hidden transition-all duration-300 ${
                        isMenuOpen ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      {item.submenu.map((subItem) => {
                        const active = pathname === subItem.href;
                        return (
                          <li key={subItem.label}>
                            <Link
                              href={subItem.href}
                              onClick={onClose}
                              className={`block pl-8 pr-4 py-2 text-sm ${
                                active
                                  ? "text-brown font-semibold"
                                  : "text-gray-600 hover:text-brown"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block px-4 py-2 rounded-lg ${
                      pathname === item.href
                        ? "bg-brown text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MobileSidebar;
