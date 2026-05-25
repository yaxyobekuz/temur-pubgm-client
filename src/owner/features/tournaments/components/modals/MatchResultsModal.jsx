import { useEffect, useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { computeMatchPoints } from "@/shared/data/pubgPoints";
import { useRegistrationsByTournament } from "../../hooks/useRegistrations";
import { useMatchSetResults, useMatchQuery } from "../../hooks/useMatches";

const MatchResultsModal = ({ close, match, tournamentId }) => {
  const { data: latestMatch } = useMatchQuery(match?._id);
  const effectiveMatch = latestMatch || match;
  // Fetch ALL registrations for the tournament; then filter to the group's roster.
  const { data: regs = [] } = useRegistrationsByTournament(tournamentId);
  const { mutateAsync, isPending } = useMatchSetResults();
  const [rows, setRows] = useState([]);

  // Build initial rows = group's registered teams; pre-fill if results already exist.
  useEffect(() => {
    if (!effectiveMatch) return;
    const groupTeamIds = new Set((effectiveMatch.group?.teams || []).map(String));
    const groupRegs = regs.filter((r) => groupTeamIds.has(String(r._id)));
    const existing = new Map(
      (effectiveMatch.results || []).map((r) => [String(r.registration?._id || r.registration), r]),
    );
    setRows(
      groupRegs.map((reg) => {
        const prev = existing.get(String(reg._id));
        return {
          registration: reg._id,
          teamName: reg.team?.name || "-",
          place: prev?.place ?? "",
          kills: prev?.kills ?? "",
        };
      }),
    );
  }, [effectiveMatch?._id, regs.length]);

  if (!effectiveMatch) return null;

  const onChange = (i, key, value) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
  };

  const computeRow = (r) => {
    const place = r.place === "" ? null : Number(r.place);
    const kills = r.kills === "" ? 0 : Number(r.kills);
    return computeMatchPoints({ place: place || 0, kills });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const results = rows
      .filter((r) => r.place !== "" || r.kills !== "")
      .map((r) => ({
        registration: r.registration,
        place: r.place === "" ? null : Number(r.place),
        kills: r.kills === "" ? 0 : Number(r.kills),
      }));
    if (!results.length) return;
    await mutateAsync({ id: effectiveMatch._id, results });
    close?.();
  };

  if (!rows.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Bu guruhda hali komanda yo'q. Avval komandalarni guruhga biriktiring.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">
        Place + kills → points avtomatik hisoblanadi (PUBGM jadvali).
      </p>
      <div className="rounded-[2px] border bg-white max-h-96 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 font-medium">Komanda</th>
              <th className="px-3 py-2 font-medium w-20">Place</th>
              <th className="px-3 py-2 font-medium w-20">Kills</th>
              <th className="px-3 py-2 font-medium w-20 text-right">Ball</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.registration} className="border-t">
                <td className="px-3 py-2">{r.teamName}</td>
                <td className="px-3 py-2">
                  <Input
                    type="number"
                    min={1}
                    value={r.place}
                    onChange={(e) => onChange(i, "place", e.target.value)}
                    className="h-8"
                  />
                </td>
                <td className="px-3 py-2">
                  <Input
                    type="number"
                    min={0}
                    value={r.kills}
                    onChange={(e) => onChange(i, "kills", e.target.value)}
                    className="h-8"
                  />
                </td>
                <td className="px-3 py-2 text-right font-mono">{computeRow(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default MatchResultsModal;
