import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import Select from "@/shared/components/ui/select/Select";
import {
  STAGE_STATUS,
  STAGE_STATUS_LABELS,
} from "@/shared/constants/tournament";
import { useStageUpdate } from "../../hooks/useStages";

const STATUS_OPTIONS = Object.values(STAGE_STATUS).map((v) => ({
  value: v,
  label: STAGE_STATUS_LABELS[v],
}));

const toLocalInput = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const StageEditModal = ({ close, stage, tournamentId }) => {
  const state = useObjectState({
    status: STAGE_STATUS.PENDING,
    startAt: "",
    endAt: "",
    maxGroups: 3,
    maxTeamsPerGroup: 20,
  });
  const { mutateAsync, isPending } = useStageUpdate(tournamentId);

  useEffect(() => {
    if (stage) {
      state.setFields({
        status: stage.status,
        startAt: toLocalInput(stage.startAt),
        endAt: toLocalInput(stage.endAt),
        maxGroups: stage.maxGroups,
        maxTeamsPerGroup: stage.maxTeamsPerGroup,
      });
    }
  }, [stage]);

  if (!stage) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      id: stage._id,
      body: {
        status: state.status,
        startAt: state.startAt ? new Date(state.startAt).toISOString() : null,
        endAt: state.endAt ? new Date(state.endAt).toISOString() : null,
        maxGroups: Number(state.maxGroups),
        maxTeamsPerGroup: Number(state.maxTeamsPerGroup),
      },
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Status
        <Select
          value={state.status}
          onChange={(v) => state.setField("status", v)}
          options={STATUS_OPTIONS}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Boshlanish
        <Input
          type="datetime-local"
          value={state.startAt}
          onChange={(e) => state.setField("startAt", e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Tugash
        <Input
          type="datetime-local"
          value={state.endAt}
          onChange={(e) => state.setField("endAt", e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Maks. guruhlar
        <Input
          type="number"
          min={1}
          value={state.maxGroups}
          onChange={(e) => state.setField("maxGroups", e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Guruhda maks. komandalar
        <Input
          type="number"
          min={1}
          value={state.maxTeamsPerGroup}
          onChange={(e) => state.setField("maxTeamsPerGroup", e.target.value)}
        />
      </label>
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

export default StageEditModal;
