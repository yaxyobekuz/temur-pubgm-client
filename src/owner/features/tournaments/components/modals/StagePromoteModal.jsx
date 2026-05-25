import { useMemo, useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import { getStageLabel } from "@/shared/constants/tournament";
import { usePromoteToNextStage } from "../../hooks/useTournaments";

const StagePromoteModal = ({ close, tournament, currentStage, groups = [] }) => {
  const allTeamIds = useMemo(
    () => groups.flatMap((g) => (g.teams || []).map((t) => t.registrationId)),
    [groups],
  );
  const [selected, setSelected] = useState(() => new Set(allTeamIds));
  const { mutateAsync, isPending } = usePromoteToNextStage();

  if (!tournament || !currentStage) return null;

  const nextOrder = currentStage.order + 1;
  const total = tournament.stagesCount;
  const currentLabel = getStageLabel(currentStage.order, total);
  const nextLabel = getStageLabel(nextOrder, total);

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    const teamIds = Array.from(selected);
    if (!teamIds.length) return;
    await mutateAsync({ id: tournament._id, teamIds });
    close?.();
  };

  return (
    <form onSubmit={onConfirm} className="flex flex-col gap-4">
      <div className="text-sm">
        <span className="font-medium">{currentLabel}</span> dan{" "}
        <span className="font-medium">{nextLabel}</span> ga o'tadigan komandalarni tanlang.
        Tanlangan: <Badge variant="secondary">{selected.size}</Badge>
      </div>

      {!groups.length ? (
        <div className="text-sm text-muted-foreground">
          Bu bosqichda guruhlar yo'q
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
          {groups.map((g) => (
            <div key={g._id} className="rounded-[2px] border bg-white p-3">
              <div className="mb-2 font-semibold">Guruh {g.code}</div>
              {g.teams?.length ? (
                <div className="flex flex-col divide-y">
                  {g.teams.map((teamId) => {
                    const id = String(teamId);
                    return (
                      <label
                        key={id}
                        className="flex items-center justify-between gap-2 py-1.5 cursor-pointer"
                      >
                        <span className="font-mono text-xs truncate">{id}</span>
                        <input
                          type="checkbox"
                          checked={selected.has(id)}
                          onChange={() => toggle(id)}
                        />
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">Komanda yo'q</div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isPending || !selected.size}>
          {isPending ? "Yuborilmoqda..." : "O'tkazish"}
        </Button>
      </div>
    </form>
  );
};

export default StagePromoteModal;
