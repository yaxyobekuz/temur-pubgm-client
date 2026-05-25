import { Pencil, Trash2 } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const TeamsTable = ({ items = [], isLoading }) => {
  const { openModal } = useModal();

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!items.length) {
    return <div className="p-4 text-sm text-muted-foreground">Komandalar topilmadi</div>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-[2px] border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-left">
          <tr>
            <th className="px-3 py-2 font-medium">Nomi</th>
            <th className="px-3 py-2 font-medium">Sardori</th>
            <th className="px-3 py-2 font-medium">A'zolar</th>
            <th className="px-3 py-2 font-medium">Invite</th>
            <th className="px-3 py-2 font-medium">Holat</th>
            <th className="px-3 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => {
            const leader = t.leader || {};
            const leaderName =
              [leader.firstName, leader.lastName].filter(Boolean).join(" ") ||
              leader.username ||
              leader.tgUsername ||
              "-";
            return (
              <tr key={t._id} className="border-t">
                <td className="px-3 py-2 font-medium">{t.name}</td>
                <td className="px-3 py-2">{leaderName}</td>
                <td className="px-3 py-2">{t.members?.length || 0}</td>
                <td className="px-3 py-2 font-mono text-xs">{t.inviteCode}</td>
                <td className="px-3 py-2">
                  <Badge variant={t.isActive ? "default" : "secondary"}>
                    {t.isActive ? "Faol" : "Nofaol"}
                  </Badge>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal(MODAL.TEAM_EDIT, { team: t })}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal(MODAL.TEAM_DELETE, { team: t })}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsTable;
