import { UserMinus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import {
  REGISTRATION_STATUS,
  REGISTRATION_STATUS_LABELS,
  ROSTER_SLOT,
  ROSTER_SLOT_LABELS,
} from "@/shared/constants/registration";
import { useRegistrationsByTournament } from "../../hooks/useRegistrations";

const memberName = (u) =>
  [u?.firstName, u?.lastName].filter(Boolean).join(" ") ||
  u?.tgUsername ||
  u?.gameNickname ||
  "-";

const RegistrationsTab = ({ tournament }) => {
  const { openModal } = useModal();
  const { data: items = [], isLoading } = useRegistrationsByTournament(tournament._id);

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!items.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
        Hozircha ro'yxatdan o'tgan komandalar yo'q
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs text-muted-foreground">
        Jami: {items.length} ta
      </div>
      {items.map((r) => {
        const isKicked = r.status !== REGISTRATION_STATUS.REGISTERED;
        const main = (r.roster || []).filter((x) => x.slot === ROSTER_SLOT.MAIN);
        const reserve = (r.roster || []).filter((x) => x.slot === ROSTER_SLOT.RESERVE);
        return (
          <div key={r._id} className="rounded-[2px] border bg-white p-3 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium">{r.team?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(r.registeredAt).toLocaleString("uz-UZ")}
                  {r.currentGroup?.code && ` • Guruh: ${r.currentGroup.code}`}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isKicked ? "secondary" : "default"}>
                  {REGISTRATION_STATUS_LABELS[r.status]}
                </Badge>
                {!isKicked && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openModal(MODAL.REGISTRATION_KICK, {
                        registration: r,
                        tournamentId: tournament._id,
                      })
                    }
                  >
                    <UserMinus size={16} className="mr-1" />
                    Chiqarish
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs uppercase text-muted-foreground mb-1">
                  {ROSTER_SLOT_LABELS[ROSTER_SLOT.MAIN]} ({main.length})
                </div>
                <ul className="space-y-0.5">
                  {main.map((x) => (
                    <li key={x._id}>
                      {memberName(x.user)}
                      {x.user?.gameNickname && (
                        <span className="text-xs text-muted-foreground"> · {x.user.gameNickname}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground mb-1">
                  {ROSTER_SLOT_LABELS[ROSTER_SLOT.RESERVE]} ({reserve.length})
                </div>
                <ul className="space-y-0.5">
                  {reserve.length === 0 && (
                    <li className="text-xs text-muted-foreground">-</li>
                  )}
                  {reserve.map((x) => (
                    <li key={x._id}>{memberName(x.user)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RegistrationsTab;
