import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import Select from "@/shared/components/ui/select/Select";
import {
  ALL_STAGE_ORDERS,
  STAGE_ORDER_LABELS,
} from "@/shared/constants/tournament";
import { useStageCreate } from "../../hooks/useStages";

const ORDER_OPTIONS = ALL_STAGE_ORDERS.map((v) => ({
  value: String(v),
  label: STAGE_ORDER_LABELS[v],
}));

const StageCreateModal = ({ close, tournamentId, existingOrders = [] }) => {
  const state = useObjectState({
    order: "",
    startAt: "",
    endAt: "",
    maxGroups: 3,
    maxTeamsPerGroup: 20,
  });
  const { mutateAsync, isPending } = useStageCreate(tournamentId);

  const taken = new Set(existingOrders.map(String));
  const options = ORDER_OPTIONS.map((o) => ({ ...o, disabled: taken.has(o.value) }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!state.order) return;
    const orderRaw = state.order;
    const order = orderRaw === "final" ? "final" : Number(orderRaw);
    await mutateAsync({
      tournamentId,
      order,
      startAt: state.startAt || undefined,
      endAt: state.endAt || undefined,
      maxGroups: Number(state.maxGroups) || 3,
      maxTeamsPerGroup: Number(state.maxTeamsPerGroup) || 20,
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Bosqich
        <Select
          value={state.order}
          onChange={(v) => state.setField("order", v)}
          options={[{ value: "", label: "Tanlang", disabled: true }, ...options]}
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
          {isPending ? "Yaratilmoqda..." : "Yaratish"}
        </Button>
      </div>
    </form>
  );
};

export default StageCreateModal;
