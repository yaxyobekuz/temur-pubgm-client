import { useEffect } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { useTeamUpdate } from "../../hooks/useTeamMutation";

const TeamEditModal = ({ close, team }) => {
  const { name, logo, isActive, setField, setFields } = useObjectState({
    name: "",
    logo: "",
    isActive: true,
  });
  const { mutateAsync, isPending } = useTeamUpdate();

  useEffect(() => {
    if (team) {
      setFields({
        name: team.name || "",
        logo: team.logo || "",
        isActive: !!team.isActive,
      });
    }
  }, [team]);

  if (!team) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      id: team._id,
      body: { name: name.trim(), logo: logo.trim(), isActive },
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Nomi
        <Input value={name} onChange={(e) => setField("name", e.target.value)} required />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Logo URL
        <Input value={logo} onChange={(e) => setField("logo", e.target.value)} />
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

export default TeamEditModal;
