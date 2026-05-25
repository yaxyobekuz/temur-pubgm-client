import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import Select from "@/shared/components/ui/select/Select";
import { useMatchUpdate } from "../../hooks/useMatches";
import {
  MATCH_STATUS,
  MATCH_STATUS_LABELS,
} from "@/shared/constants/match";
import { PUBGM_MAPS } from "@/shared/constants/tournament";

const STATUS_OPTIONS = Object.values(MATCH_STATUS).map((v) => ({
  value: v,
  label: MATCH_STATUS_LABELS[v],
}));

const toLocalInput = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const MatchEditModal = ({ close, match }) => {
  const state = useObjectState({
    map: "",
    startAt: "",
    roomId: "",
    roomPassword: "",
    status: MATCH_STATUS.SCHEDULED,
    order: 1,
  });
  const { mutateAsync, isPending } = useMatchUpdate();

  useEffect(() => {
    if (match) {
      state.setFields({
        map: match.map || "",
        startAt: toLocalInput(match.startAt),
        roomId: match.roomId || "",
        roomPassword: match.roomPassword || "",
        status: match.status,
        order: match.order,
      });
    }
  }, [match]);

  if (!match) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      id: match._id,
      body: {
        map: state.map.trim(),
        startAt: state.startAt ? new Date(state.startAt).toISOString() : null,
        roomId: state.roomId.trim(),
        roomPassword: state.roomPassword.trim(),
        status: state.status,
        order: Number(state.order),
      },
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
      <label className="flex flex-col gap-1.5 text-sm">
        Status
        <Select
          value={state.status}
          onChange={(v) => state.setField("status", v)}
          options={STATUS_OPTIONS}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Tartib raqami
        <Input
          type="number"
          min={1}
          value={state.order}
          onChange={(e) => state.setField("order", e.target.value)}
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

export default MatchEditModal;
