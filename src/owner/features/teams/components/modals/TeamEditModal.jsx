import { useEffect, useState } from "react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import { uploadsAPI } from "@/owner/features/broadcasts/api/uploads.api";
import { toMediaUrl } from "@/shared/utils/mediaUrl";
import { useTeamUpdate } from "../../hooks/useTeamMutation";

const TeamEditModal = ({ close, team }) => {
  const { name, logo, isActive, setField, setFields } = useObjectState({
    name: "",
    logo: "",
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
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

  const onPickFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const res = await uploadsAPI.image(file);
      setField("logo", res.data.data.url);
    } catch (err) {
      setUploadError(err?.response?.data?.message || "Rasmni yuklab bo'lmadi");
    } finally {
      setUploading(false);
    }
  };

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
      <InputField
        label="Nomi"
        value={name}
        onChange={(e) => setField("name", e.target.value)}
        required
      />

      <div className="flex flex-col gap-1.5 text-sm">
        Logotip
        <div className="flex items-center gap-3">
          {logo ? (
            <img
              src={toMediaUrl(logo)}
              alt="logo"
              className="size-14 rounded-[2px] border object-cover"
            />
          ) : (
            <div className="size-14 rounded-[2px] border bg-muted" />
          )}
          <div className="flex flex-col gap-1">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={onPickFile}
              disabled={uploading}
              className="text-xs"
            />
            {logo && (
              <button
                type="button"
                className="text-xs text-destructive text-left"
                onClick={() => setField("logo", "")}
              >
                Logotipni olib tashlash
              </button>
            )}
          </div>
        </div>
        {uploading && <span className="text-xs text-muted-foreground">Yuklanmoqda...</span>}
        {uploadError && <span className="text-xs text-destructive">{uploadError}</span>}
      </div>

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
        <Button type="submit" disabled={isPending || uploading}>
          {isPending ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </form>
  );
};

export default TeamEditModal;
