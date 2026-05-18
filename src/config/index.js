// src/config/index.js
export const Roles = [
  {
    id: 1,
    name: "Super Admin",
  },
  {
    id: 2,
    name: "Admin",
  },
  {
    id: 3,
    name: "Instructor",
  },
  {
    id: 4,
    name: "Student",
  },
  {
    id: 5,
    name: "Client",
  },
];

export const roleDefaultPage = {
  "Super Admin": "class_and_students/upcoming_classes",
  Admin: "class_and_students/classes",
  Instructor: "class_and_students/classes",
  "Instructor Assistant": "class_and_students/classes",
  Student: "classes/upcoming-classes",
  Client: "class-and-students/upcoming-classes",
};

export const roleSegment = {
  "Super Admin": "super-admin",
  Admin: "admin",
  Instructor: "instructor",
  "Instructor Assistant": "instructor-assistant",
  Student: "student",
  Client: "client",
};
