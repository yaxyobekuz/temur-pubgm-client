import Button from "@/shared/components/ui/button/Button";
import { useMatchRemove } from "../../hooks/useMatches";

const MatchDeleteModal = ({ close, match }) => {
  const { mutateAsync, isPending } = useMatchRemove();
  if (!match) return null;

  const onConfirm = async () => {
    await mutateAsync(match._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">Match #{match.order}</span>'ni o'chirmoqchimisiz?
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

export default MatchDeleteModal;
