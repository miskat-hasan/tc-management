// src/config/sidebarConfig.js
export const getSidebarMenu = ({ role, ts }) => {
  if (role === "Super Admin" && String(ts) === "1") {
    return superAdminFullMenu(ts);
  }
  if (role === "Super Admin") {
    return superAdminSiteMenu(ts);
  }
  if (role === "Training Center Admin" || role === "Training Site Admin") {
    return adminMenu(ts);
  }
  if (role === "Instructor") {
    return instructorMenu(ts);
  }
  return [];
};

const superAdminFullMenu = (ts) => [
  {
    label: "Classes and Students",
    submenu: [
      {
        label: "Upcoming Classes",
        href: `/dashboard/super-admin/${ts}/class_and_students/upcoming_classes`,
      },
      {
        label: "Schedule a Class",
        href: `/dashboard/super-admin/${ts}/class_and_students/schedule_class`,
      },
      {
        label: "Past Classes",
        href: `/dashboard/super-admin/${ts}/class_and_students/past_class`,
      },
      {
        label: "Student Search",
        href: `/dashboard/super-admin/${ts}/class_and_students/student_search`,
      },
    ],
  },
  {
    label: "Clients",
    submenu: [
      {
        label: "Manage Clients",
        href: `/dashboard/super-admin/${ts}/clients/manage_clients`,
      },
      {
        label: "Add Clients",
        href: `/dashboard/super-admin/${ts}/clients/add_client`,
      },
    ],
  },
  {
    label: "Instructors",
    submenu: [
      {
        label: "Instructor Records",
        href: `/dashboard/super-admin/${ts}/instructors/instructor_records`,
      },
      {
        label: "Add Instructor",
        href: `/dashboard/super-admin/${ts}/instructors/add_instructor`,
      },
    ],
  },
  {
    label: "Training Center",
    submenu: [
      {
        label: "Training Sites",
        href: `/dashboard/super-admin/${ts}/training_center/training_sites`,
      },
      {
        label: "Training Site Rosters",
        href: `/dashboard/super-admin/${ts}/training_center/training_site_rosters`,
      },
      {
        label: "TC Products",
        href: `/dashboard/super-admin/${ts}/training_center/tc_products`,
      },
      {
        label: "TC Product Orders",
        href: `/dashboard/super-admin/${ts}/training_center/tc_product_orders`,
      },
    ],
  },
  {
    label: "Reports",
    submenu: [
      {
        label: "Activity Reports",
        href: `/dashboard/super-admin/${ts}/reports/activity_reports`,
      },
      {
        label: "Class Report",
        href: `/dashboard/super-admin/${ts}/reports/class_reports`,
      },
      {
        label: "Product Add-on Report",
        href: `/dashboard/super-admin/${ts}/reports/product_addon_report`,
      },
      {
        label: "Promo Code Report",
        href: `/dashboard/super-admin/${ts}/reports/promo_code_report`,
      },
      {
        label: "Registration Report",
        href: `/dashboard/super-admin/${ts}/reports/registration_report`,
      },
      {
        label: "Event Log",
        href: `/dashboard/super-admin/${ts}/reports/event_log`,
      },
    ],
  },
  {
    label: "Credit Card Services",
    submenu: [
      {
        label: "Merchant Track",
        href: `/dashboard/super-admin/${ts}/credit_card_services/merchant_track`,
      },
      {
        label: "Payment Report",
        href: `/dashboard/super-admin/${ts}/credit_card_services/payment_report`,
      },
    ],
  },
  {
    label: "Settings",
    submenu: [
      {
        label: "Course Type",
        href: `/dashboard/super-admin/${ts}/settings/course_type`,
      },
      {
        label: "Product Add-ons",
        href: `/dashboard/super-admin/${ts}/settings/product_add_ons`,
      },
      {
        label: "Online Keycodes",
        href: `/dashboard/super-admin/${ts}/settings/online_keycodes`,
      },
      {
        label: "Promo Codes",
        href: `/dashboard/super-admin/${ts}/settings/promo_codes`,
      },
      {
        label: "Locations",
        href: `/dashboard/super-admin/${ts}/settings/location`,
      },
      {
        label: "Card Settings",
        href: `/dashboard/super-admin/${ts}/settings/cards_settings`,
      },
      {
        label: "Certificates",
        href: `/dashboard/super-admin/${ts}/settings/certificates`,
      },
      {
        label: "External SKUs",
        href: `/dashboard/super-admin/${ts}/settings/external_sku`,
      },
      { label: "Users", href: `/dashboard/super-admin/${ts}/settings/users` },
    ],
  },
  {
    label: "Help",
    submenu: [
      {
        label: "Support Request",
        href: `/dashboard/super-admin/${ts}/help/support_request`,
      },
      {
        label: "Whats New",
        href: `/dashboard/super-admin/${ts}/help/whats_new`,
      },
    ],
  },
];

const superAdminSiteMenu = (ts) => [
  {
    label: "Classes",
    submenu: [
      {
        label: "Classes",
        href: `/dashboard/super-admin/${ts}/class_and_students/classes`,
      },
      {
        label: "Student Search",
        href: `/dashboard/super-admin/${ts}/class_and_students/student_search`,
      },
      {
        label: "TS Product Orders",
        href: `/dashboard/super-admin/${ts}/class_and_students/ts_product_orders`,
      },
    ],
  },
  {
    label: "Settings",
    submenu: [
      {
        label: "Course Type",
        href: `/dashboard/super-admin/${ts}/settings/course_type`,
      },
      {
        label: "Locations",
        href: `/dashboard/super-admin/${ts}/settings/location`,
      },
      {
        label: "Card Settings",
        href: `/dashboard/super-admin/${ts}/settings/cards_settings`,
      },
    ],
  },
  {
    label: "Help",
    submenu: [
      {
        label: "Support Request",
        href: `/dashboard/super-admin/${ts}/help/support_request`,
      },
      {
        label: "Whats New",
        href: `/dashboard/super-admin/${ts}/help/whats_new`,
      },
    ],
  },
];

const adminMenu = (ts) => [
  // Training Center Admin / Training Site Admin menu items
];

const instructorMenu = (ts) => [
  // Instructor menu items
];
