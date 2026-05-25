import { useState, useEffect } from "react";
import Select from "@/shared/components/ui/select/Select";
import Badge from "@/shared/components/ui/badge/Badge";
import { STAGE_ORDER_LABELS } from "@/shared/constants/tournament";
import { useStagesQuery } from "../../hooks/useStages";
import { useStandingsQuery } from "../../hooks/useMatches";

const StandingsTab = ({ tournament }) => {
  const { data: stages = [] } = useStagesQuery(tournament._id);
  const [stageId, setStageId] = useState("");

  useEffect(() => {
    if (!stageId && stages.length) setStageId(stages[0]._id);
  }, [stages, stageId]);

  const { data: rows = [], isLoading } = useStandingsQuery(stageId);

  if (!stages.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
        Avval Bosqichlar yarating
      </div>
    );
  }

  const stageOptions = stages.map((s) => ({
    value: s._id,
    label: STAGE_ORDER_LABELS[s.order],
  }));

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm w-44">
        Bosqich
        <Select value={stageId} onChange={setStageId} options={stageOptions} />
      </label>

      {isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
      ) : !rows.length ? (
        <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
          Hozircha natija yo'q (matchlar yakunlanmagan)
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-[2px] border bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 font-medium w-12 text-center">#</th>
                <th className="px-3 py-2 font-medium">Komanda</th>
                <th className="px-3 py-2 font-medium">Guruh</th>
                <th className="px-3 py-2 font-medium text-right">Matchlar</th>
                <th className="px-3 py-2 font-medium text-right">Kills</th>
                <th className="px-3 py-2 font-medium text-right">Eng yaxshi place</th>
                <th className="px-3 py-2 font-medium text-right">Ball</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.registration} className="border-t">
                  <td className="px-3 py-2 text-center">{i + 1}</td>
                  <td className="px-3 py-2 font-medium">{r.team?.name || "-"}</td>
                  <td className="px-3 py-2">
                    {r.group?.code ? (
                      <Badge variant="secondary">{r.group.code}</Badge>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-3 py-2 text-right">{r.matchesPlayed}</td>
                  <td className="px-3 py-2 text-right">{r.totalKills}</td>
                  <td className="px-3 py-2 text-right">{r.bestPlace ?? "-"}</td>
                  <td className="px-3 py-2 text-right font-bold">{r.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StandingsTab;
