import { Pencil, Plus, Trash2 } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import {
  STAGE_ORDER_LABELS,
  STAGE_STATUS_LABELS,
} from "@/shared/constants/tournament";
import { useStagesQuery } from "../../hooks/useStages";

const formatDate = (iso) => (iso ? new Date(iso).toLocaleString("uz-UZ") : "-");

const StagesTab = ({ tournament, onSelectStage }) => {
  const { openModal } = useModal();
  const { data: stages = [], isLoading } = useStagesQuery(tournament._id);
  const existingOrders = stages.map((s) => s.order);

  const canAdd = existingOrders.length < 3;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          1-bosqich → 2-bosqich → Final tartibida boriladi.
        </p>
        <Button
          disabled={!canAdd}
          onClick={() =>
            openModal(MODAL.STAGE_CREATE, {
              tournamentId: tournament._id,
              existingOrders,
            })
          }
        >
          <Plus size={16} className="mr-1" />
          Bosqich qo'shish
        </Button>
      </div>

      {isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
      ) : !stages.length ? (
        <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
          Bosqichlar yo'q
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {stages.map((s) => (
            <div
              key={s._id}
              className="rounded-[2px] border bg-white p-3 flex items-center justify-between gap-3"
            >
              <button
                type="button"
                className="text-left flex-1 cursor-pointer"
                onClick={() => onSelectStage?.(s)}
              >
                <div className="font-medium">{STAGE_ORDER_LABELS[s.order]}</div>
                <div className="text-xs text-muted-foreground">
                  {STAGE_STATUS_LABELS[s.status]} • {formatDate(s.startAt)} → {formatDate(s.endAt)}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <Badge variant="secondary">Guruhlar max: {s.maxGroups}</Badge>
                  <Badge variant="secondary">Guruhda max: {s.maxTeamsPerGroup}</Badge>
                </div>
              </button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    openModal(MODAL.STAGE_EDIT, { stage: s, tournamentId: tournament._id })
                  }
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    openModal(MODAL.STAGE_DELETE, { stage: s, tournamentId: tournament._id })
                  }
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StagesTab;
