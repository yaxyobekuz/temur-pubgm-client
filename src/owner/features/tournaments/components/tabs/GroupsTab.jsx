import { useMemo, useState } from "react";
import { ArrowRight, Trash2, UserPlus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import SelectField from "@/shared/components/ui/select/SelectField";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { TOURNAMENT_STATUS, getStageLabel } from "@/shared/constants/tournament";
import { REGISTRATION_STATUS } from "@/shared/constants/registration";
import { useGroupsQuery } from "../../hooks/useGroups";
import { useRegistrationsByTournament } from "../../hooks/useRegistrations";

// A stage is active only while the tournament is ONGOING and sitting on that stage.
const isStageActive = (tournament, stageOrder) =>
  tournament.status === TOURNAMENT_STATUS.ONGOING &&
  stageOrder === tournament.currentStage;

const currentStageOrder = (tournament) =>
  tournament.status === TOURNAMENT_STATUS.ONGOING ? tournament.currentStage : null;

const GroupsTab = ({ tournament }) => {
  const { openModal } = useModal();
  const stages = useMemo(() => tournament.stages || [], [tournament.stages]);
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
  const { data: registrations = [] } = useRegistrationsByTournament(
    tournament._id,
    REGISTRATION_STATUS.REGISTERED,
  );

  // Registered teams not currently placed in any group of this stage - can be (re)added.
  const candidates = useMemo(() => {
    const placed = new Set(
      groups.flatMap((g) => (g.teams || []).map((t) => String(t.registrationId))),
    );
    return registrations
      .filter((r) => !placed.has(String(r._id)))
      .map((r) => ({ registrationId: r._id, team: r.team }));
  }, [groups, registrations]);

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
        <SelectField
          label="Bosqich"
          className="min-w-44"
          value={effectiveStageId}
          onChange={(v) => setStageId(v)}
          options={stageOptions}
        />
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
          Bu bosqich hozir aktiv emas. Guruhlar turnir "Boshlandi" holatida va shu
          bosqichda bo'lganda ko'rinadi.
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
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold text-lg">Guruh {g.code}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {g.teams?.length || 0} / {g.maxTeams}
                  </Badge>
                  {(g.teams?.length || 0) < g.maxTeams && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!candidates.length}
                      onClick={() =>
                        openModal(MODAL.GROUP_ADD_TEAM, {
                          group: g,
                          stageId: effectiveStageId,
                          candidates,
                        })
                      }
                    >
                      <UserPlus size={14} className="mr-1" />
                      Komanda qo'shish
                    </Button>
                  )}
                </div>
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
                        onClick={() =>
                          openModal(MODAL.GROUP_REMOVE_TEAM, {
                            group: g,
                            team: t,
                            stageId: effectiveStageId,
                          })
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
