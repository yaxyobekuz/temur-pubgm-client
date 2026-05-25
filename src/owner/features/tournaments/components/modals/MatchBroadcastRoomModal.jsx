import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import { useMatchBroadcastRoom } from "../../hooks/useMatches";

const MatchBroadcastRoomModal = ({ close, match }) => {
  const { mutateAsync, isPending } = useMatchBroadcastRoom();
  if (!match) return null;

  const onConfirm = async () => {
    await mutateAsync(match._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Quyidagi xona ma'lumotlari guruh komandalariga yuboriladi:
      </p>
      <div className="rounded-[2px] border bg-white p-3 text-sm space-y-1">
        <div>
          Room ID: <span className="font-mono">{match.roomId || "-"}</span>
        </div>
        <div>
          Parol: <span className="font-mono">{match.roomPassword || "-"}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {match.map && <Badge variant="secondary">{match.map}</Badge>}
        </div>
      </div>
      {(!match.roomId || !match.roomPassword) && (
        <div className="text-xs text-destructive">
          Avval Match'ni tahrirlab room ID va parolni kiriting.
        </div>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          disabled={isPending || !match.roomId || !match.roomPassword}
        >
          {isPending ? "Yuborilmoqda..." : "Yuborish"}
        </Button>
      </div>
    </div>
  );
};

export default MatchBroadcastRoomModal;
