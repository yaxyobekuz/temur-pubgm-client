import Button from "@/shared/components/ui/button/Button";
import { useGroupRemoveTeam } from "../../hooks/useGroups";

const GroupRemoveTeamModal = ({ close, group, team, stageId }) => {
  const { mutateAsync, isPending } = useGroupRemoveTeam(stageId);
  if (!group || !team) return null;

  const onConfirm = async () => {
    await mutateAsync({ id: group._id, teamId: team.registrationId });
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">Guruh {group.code}</span> dan{" "}
        <span className="font-medium">
          {team.team?.name || team.registrationId}
        </span>{" "}
        komandasini chiqarmoqchimisiz?
      </p>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm} disabled={isPending}>
          {isPending ? "Chiqarilmoqda..." : "Tasdiqlash"}
        </Button>
      </div>
    </div>
  );
};

export default GroupRemoveTeamModal;
