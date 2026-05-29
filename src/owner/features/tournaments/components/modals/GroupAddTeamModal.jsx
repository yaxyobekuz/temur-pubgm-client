import { useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import SelectField from "@/shared/components/ui/select/SelectField";
import { useGroupAddTeam } from "../../hooks/useGroups";

const GroupAddTeamModal = ({ close, group, stageId, candidates = [] }) => {
  const [teamId, setTeamId] = useState("");
  const { mutateAsync, isPending } = useGroupAddTeam(stageId);
  if (!group) return null;

  const options = candidates.map((c) => ({
    value: c.registrationId,
    label: c.team?.name || c.registrationId,
  }));

  const onConfirm = async () => {
    if (!teamId) return;
    await mutateAsync({ id: group._id, teamId });
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">Guruh {group.code}</span> ga qaytariladigan
        komandani tanlang.
      </p>
      {options.length ? (
        <SelectField
          label="Komanda"
          value={teamId}
          onChange={setTeamId}
          options={options}
          placeholder="Komandani tanlang"
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          Qaytarish uchun mos komanda yo'q.
        </p>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="button" onClick={onConfirm} disabled={isPending || !teamId}>
          {isPending ? "Qo'shilmoqda..." : "Qo'shish"}
        </Button>
      </div>
    </div>
  );
};

export default GroupAddTeamModal;
