import Button from "@/shared/components/ui/button/Button";
import { useBroadcastCancel } from "../../hooks/useBroadcasts";

const BroadcastCancelModal = ({ close, broadcast }) => {
  const { mutateAsync, isPending } = useBroadcastCancel();
  if (!broadcast) return null;

  const onConfirm = async () => {
    await mutateAsync(broadcast._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{broadcast.title}</span> yuborilishini bekor qilmoqchimisiz?
        Hozircha yuborilgan xabarlar qaytarib olinmaydi.
      </p>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Yopish
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm} disabled={isPending}>
          {isPending ? "Bekor qilinmoqda..." : "Tasdiqlash"}
        </Button>
      </div>
    </div>
  );
};

export default BroadcastCancelModal;
