import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import Select from "@/shared/components/ui/select/Select";
import {
  TOURNAMENT_MODE,
  TOURNAMENT_MODE_LABELS,
  PUBGM_MAPS,
} from "@/shared/constants/tournament";
import { useRegionsQuery } from "@/owner/features/regions";
import { useTournamentCreate } from "../../hooks/useTournaments";

const MODE_OPTIONS = Object.values(TOURNAMENT_MODE).map((v) => ({
  value: v,
  label: TOURNAMENT_MODE_LABELS[v],
}));

const TournamentCreateModal = ({ close }) => {
  const { data: regionsData } = useRegionsQuery({ limit: 200 });
  const regionOptions = (regionsData?.data || []).map((r) => ({
    value: r._id,
    label: r.name,
  }));

  const state = useObjectState({
    title: "",
    description: "",
    prizePool: "",
    mode: TOURNAMENT_MODE.SQUAD,
    regionId: "",
    startDate: "",
    banner: "",
    maps: [],
    maxTeams: 60,
  });
  const { mutateAsync, isPending } = useTournamentCreate();

  const toggleMap = (m) => {
    const has = state.maps.includes(m);
    state.setField("maps", has ? state.maps.filter((x) => x !== m) : [...state.maps, m]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!state.title.trim()) return;
    await mutateAsync({
      title: state.title.trim(),
      description: state.description.trim(),
      prizePool: state.prizePool.trim(),
      mode: state.mode,
      regionId: state.regionId || undefined,
      startDate: state.startDate || undefined,
      banner: state.banner.trim(),
      maps: state.maps,
      maxTeams: Number(state.maxTeams) || 60,
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Sarlavha
        <Input
          value={state.title}
          onChange={(e) => state.setField("title", e.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Rejim
        <Select
          value={state.mode}
          onChange={(v) => state.setField("mode", v)}
          options={MODE_OPTIONS}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Mintaqa
        <Select
          value={state.regionId}
          onChange={(v) => state.setField("regionId", v)}
          options={[{ value: "", label: "Tanlanmagan" }, ...regionOptions]}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Boshlanish sanasi
        <Input
          type="datetime-local"
          value={state.startDate}
          onChange={(e) => state.setField("startDate", e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Mukofot fondi
        <Input
          value={state.prizePool}
          onChange={(e) => state.setField("prizePool", e.target.value)}
          placeholder="Masalan: 10,000,000 so'm"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Maks. komandalar
        <Input
          type="number"
          min={1}
          value={state.maxTeams}
          onChange={(e) => state.setField("maxTeams", e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Banner URL
        <Input
          value={state.banner}
          onChange={(e) => state.setField("banner", e.target.value)}
          placeholder="https://..."
        />
      </label>

      <div className="flex flex-col gap-1.5 text-sm">
        Xaritalar
        <div className="flex flex-wrap gap-2">
          {PUBGM_MAPS.map((m) => {
            const active = state.maps.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggleMap(m)}
                className={`rounded-[2px] border px-2.5 py-1 text-xs ${
                  active ? "bg-primary text-white border-primary" : "bg-white"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        Izoh
        <Input
          type="textarea"
          value={state.description}
          onChange={(e) => state.setField("description", e.target.value)}
        />
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </div>
    </form>
  );
};

export default TournamentCreateModal;
