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
  "Training Center Admin": "class_and_students/classes",
  "Training Site Admin": "class_and_students/classes",
  Instructor: "class_and_students/classes",
  Student: "classes/upcoming-classes",
  Client: "class-and-students/upcoming-classes",
};

export const roleSegment = {
  "Super Admin": "super-admin",
  "Training Center Admin": "admin",
  "Training Site Admin": "admin",
  Instructor: "instructor",
  Student: "student",
  Client: "client",
};