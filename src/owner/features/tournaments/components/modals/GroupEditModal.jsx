import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { useGroupUpdate } from "../../hooks/useGroups";

const GroupEditModal = ({ close, group, stageId }) => {
  const state = useObjectState({ code: "", maxTeams: 20 });
  const { mutateAsync, isPending } = useGroupUpdate(stageId);

  useEffect(() => {
    if (group) {
      state.setFields({ code: group.code || "", maxTeams: group.maxTeams || 20 });
    }
  }, [group]);

  if (!group) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      id: group._id,
      body: {
        code: state.code.trim().toUpperCase(),
        maxTeams: Number(state.maxTeams),
      },
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
          {isPending ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default GroupEditModal;
