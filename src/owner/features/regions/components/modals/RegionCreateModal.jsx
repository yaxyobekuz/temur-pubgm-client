import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import { useRegionCreate } from "../../hooks/useRegionMutation";

const RegionCreateModal = ({ close }) => {
  const { name, gmtOffset, setField, resetState } = useObjectState({
    name: "",
    gmtOffset: 5,
  });
  const { mutateAsync, isPending } = useRegionCreate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await mutateAsync({
      name: name.trim(),
      gmtOffset: Number(gmtOffset),
    });
    resetState();
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <InputField
        label="Nomi"
        value={name}
        onChange={(e) => setField("name", e.target.value)}
        placeholder="Masalan: O'zbekiston"
        required
      />
      <InputField
        label="GMT soat farqi"
        type="number"
        min={-12}
        max={14}
        step={1}
        value={gmtOffset}
        onChange={(e) => setField("gmtOffset", e.target.value)}
        description="O'zbekiston uchun 5, Rossiya (Moskva) uchun 3, va h.k."
        required
      />

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
