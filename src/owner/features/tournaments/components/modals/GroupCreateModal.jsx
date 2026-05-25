import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { useGroupCreate } from "../../hooks/useGroups";

const GroupCreateModal = ({ close, stage }) => {
  const state = useObjectState({ code: "", maxTeams: 20 });
  const { mutateAsync, isPending } = useGroupCreate(stage?._id);
  if (!stage) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!state.code.trim()) return;
    await mutateAsync({
      stageId: stage._id,
      code: state.code.trim().toUpperCase(),
      maxTeams: Number(state.maxTeams) || 20,
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Guruh kodi
        <Input
          value={state.code}
          onChange={(e) => state.setField("code", e.target.value.toUpperCase())}
          placeholder="A, B, C..."
          maxLength={8}
          required
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

export default GroupCreateModal;
