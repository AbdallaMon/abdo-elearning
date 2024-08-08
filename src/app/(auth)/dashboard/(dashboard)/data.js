export const data = [
  {
    id: 11,
    text: "جميع الوحدات",
    href: "/dashboard/all-courses",
    role: ["admin"],
  },
  {
    id: 10,
    text: "Create Quiz",
    href: "/dashboard/create-quiz",
    role: ["admin"],
  },
  {
    id: 12,
    text: "All Users",
    href: "/dashboard/users",
    role: ["admin"],
  },
  {
    id: 13,
    text: "Categories",
    href: "/dashboard/categories",
    role: ["admin"],
  },
  {
    id: 14,
    text: "Create Category",
    href: "/dashboard/create-category",
    role: ["admin"],
  },

  // Shared pages
  {
    id: 2,
    text: "Profile",
    href: "/dashboard/profile",
    role: ["student", "admin"],
  },
  {
    id: 1,
    text: "Enrolled Courses",
    href: "/dashboard/enrolled-courses",
    role: ["student", "admin"],
  },
  {    id: 1,
    text: "Pinned Lessons",
    href: "/dashboard/pinned-lessons",
    role: ["student", "admin"],
  },
  {
    id: 3,
    text: "Finished Courses",
    href: "/dashboard/finished-courses",
    role: ["student", "admin"],
  },
  {
    id: 4,
    text: "Certificates",
    href: "/dashboard/certificates",
    role: ["student", "admin"],
  },
  {
    id: 6,
    text: "Purchased Courses",
    href: "/dashboard/purchased-lessons",
    role: ["student", "admin"],
  },
  {
    id: 5,
    text: "Favourite Courses",
    href: "/dashboard/favourites",
    role: ["student", "admin"],
  },
  {
    id: 7,
    text: "Quiz Results",
    href: "/dashboard/quiz-results",
    role: ["student", "admin"],
  },

  // Logout button for all roles
  {
    id: 16,
    text: "Logout",
    href: "/logout",
    type: "button",
    role: ["student", "instructor", "admin"],
  },
];
