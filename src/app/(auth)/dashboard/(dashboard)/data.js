export const data = [
  {
    id: 11,
    text: "جميع الوحدات",
    href: "/dashboard/all-courses",
    role: ["admin"],
  },
  {
    id: 10,
    text: "الاختبارات",
    href: "/dashboard/quizez",
    role: ["admin"],
  },
  {
    id: 12,
    text: "المستخدمين",
    href: "/dashboard/users",
    role: ["admin"],
  },
  // Shared pages
  {
    id: 2,
    text: "الملف الشخصي",
    href: "/dashboard/profile",
    role: ["student", "admin"],
  },
  // {
  //   id: 1,
  //   text: "",
  //   href: "/dashboard/enrolled-courses",
  //   role: ["student", "admin"],
  // },
  // {    id: 1,
  //   text: "الدرة",
  //   href: "/dashboard/pinned-lessons",
  //   role: ["student", "admin"],
  // },
  // {
  //   id: 3,
  //   text: "Finished Courses",
  //   href: "/dashboard/finished-courses",
  //   role: ["student", "admin"],
  // },
  // {
  //   id: 4,
  //   text: "Certificates",
  //   href: "/dashboard/certificates",
  //   role: ["student", "admin"],
  // },
  {
    id: 6,
    text: "الدروس المشتراه",
    href: "/dashboard/purchased-lessons",
    role: ["student", "admin"],
  },

  {
    id: 7,
    text: "نتائج الاختبارات",
    href: "/dashboard/quiz-results",
    role: ["student", "admin"],
  },

  {
    id: 16,
    text: "تسجيل الخروج",
    href: "/logout",
    type: "button",
    role: ["student", "admin"],
  },
];
