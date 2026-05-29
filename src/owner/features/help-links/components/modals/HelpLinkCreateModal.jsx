import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { useHelpLinkCreate } from "../../hooks/useHelpLinks";

const HelpLinkCreateModal = ({ close }) => {
  const { name, url, order, setField, resetState } = useObjectState({
    name: "",
    url: "",
    order: 0,
  });
  const { mutateAsync, isPending } = useHelpLinkCreate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    await mutateAsync({
      name: name.trim(),
      url: url.trim(),
      order: Number(order) || 0,
    });
    resetState();
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Nomi
        <Input
          value={name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Masalan: Admin 1"
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Havola
        <Input
          value={url}
          onChange={(e) => setField("url", e.target.value)}
          placeholder="https://t.me/admin_1"
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Tartib raqami
        <Input
          type="number"
          value={order}
          onChange={(e) => setField("order", e.target.value)}
        />
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default HelpLinkCreateModal;
