import { LayoutDashboard } from "lucide-react";
import { PERMISSIONS } from "@/shared/constants/permissions";

const ownerSidebar = [
  {
    title: "Boshqaruv paneli",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      { title: "Bosh sahifa", url: "/owner/dashboard" },
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
      {
        title: "Xabarnomalar",
        url: "/owner/broadcasts",
        permission: PERMISSIONS.BROADCASTS_READ,
      },
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
