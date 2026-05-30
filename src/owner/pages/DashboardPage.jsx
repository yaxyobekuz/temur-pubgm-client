import { Link } from "react-router-dom";
import { Trophy, Users, Send, Globe, Plus, PlayCircle, ShieldAlert } from "lucide-react";
import StatCard from "@/shared/components/ui/card/StatCard";
import Card from "@/shared/components/ui/card/Card";
import Button from "@/shared/components/ui/button/Button";
import usePermissions from "@/shared/hooks/usePermissions";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { TOURNAMENT_STATUS } from "@/shared/constants/tournament";
import { useTournamentsQuery } from "@/owner/features/tournaments/hooks/useTournaments";
import { useTeamsQuery } from "@/owner/features/teams";

const QUICK_ACTIONS = [
  { label: "Yangi turnir", to: "/owner/tournaments", icon: Plus, permission: PERMISSIONS.TOURNAMENTS_CREATE },
  { label: "Komandalar", to: "/owner/teams", icon: Users, permission: PERMISSIONS.TEAMS_READ },
  { label: "Xabarnoma yuborish", to: "/owner/broadcasts", icon: Send, permission: PERMISSIONS.BROADCASTS_CREATE },
  { label: "Mintaqalar", to: "/owner/regions", icon: Globe, permission: PERMISSIONS.REGIONS_READ },
];

const DashboardPage = () => {
  const { has } = usePermissions();
  const { data: tData } = useTournamentsQuery({ limit: 200 });
  const { data: teamData } = useTeamsQuery({ limit: 1 });

  const tournaments = tData?.data || [];
  const tournamentsTotal = tData?.meta?.total ?? tournaments.length;
  const teamsTotal = teamData?.meta?.total ?? (teamData?.data || []).length;
  const ongoing = tournaments.filter((t) => t.status === TOURNAMENT_STATUS.ONGOING);
  const pending = tournaments.filter((t) => t.status === TOURNAMENT_STATUS.PENDING);
  // Maxfiy guruh havolasi bor, lekin chatId hali aniqlanmagan (bot admin qilinmagan).
  const unresolvedSecretGroups = tournaments.filter(
    (t) => t.secretGroup?.url && !t.secretGroup?.chatId,
  );

  const actions = QUICK_ACTIONS.filter((a) => !a.permission || has(a.permission));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bosh sahifa</h1>
        <p className="text-sm text-muted-foreground">
          Temur PUBGM boshqaruv paneliga xush kelibsiz.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Turnirlar" value={tournamentsTotal} icon={Trophy} />
        <StatCard label="Komandalar" value={teamsTotal} icon={Users} tone="info" />
        <StatCard label="Faol turnirlar" value={ongoing.length} icon={PlayCircle} tone="positive" />
        <StatCard label="Kutilayotgan" value={pending.length} icon={Trophy} tone="warn" />
      </div>

      {actions.length > 0 && (
        <Card title="Tezkor amallar">
          <div className="mt-3 flex flex-wrap gap-2">
            {actions.map((a) => (
              <Button key={a.to} asChild variant="outline">
                <Link to={a.to}>
                  <a.icon size={16} className="mr-1" />
                  {a.label}
                </Link>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {unresolvedSecretGroups.length > 0 && (
        <Card title="Maxfiy guruh ogohlantirishlari">
          <div className="mt-3 space-y-2">
            {unresolvedSecretGroups.map((t) => (
              <Link
                key={t._id}
                to={`/owner/tournaments/${t._id}?tab=secret-group`}
                className="flex items-start gap-3 rounded-[2px] border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 hover:bg-amber-100"
              >
                <ShieldAlert size={18} className="mt-0.5 shrink-0" />
                <span>
                  <span className="font-medium">{t.title}</span> - turnir guruhiga
                  bot hali admin qilinmagan. Botni o'sha yopiq guruhga{" "}
                  <b>admin</b> qiling (chat ID avtomatik aniqlanadi).
                </span>
              </Link>
            ))}
          </div>
        </Card>
      )}

      <Card title="Muhim eslatmalar">
        <ul className="mt-3 space-y-2 text-sm">
          {pending.length > 0 && (
            <li>
              <span className="font-medium">{pending.length}</span> ta turnir ro'yxat
              kutmoqda - boshlash uchun statusni "Boshlandi"ga o'tkazing.
            </li>
          )}
          {ongoing.length > 0 && (
            <li>
              <span className="font-medium">{ongoing.length}</span> ta turnir hozir
              davom etmoqda.
            </li>
          )}
          {pending.length === 0 && ongoing.length === 0 && (
            <li className="text-muted-foreground">Hozircha eslatmalar yo'q.</li>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default DashboardPage;
