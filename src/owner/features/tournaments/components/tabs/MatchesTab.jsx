import { useMemo } from "react";
import { Pencil, Plus, Send, Trash2, ClipboardList } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { STAGE_ORDER_LABELS } from "@/shared/constants/tournament";
import { useMatchesByTournamentQuery } from "../../hooks/useMatches";
import MatchStatusBadge from "../MatchStatusBadge";

const formatDate = (iso) => (iso ? new Date(iso).toLocaleString("uz-UZ") : "-");

const MatchesTab = ({ tournament }) => {
  const { openModal } = useModal();
  const { data: matches = [], isLoading } = useMatchesByTournamentQuery(tournament._id);

  // Group by Stage → Group code
  const grouped = useMemo(() => {
    const byStage = new Map();
    for (const m of matches) {
      const stageKey = m.stage?._id || "-";
      const groupKey = m.group?.code || "-";
      if (!byStage.has(stageKey)) {
        byStage.set(stageKey, { stage: m.stage, groups: new Map() });
      }
      const stage = byStage.get(stageKey);
      if (!stage.groups.has(groupKey)) stage.groups.set(groupKey, { group: m.group, items: [] });
      stage.groups.get(groupKey).items.push(m);
    }
    return [...byStage.values()];
  }, [matches]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Matchlar bosqich va guruh bo'yicha guruhlangan.
        </p>
        <Button onClick={() => openModal(MODAL.MATCH_CREATE, { tournament })}>
          <Plus size={16} className="mr-1" />
          Yangi match
        </Button>
      </div>

      {isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>
      ) : !matches.length ? (
        <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
          Matchlar yo'q
        </div>
      ) : (
        grouped.map(({ stage, groups }) => (
          <section key={stage?._id || "none"} className="flex flex-col gap-2">
            <div className="text-sm font-medium">
              {STAGE_ORDER_LABELS[stage?.order] || "Bosqich"}
            </div>
            {[...groups.values()].map(({ group, items }) => (
              <div key={group?._id} className="rounded-[2px] border bg-white">
                <div className="px-3 py-2 border-b text-sm font-medium bg-muted/30">
                  Guruh {group?.code}
                </div>
                <ul>
                  {items.map((m) => (
                    <li
                      key={m._id}
                      className="border-t first:border-t-0 px-3 py-2 flex items-center justify-between gap-3"
                    >
                      <div className="text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">#{m.order}</span>
                          {m.map && (
                            <span className="text-xs text-muted-foreground">{m.map}</span>
                          )}
                          <MatchStatusBadge status={m.status} />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(m.startAt)}
                          {m.roomId && ` • Room: ${m.roomId}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openModal(MODAL.MATCH_BROADCAST_ROOM, { match: m })
                          }
                        >
                          <Send size={16} className="mr-1" />
                          Xona
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openModal(MODAL.MATCH_RESULTS, {
                              match: m,
                              tournamentId: tournament._id,
                            })
                          }
                        >
                          <ClipboardList size={16} className="mr-1" />
                          Natija
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openModal(MODAL.MATCH_EDIT, { match: m })}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openModal(MODAL.MATCH_DELETE, { match: m })}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  );
};

export default MatchesTab;
