import { LayoutDashboard, Settings } from "lucide-react";
import { PERMISSIONS } from "@/shared/constants/permissions";

const ownerSidebar = [
  {
    title: "Boshqaruv paneli",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      { title: "Bosh sahifa", url: "/owner/dashboard" },
      {
        title: "Foydalanuvchilar",
        url: "/owner/users",
        permission: PERMISSIONS.USERS_READ,
      },
      {
        title: "Turnirlar",
        url: "/owner/tournaments",
        permission: PERMISSIONS.TOURNAMENTS_READ,
      },
      {
        title: "Komandalar",
        url: "/owner/teams",
        permission: PERMISSIONS.TEAMS_READ,
      },
    ],
  },
  {
    title: "Sozlamalar",
    icon: Settings,
    isActive: true,
    items: [
      {
        title: "Mintaqalar",
        url: "/owner/regions",
        permission: PERMISSIONS.REGIONS_READ,
      },
      {
        title: "Yordam havolalari",
        url: "/owner/help-links",
        permission: PERMISSIONS.HELP_LINKS_READ,
      },
      { title: "Profil", url: "/owner/profile" },
    ],
  },
];

export default ownerSidebar;
