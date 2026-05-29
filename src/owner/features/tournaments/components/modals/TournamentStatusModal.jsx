import { useState } from "react";
import Button from "@/shared/components/ui/button/Button";
import Select from "@/shared/components/ui/select/Select";
import {
  allowedNextStatuses,
  TOURNAMENT_STATUS_LABELS,
} from "@/shared/constants/tournament";
import { useTournamentChangeStatus } from "../../hooks/useTournaments";

const TournamentStatusModal = ({ close, tournament }) => {
  const [next, setNext] = useState("");
  const { mutateAsync, isPending } = useTournamentChangeStatus();
  if (!tournament) return null;

  const options = allowedNextStatuses(tournament.status).map((s) => ({
    value: s,
    label: TOURNAMENT_STATUS_LABELS[s] || s,
  }));

  const onConfirm = async (e) => {
    e.preventDefault();
    if (!next) return;
    await mutateAsync({ id: tournament._id, next });
    close?.();
  };

  if (!options.length) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">Bu turnir uchun keyingi statuslar yo'q.</p>
        <div className="flex justify-end">
          <Button type="button" onClick={() => close?.()}>Yopish</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onConfirm} className="flex flex-col gap-4">
      <div className="text-sm">
        Hozirgi status:{" "}
        <span className="font-medium">
          {TOURNAMENT_STATUS_LABELS[tournament.status] || tournament.status}
        </span>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        Yangi status
        <Select
          value={next}
          onChange={setNext}
          options={[{ value: "", label: "Tanlang", disabled: true }, ...options]}
        />
      </label>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isPending || !next}>
          {isPending ? "Yangilanmoqda..." : "Tasdiqlash"}
        </Button>
      </div>
    </form>
  );
};

export default TournamentStatusModal;
