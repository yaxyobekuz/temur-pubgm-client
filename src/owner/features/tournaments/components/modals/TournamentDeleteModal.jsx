import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/ui/button/Button";
import { useTournamentRemove } from "../../hooks/useTournaments";

const TournamentDeleteModal = ({ close, tournament, redirectAfter = false }) => {
  const nav = useNavigate();
  const { mutateAsync, isPending } = useTournamentRemove();
  if (!tournament) return null;

  const onConfirm = async () => {
    await mutateAsync(tournament._id);
    close?.();
    if (redirectAfter) nav("/owner/tournaments");
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{tournament.title}</span> turnirini o'chirmoqchimisiz?
        Faqat qoralama bosqichidagi turnirlarni o'chirish mumkin.
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

export default TournamentDeleteModal;
