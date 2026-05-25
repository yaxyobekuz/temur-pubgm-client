import Button from "@/shared/components/ui/button/Button";
import { useRegistrationKick } from "../../hooks/useRegistrations";

const RegistrationKickModal = ({ close, registration, tournamentId }) => {
  const { mutateAsync, isPending } = useRegistrationKick(tournamentId);
  if (!registration) return null;

  const onConfirm = async () => {
    await mutateAsync(registration._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{registration.team?.name}</span> komandasini
        turnirdan chiqarmoqchimisiz?
      </p>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm} disabled={isPending}>
          {isPending ? "Bajarilmoqda..." : "Tasdiqlash"}
        </Button>
      </div>
    </div>
  );
};

export default RegistrationKickModal;
