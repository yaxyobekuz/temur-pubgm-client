import Button from "@/shared/components/ui/button/Button";
import { useGroupRemove } from "../../hooks/useGroups";

const GroupDeleteModal = ({ close, group, stageId }) => {
  const { mutateAsync, isPending } = useGroupRemove(stageId);
  if (!group) return null;

  const onConfirm = async () => {
    await mutateAsync(group._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{group.code}</span> guruhini o'chirmoqchimisiz?
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

export default GroupDeleteModal;
