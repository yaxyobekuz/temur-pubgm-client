import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import { useUserQuery } from "../hooks/useUsersQuery";
import UserInfoTab from "../components/tabs/UserInfoTab";
import UserMessageTab from "../components/tabs/UserMessageTab";

const UserDetailPage = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("info");
  const { data: user, isLoading } = useUserQuery(id);

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!user) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Foydalanuvchi topilmadi
      </div>
    );
  }

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "-";

  const tabs = [
    { value: "info", label: "Ma'lumot", content: <UserInfoTab user={user} /> },
    {
      value: "message",
      label: "Xabar yuborish",
      content: <UserMessageTab userId={user._id} hasTelegram={!!user.tgId} />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link to="/owner/users">
            <ChevronLeft size={16} className="mr-1" />
            Orqaga
          </Link>
        </Button>
        <h1 className="flex-1 truncate text-2xl font-semibold">{name}</h1>
        <Badge variant={user.isActive ? "default" : "secondary"}>
          {user.isActive ? "Faol" : "Nofaol"}
        </Badge>
      </div>

      <TabsButtons items={tabs} value={tab} onChange={setTab} />
    </div>
  );
};

export default UserDetailPage;
