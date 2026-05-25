import Button from "@/shared/components/ui/button/Button";
import { STAGE_ORDER_LABELS } from "@/shared/constants/tournament";
import { useStageRemove } from "../../hooks/useStages";

const StageDeleteModal = ({ close, stage, tournamentId }) => {
  const { mutateAsync, isPending } = useStageRemove(tournamentId);
  if (!stage) return null;

  const onConfirm = async () => {
    await mutateAsync(stage._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{STAGE_ORDER_LABELS[stage.order]}</span> bosqichini o'chirmoqchimisiz?
        Bosqichda guruhlar bo'lmasligi shart.
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

export default StageDeleteModal;
