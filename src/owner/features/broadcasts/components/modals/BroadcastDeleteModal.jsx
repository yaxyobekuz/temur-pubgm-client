import Button from "@/shared/components/ui/button/Button";
import { useBroadcastRemove } from "../../hooks/useBroadcasts";

const BroadcastDeleteModal = ({ close, broadcast }) => {
  const { mutateAsync, isPending } = useBroadcastRemove();
  if (!broadcast) return null;

  const onConfirm = async () => {
    await mutateAsync(broadcast._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{broadcast.title}</span> tarixini o'chirmoqchimisiz?
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

export default BroadcastDeleteModal;
