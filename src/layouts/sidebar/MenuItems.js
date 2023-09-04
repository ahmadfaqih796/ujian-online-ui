const Menuitems = [
  {
    navlabel: true,
    subheader: "MENU",
    icon: "mdi mdi-dots-horizontal",
    href: "Dashboard",
    role: "admin",
    isAdmin: true,
    isSPV: true,
    isStaff: true,
  },
  {
    title: "Dashboard",
    icon: "grid",
    href: "/admin/home",
    collapse: true,
    isAdmin: false,
    isSPV: true,
    isStaff: false,
  },
  {
    title: "Siswa",
    icon: "grid",
    href: "/admin/siswa",
    collapse: true,
    isAdmin: false,
    isSPV: true,
    isStaff: false,
  },
  {
    title: "Users",
    icon: "layers",
    href: "/admin/users",
    collapse: true,
    isAdmin: true,
    isSPV: true,
    isStaff: true,
    children: [
      {
        title: "Guru",
        icon: "activity",
        href: "/admin/users/guru",
        isAdmin: true,
        isSPV: true,
        isStaff: true,
      },
      {
        title: "Siswa",
        icon: "clock",
        href: "/admin/users/siswa",
        isAdmin: true,
        isSPV: true,
        isStaff: true,
      },
    ],
  },
  {
    title: "Konfigurasi",
    icon: "user-check",
    href: "/admin/konfigurasi",
    collapse: true,
    isAdmin: true,
    isStaff: true,
    children: [
      {
        title: "Pelajaran",
        icon: "users",
        href: "/admin/konfigurasi/pelajaran",
        isAdmin: true,
        isSPV: true,
        isStaff: true,
      },
      {
        title: "Kelas",
        icon: "user-plus",
        href: "/admin/konfigurasi/kelas",
        isAdmin: true,
        isSPV: true,
        isStaff: true,
      },
    ],
  },
  {
    title: "Keluhan",
    icon: "layers",
    href: "/admin/keluhan",
    collapse: true,
    isAdmin: true,
    isSPV: true,
    isStaff: true,
    children: [
      {
        title: "Guru",
        icon: "activity",
        href: "/admin/keluhan/guru",
        isAdmin: true,
        isSPV: true,
        isStaff: true,
      },
      {
        title: "Siswa",
        icon: "clock",
        href: "/admin/keluhan/siswa",
        isAdmin: true,
        isSPV: true,
        isStaff: true,
      },
    ],
  },
  {
    title: "Pengaturan",
    icon: "user-check",
    href: "/pengaturan",
    collapse: true,
    isSuperAdmin: true,
    role: "admin",
    isAdmin: true,
    isStaff: true,
    children: [
      {
        title: "Akun",
        icon: "compass",
        href: "/pengaturan/akun",
        isAdmin: true,
        isSPV: true,
        isStaff: true,
      },
      {
        title: "Template",
        icon: "settings",
        href: "/pengaturan/template",
        isAdmin: true,
        isSPV: true,
        isStaff: true,
      },
    ],
  },
  {
    title: "Customer Service",
    icon: "grid",
    href: "/admin/customer-service",
    collapse: true,
    isAdmin: false,
    isSPV: true,
    isStaff: false,
  },
];
export default Menuitems;
