import { useMemo, useState } from "react";
import { ArrowRight, Trash2 } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import Select from "@/shared/components/ui/select/Select";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import {
  TOURNAMENT_STATUS,
  getStageLabel,
  stageStatusFor,
  stageNumberFromStatus,
} from "@/shared/constants/tournament";
import { useGroupsQuery, useGroupRemoveTeam } from "../../hooks/useGroups";

const isStageActive = (tournament, stageOrder) => {
  const expected = stageStatusFor(stageOrder, tournament.stagesCount);
  return tournament.status === expected;
};

const currentStageOrder = (tournament) => {
  if (tournament.status === TOURNAMENT_STATUS.FINAL) return tournament.stagesCount;
  return stageNumberFromStatus(tournament.status);
};

const GroupsTab = ({ tournament }) => {
  const { openModal } = useModal();
  const stages = tournament.stages || [];
  const total = tournament.stagesCount || stages.length;

  const defaultStage = useMemo(() => {
    const order = currentStageOrder(tournament);
    if (order) return stages.find((s) => s.order === order);
    return stages[0];
  }, [tournament, stages]);

  const [stageId, setStageId] = useState(defaultStage?._id || "");
  const stage = stages.find((s) => s._id === stageId) || defaultStage;
  const effectiveStageId = stage?._id;

  const { data: groups = [], isLoading } = useGroupsQuery(effectiveStageId);
  const removeTeam = useGroupRemoveTeam(effectiveStageId);

  if (!stages.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
        Bosqichlar yo'q
      </div>
    );
  }

  const stageOptions = stages.map((s) => ({
    value: s._id,
    label: getStageLabel(s.order, total),
  }));

  const active = stage && isStageActive(tournament, stage.order);
  const isLastStage = stage?.order === total;
  const canPromote = active && !isLastStage;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label className="flex flex-col gap-1.5 text-sm">
          Bosqich
          <div className="min-w-44">
            <Select
              value={effectiveStageId}
              onChange={(v) => setStageId(v)}
              options={stageOptions}
            />
          </div>
        </label>
        {canPromote && (
          <Button
            onClick={() =>
              openModal(MODAL.STAGE_PROMOTE, { tournament, currentStage: stage, groups })
            }
          >
            <ArrowRight size={16} className="mr-1" />
            Keyingi bosqichga o'tkazish
          </Button>
        )}
      </div>

      {!active ? (
        <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
          Bu bosqich hozir aktiv emas. Turnir statusi:{" "}
          <span className="font-medium">{tournament.status}</span>.
        </div>
      ) : isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
      ) : !groups.length ? (
        <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
          Bu bosqichda guruhlar yo'q
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {groups.map((g) => (
            <div key={g._id} className="rounded-[2px] border bg-white p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg">Guruh {g.code}</div>
                <Badge variant="secondary">
                  {g.teams?.length || 0} / {g.maxTeams}
                </Badge>
              </div>
              {g.teams?.length ? (
                <ul className="flex flex-col divide-y text-sm">
                  {g.teams.map((t) => (
                    <li
                      key={t.registrationId}
                      className="flex items-center justify-between py-1.5"
                    >
                      <span className="truncate">
                        {t.team?.name || (
                          <span className="font-mono text-xs">{t.registrationId}</span>
                        )}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={removeTeam.isPending}
                        onClick={() =>
                          removeTeam.mutate({ id: g._id, teamId: t.registrationId })
                        }
                      >
                        <Trash2 size={14} />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-muted-foreground">Komanda yo'q</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsTab;
