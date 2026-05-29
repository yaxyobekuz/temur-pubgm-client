import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import Switch from "@/shared/components/ui/switch/Switch";
import { useHelpLinkUpdate } from "../../hooks/useHelpLinks";

const HelpLinkEditModal = ({ close, link }) => {
  const { name, url, order, isActive, setField, setFields } = useObjectState({
    name: "",
    url: "",
    order: 0,
    isActive: true,
  });
  const { mutateAsync, isPending } = useHelpLinkUpdate();

  useEffect(() => {
    if (link) {
      setFields({
        name: link.name || "",
        url: link.url || "",
        order: link.order ?? 0,
        isActive: link.isActive ?? true,
      });
    }
  }, [link]);

  if (!link) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      id: link._id,
      body: {
        name: name.trim(),
        url: url.trim(),
        order: Number(order) || 0,
        isActive: !!isActive,
      },
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <InputField
        label="Nomi"
        value={name}
        onChange={(e) => setField("name", e.target.value)}
        required
      />
      <InputField
        label="Havola"
        value={url}
        onChange={(e) => setField("url", e.target.value)}
        required
      />
      <InputField
        label="Tartib raqami"
        type="number"
        value={order}
        onChange={(e) => setField("order", e.target.value)}
      />
      <label className="flex items-center justify-between gap-3 text-sm">
        Faol
        <Switch
          checked={isActive}
          onChange={(v) => setField("isActive", v)}
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

export default HelpLinkEditModal;
