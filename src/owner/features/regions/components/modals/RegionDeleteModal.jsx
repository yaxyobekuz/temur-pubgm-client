import Button from "@/shared/components/ui/button/Button";
import { useRegionRemove } from "../../hooks/useRegionMutation";

const RegionDeleteModal = ({ close, region }) => {
  const { mutateAsync, isPending } = useRegionRemove();
  if (!region) return null;

  const onConfirm = async () => {
    await mutateAsync(region._id);
    close?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        <span className="font-medium">{region.name}</span> mintaqasini o'chirmoqchimisiz?
        Agar mintaqa foydalanilayotgan bo'lsa, faqat nofaol qilinadi.
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

export default RegionDeleteModal;
