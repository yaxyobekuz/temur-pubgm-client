import { Pencil, Trash2, ArrowRight } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import {
  TOURNAMENT_MODE_LABELS,
  TOURNAMENT_STATUS,
  allowedNextStatuses,
  getStageLabel,
} from "@/shared/constants/tournament";
import { formatDateTimeUZ } from "@/shared/utils/date.utils";
import TournamentStatusBadge from "../TournamentStatusBadge";

const formatDate = (iso) => (iso ? formatDateTimeUZ(iso) : "-");

const Row = ({ label, children }) => (
  <div className="flex flex-col gap-1 border-t py-2 first:border-t-0 sm:flex-row sm:items-center">
    <div className="text-xs uppercase text-muted-foreground sm:w-40">{label}</div>
    <div className="text-sm">{children}</div>
  </div>
);

const InfoTab = ({ tournament }) => {
  const { openModal } = useModal();
  const canTransition = allowedNextStatuses(tournament.status).length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => openModal(MODAL.TOURNAMENT_EDIT, { tournament })}>
          <Pencil size={16} className="mr-1" />
          Tahrirlash
        </Button>
        <Button
          variant="outline"
          onClick={() => openModal(MODAL.TOURNAMENT_STATUS, { tournament })}
          disabled={!canTransition}
        >
          <ArrowRight size={16} className="mr-1" />
          Statusni o'zgartirish
        </Button>
        <Button
          variant="outline"
          onClick={() => openModal(MODAL.TOURNAMENT_DELETE, { tournament, redirectAfter: true })}
        >
          <Trash2 size={16} className="mr-1" />
          O'chirish
        </Button>
      </div>

      {tournament.banner && (
        <img
          src={tournament.banner}
          alt={tournament.title}
          className="w-full rounded-[2px] border object-cover max-h-72"
        />
      )}

      <div className="rounded-[2px] border bg-white px-4 py-2">
        <Row label="Sarlavha">{tournament.title}</Row>
        <Row label="Status"><TournamentStatusBadge status={tournament.status} /></Row>
        {tournament.status === TOURNAMENT_STATUS.ONGOING && (
          <Row label="Joriy bosqich">
            {getStageLabel(tournament.currentStage, tournament.stagesCount)}
          </Row>
        )}
        <Row label="Rejim">{TOURNAMENT_MODE_LABELS[tournament.mode] || tournament.mode}</Row>
        <Row label="Boshlanish">{formatDate(tournament.startDate)}</Row>
        <Row label="Mukofot fondi">{tournament.prizePool || "-"}</Row>
        <Row label="Maks. komandalar">{tournament.maxTeams}</Row>
        <Row label="Xaritalar">
          {tournament.maps?.length ? tournament.maps.join(", ") : "-"}
        </Row>
        <Row label="Izoh">
          <span className="whitespace-pre-wrap">{tournament.description || "-"}</span>
        </Row>
      </div>
    </div>
  );
};

export default InfoTab;
