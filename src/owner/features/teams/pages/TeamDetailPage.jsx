import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import { useTeamQuery } from "../hooks/useTeamsQuery";
import TeamInfoTab from "../components/tabs/TeamInfoTab";
import TeamMessageTab from "../components/tabs/TeamMessageTab";

const TeamDetailPage = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("info");
  const { data: team, isLoading } = useTeamQuery(id);

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!team) {
    return <div className="p-6 text-sm text-muted-foreground">Komanda topilmadi</div>;
  }

  const tabs = [
    { value: "info", label: "Ma'lumot", content: <TeamInfoTab team={team} /> },
    {
      value: "message",
      label: "Xabar yuborish",
      content: <TeamMessageTab teamId={team._id} />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link to="/owner/teams">
            <ChevronLeft size={16} className="mr-1" />
            Orqaga
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold flex-1 truncate">{team.name}</h1>
        <Badge variant={team.isActive ? "default" : "secondary"}>
          {team.isActive ? "Faol" : "Nofaol"}
        </Badge>
      </div>

      <TabsButtons items={tabs} value={tab} onChange={setTab} />
    </div>
  );
};

export default TeamDetailPage;
