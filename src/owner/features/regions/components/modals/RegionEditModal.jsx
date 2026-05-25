import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { useRegionUpdate } from "../../hooks/useRegionMutation";

const RegionEditModal = ({ close, region }) => {
  const { name, nameRu, code, timezone, isActive, setField, setFields } =
    useObjectState({
      name: "",
      nameRu: "",
      code: "",
      timezone: "Asia/Tashkent",
      isActive: true,
    });
  const { mutateAsync, isPending } = useRegionUpdate();

  useEffect(() => {
    if (region) {
      setFields({
        name: region.name || "",
        nameRu: region.nameRu || "",
        code: region.code || "",
        timezone: region.timezone || "Asia/Tashkent",
        isActive: !!region.isActive,
      });
    }
  }, [region]);

  if (!region) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      id: region._id,
      body: {
        name: name.trim(),
        nameRu: nameRu.trim(),
        code: code.trim().toLowerCase(),
        timezone: timezone.trim(),
        isActive,
      },
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Nomi (uz)
        <Input value={name} onChange={(e) => setField("name", e.target.value)} required />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Nomi (ru)
        <Input value={nameRu} onChange={(e) => setField("nameRu", e.target.value)} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Kod (lotin)
        <Input value={code} onChange={(e) => setField("code", e.target.value)} required />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Vaqt zonasi (IANA)
        <Input value={timezone} onChange={(e) => setField("timezone", e.target.value)} />
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

export default RegionEditModal;
