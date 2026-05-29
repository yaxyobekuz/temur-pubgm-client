import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import { useRegionUpdate } from "../../hooks/useRegionMutation";

const RegionEditModal = ({ close, region }) => {
  const { name, gmtOffset, setField, setFields } = useObjectState({
    name: "",
    gmtOffset: 0,
  });
  const { mutateAsync, isPending } = useRegionUpdate();

  useEffect(() => {
    if (region) {
      setFields({
        name: region.name || "",
        gmtOffset: region.gmtOffset ?? 0,
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
        gmtOffset: Number(gmtOffset),
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
        label="GMT soat farqi"
        type="number"
        min={-12}
        max={14}
        step={1}
        value={gmtOffset}
        onChange={(e) => setField("gmtOffset", e.target.value)}
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

export default RegionEditModal;
