import Button from "@/shared/components/ui/button/Button";
import { useTeamRemove } from "../../hooks/useTeamMutation";

const TeamDeleteModal = ({ close, team }) => {
  const { mutateAsync, isPending } = useTeamRemove();
  if (!team) return null;

  const onConfirm = async () => {
    await mutateAsync(team._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{team.name}</span> komandasini o'chirmoqchimisiz?
        Bu amal ortga qaytarib bo'lmaydi.
      </p>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm} disabled={isPending}>
          {isPending ? "O'chirilmoqda..." : "Tasdiqlash"}
        </Button>
      </div>
    </div>
  );
};

export default TeamDeleteModal;
