import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import Select from "@/shared/components/ui/select/Select";
import { useStagesQuery } from "../../hooks/useStages";
import { useGroupsQuery } from "../../hooks/useGroups";
import { useMatchCreate } from "../../hooks/useMatches";
import {
  STAGE_ORDER_LABELS,
  PUBGM_MAPS,
} from "@/shared/constants/tournament";

const MatchCreateModal = ({ close, tournament, defaultStageId, defaultGroupId }) => {
  const state = useObjectState({
    stageId: defaultStageId || "",
    groupId: defaultGroupId || "",
    order: "",
    map: "",
    startAt: "",
    roomId: "",
    roomPassword: "",
  });
  const { data: stages = [] } = useStagesQuery(tournament._id);
  const { data: groups = [] } = useGroupsQuery(state.stageId || defaultStageId);
  const { mutateAsync, isPending } = useMatchCreate();

  const stageOptions = stages.map((s) => ({
    value: s._id,
    label: STAGE_ORDER_LABELS[s.order],
  }));
  const groupOptions = groups.map((g) => ({
    value: g._id,
    label: `Guruh ${g.code}`,
  }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!state.groupId) return;
    await mutateAsync({
      groupId: state.groupId,
      order: state.order ? Number(state.order) : undefined,
      map: state.map.trim() || undefined,
      startAt: state.startAt || undefined,
      roomId: state.roomId.trim() || undefined,
      roomPassword: state.roomPassword.trim() || undefined,
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Bosqich
        <Select
          value={state.stageId}
          onChange={(v) => {
            state.setField("stageId", v);
            state.setField("groupId", "");
          }}
          options={[{ value: "", label: "Tanlang", disabled: true }, ...stageOptions]}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Guruh
        <Select
          value={state.groupId}
          onChange={(v) => state.setField("groupId", v)}
          options={[{ value: "", label: "Tanlang", disabled: true }, ...groupOptions]}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Tartib raqami (bo'sh = avtomatik)
        <Input
          type="number"
          min={1}
          value={state.order}
          onChange={(e) => state.setField("order", e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Xarita
        <Select
          value={state.map}
          onChange={(v) => state.setField("map", v)}
          options={[
            { value: "", label: "Tanlanmagan" },
            ...PUBGM_MAPS.map((m) => ({ value: m, label: m })),
          ]}
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
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1.5 text-sm">
          Xona ID
          <Input
            value={state.roomId}
            onChange={(e) => state.setField("roomId", e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Parol
          <Input
            value={state.roomPassword}
            onChange={(e) => state.setField("roomPassword", e.target.value)}
          />
        </label>
      </div>
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

export default MatchCreateModal;
