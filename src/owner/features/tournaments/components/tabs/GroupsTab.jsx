import { Pencil, Plus, Trash2, Users } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import Select from "@/shared/components/ui/select/Select";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { STAGE_ORDER_LABELS } from "@/shared/constants/tournament";
import { useStagesQuery } from "../../hooks/useStages";
import { useGroupsQuery } from "../../hooks/useGroups";

const GroupsTab = ({ tournament, stageId, onStageChange }) => {
  const { openModal } = useModal();
  const { data: stages = [] } = useStagesQuery(tournament._id);
  const stage = stages.find((s) => s._id === stageId) || stages[0];
  const effectiveStageId = stage?._id;
  const { data: groups = [], isLoading } = useGroupsQuery(effectiveStageId);

  const stageOptions = stages.map((s) => ({
    value: s._id,
    label: STAGE_ORDER_LABELS[s.order],
  }));

  if (!stages.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
        Avval Bosqichlar yarating
      </div>
    );
  }

  const canAdd = stage && groups.length < stage.maxGroups;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label className="flex flex-col gap-1.5 text-sm">
          Bosqich
          <div className="min-w-44">
            <Select
              value={effectiveStageId}
              onChange={(v) => onStageChange?.(v)}
              options={stageOptions}
            />
          </div>
        </label>
        <Button
          disabled={!canAdd}
          onClick={() => openModal(MODAL.GROUP_CREATE, { stage })}
        >
          <Plus size={16} className="mr-1" />
          Guruh qo'shish
        </Button>
      </div>

      {isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
      ) : !groups.length ? (
        <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
          Guruhlar yo'q
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {groups.map((g) => (
            <div key={g._id} className="rounded-[2px] border bg-white p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg">{g.code}</div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openModal(MODAL.GROUP_ASSIGN_TEAMS, { group: g, stageId: effectiveStageId })
                    }
                  >
                    <Users size={16} className="mr-1" />
                    Komandalar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openModal(MODAL.GROUP_EDIT, { group: g, stageId: effectiveStageId })
                    }
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openModal(MODAL.GROUP_DELETE, { group: g, stageId: effectiveStageId })
                    }
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary">
                  {g.teams?.length || 0} / {g.maxTeams}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsTab;
