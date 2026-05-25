import { LayoutDashboard, MapPin, Megaphone, Trophy, Users } from "lucide-react";
import { PERMISSIONS } from "@/shared/constants/permissions";

const ownerSidebar = [
  {
    title: "Boshqaruv paneli",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      { title: "Bosh sahifa", url: "/owner/dashboard" },
    ],
  },
  {
    title: "Turnirlar",
    icon: Trophy,
    isActive: true,
    items: [
      {
        title: "Turnirlar ro'yxati",
        url: "/owner/tournaments",
        permission: PERMISSIONS.TOURNAMENTS_READ,
      },
    ],
  },
  {
    title: "Foydalanuvchilar",
    icon: Users,
    isActive: true,
    items: [
      {
        title: "Komandalar",
        url: "/owner/teams",
        permission: PERMISSIONS.TEAMS_READ,
      },
    ],
  },
  {
    title: "Reklama",
    icon: Megaphone,
    isActive: true,
    items: [
      {
        title: "Xabarnomalar",
        url: "/owner/broadcasts",
        permission: PERMISSIONS.BROADCASTS_READ,
      },
    ],
  },
  {
    title: "Sozlamalar",
    icon: MapPin,
    isActive: true,
    items: [
      {
        title: "Mintaqalar",
        url: "/owner/regions",
        permission: PERMISSIONS.REGIONS_READ,
      },
    ],
  },
];

export default ownerSidebar;
