import Button from "@/shared/components/ui/button/Button";
import { useHelpLinkRemove } from "../../hooks/useHelpLinks";

const HelpLinkDeleteModal = ({ close, link }) => {
  const { mutateAsync, isPending } = useHelpLinkRemove();
  if (!link) return null;

  const onConfirm = async () => {
    await mutateAsync(link._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{link.name}</span> havolasini o'chirmoqchimisiz?
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

export default HelpLinkDeleteModal;
