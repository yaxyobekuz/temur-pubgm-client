import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { useGroupUpdate } from "../../hooks/useGroups";

// Free-form team-ID textarea. Phase 3 will replace this with a registered-team picker.
const GroupAssignTeamsModal = ({ close, group, stageId }) => {
  const state = useObjectState({ teams: "" });
  const { mutateAsync, isPending } = useGroupUpdate(stageId);

  useEffect(() => {
    if (group) {
      state.setFields({ teams: (group.teams || []).join("\n") });
    }
  }, [group]);

  if (!group) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    const ids = state.teams
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    await mutateAsync({
      id: group._id,
      body: { teams: ids },
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Komanda ID'larini har birini yangi qatordan yoki vergul bilan yozing.
        Maks: {group.maxTeams}.
      </p>
      <label className="flex flex-col gap-1.5 text-sm">
        Komandalar
        <Input
          type="textarea"
          value={state.teams}
          onChange={(e) => state.setField("teams", e.target.value)}
          className="font-mono text-xs"
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

export default GroupAssignTeamsModal;
