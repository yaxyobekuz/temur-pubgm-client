import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { toMediaUrl } from "@/shared/utils/mediaUrl";

const TeamsTable = ({ items = [], isLoading }) => {
  const { openModal } = useModal();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!items.length) {
    return <div className="p-4 text-sm text-muted-foreground">Komandalar topilmadi</div>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-[2px] border bg-white">
      <table className="w-full text-sm">
        <thead>
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
              <tr
                key={t._id}
                className="border-t cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/owner/teams/${t._id}`)}
              >
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    {t.logo ? (
                      <img
                        src={toMediaUrl(t.logo)}
                        alt={t.name}
                        className="size-8 rounded-[2px] border object-cover"
                      />
                    ) : (
                      <div className="size-8 rounded-[2px] border bg-muted" />
                    )}
                    <span className="font-medium">{t.name}</span>
                  </div>
                </td>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(MODAL.TEAM_EDIT, { team: t });
                      }}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(MODAL.TEAM_DELETE, { team: t });
                      }}
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
