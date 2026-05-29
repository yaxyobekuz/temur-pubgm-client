import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import {
  TOURNAMENT_MODE,
  TOURNAMENT_MODE_LABELS,
  PUBGM_MAPS,
  DEFAULT_STAGES_COUNT,
  MAX_STAGES_COUNT,
} from "@/shared/constants/tournament";
import { useTournamentCreate } from "../../hooks/useTournaments";

const MODE_OPTIONS = Object.values(TOURNAMENT_MODE).map((v) => ({
  value: v,
  label: TOURNAMENT_MODE_LABELS[v],
}));

const TournamentCreateModal = ({ close }) => {
  const state = useObjectState({
    title: "",
    description: "",
    prizePool: "",
    mode: TOURNAMENT_MODE.SQUAD,
    startDate: "",
    banner: "",
    maps: [],
    maxTeams: 60,
    stagesCount: DEFAULT_STAGES_COUNT,
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
      startDate: state.startDate || undefined,
      banner: state.banner.trim(),
      maps: state.maps,
      maxTeams: Number(state.maxTeams) || 60,
      stagesCount: Number(state.stagesCount) || DEFAULT_STAGES_COUNT,
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <InputField
        label="Sarlavha"
        value={state.title}
        onChange={(e) => state.setField("title", e.target.value)}
        required
      />

      <SelectField
        label="Rejim"
        value={state.mode}
        onChange={(v) => state.setField("mode", v)}
        options={MODE_OPTIONS}
      />

      <InputField
        label="Boshlanish sanasi"
        type="datetime-local"
        value={state.startDate}
        onChange={(e) => state.setField("startDate", e.target.value)}
      />

      <InputField
        label="Mukofot fondi"
        value={state.prizePool}
        onChange={(e) => state.setField("prizePool", e.target.value)}
        placeholder="Masalan: 10,000,000 so'm"
      />

      <InputField
        label="Maks. komandalar"
        type="number"
        min={1}
        value={state.maxTeams}
        onChange={(e) => state.setField("maxTeams", e.target.value)}
      />

      <InputField
        label="Bosqichlar soni"
        type="number"
        min={1}
        max={MAX_STAGES_COUNT}
        value={state.stagesCount}
        onChange={(e) => state.setField("stagesCount", e.target.value)}
        description="Oxirgi bosqich Final hisoblanadi."
      />

      <InputField
        label="Banner URL"
        value={state.banner}
        onChange={(e) => state.setField("banner", e.target.value)}
        placeholder="https://..."
      />

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

      <InputField
        label="Izoh"
        type="textarea"
        value={state.description}
        onChange={(e) => state.setField("description", e.target.value)}
      />

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
