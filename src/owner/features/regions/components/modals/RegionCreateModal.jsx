import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { useRegionCreate } from "../../hooks/useRegionMutation";

const initial = {
  name: "",
  nameRu: "",
  code: "",
  timezone: "Asia/Tashkent",
  isActive: true,
};

const RegionCreateModal = ({ close }) => {
  const { name, nameRu, code, timezone, isActive, setField, resetState } =
    useObjectState(initial);
  const { mutateAsync, isPending } = useRegionCreate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;
    await mutateAsync({
      name: name.trim(),
      nameRu: nameRu.trim(),
      code: code.trim().toLowerCase(),
      timezone: timezone.trim(),
      isActive,
    });
    resetState();
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Nomi (uz)
        <Input
          value={name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Masalan: Toshkent"
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Nomi (ru)
        <Input
          value={nameRu}
          onChange={(e) => setField("nameRu", e.target.value)}
          placeholder="Tashkent"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Kod (lotin)
        <Input
          value={code}
          onChange={(e) => setField("code", e.target.value)}
          placeholder="tashkent"
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Vaqt zonasi (IANA)
        <Input
          value={timezone}
          onChange={(e) => setField("timezone", e.target.value)}
          placeholder="Asia/Tashkent"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setField("isActive", e.target.checked)}
        />
        Faol
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

export default RegionCreateModal;
