import Button from "@/shared/components/ui/button/Button";
import { useSponsorRemove } from "../../hooks/useTournaments";

const SponsorDeleteModal = ({ close, tournamentId, channel }) => {
  const { mutateAsync, isPending } = useSponsorRemove();
  if (!channel) return null;

  const onConfirm = async () => {
    await mutateAsync({ id: tournamentId, channelId: channel._id });
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{channel.title}</span> kanalini olib tashlamoqchimisiz?
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

export default SponsorDeleteModal;
