import { useEffect, useMemo, useState } from "react";
import { ImagePlus, Plus, X } from "lucide-react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import Select from "@/shared/components/ui/select/Select";
import {
  BROADCAST_TARGET,
  BROADCAST_TARGET_LABELS,
} from "@/shared/constants/broadcast";
import { ROLES, ROLE_LABELS } from "@/shared/constants/roles";
import { useRegionsQuery } from "@/owner/features/regions";
import { useTournamentsQuery } from "@/owner/features/tournaments";
import {
  useBroadcastCreate,
  useAudiencePreview,
} from "../../hooks/useBroadcasts";
import { uploadsAPI } from "../../api/uploads.api";

const TARGET_OPTIONS = Object.values(BROADCAST_TARGET).map((v) => ({
  value: v,
  label: BROADCAST_TARGET_LABELS[v],
}));

const ROLE_OPTIONS = [ROLES.PLAYER, ROLES.LEADER, ROLES.ADMIN].map((v) => ({
  value: v,
  label: ROLE_LABELS[v] || v,
}));

const BroadcastCreateModal = ({ close }) => {
  const state = useObjectState({
    title: "",
    body: "",
    mediaUrl: "",
    targetType: BROADCAST_TARGET.ALL,
    targetIds: [],
    scheduledAt: "",
    buttons: [], // [{text, url}]
  });
  const { mutateAsync: create, isPending } = useBroadcastCreate();
  const { mutateAsync: preview, isPending: previewing, data: previewData } =
    useAudiencePreview();

  const { data: regionsData } = useRegionsQuery({ isActive: true, limit: 200 });
  const { data: tournamentsData } = useTournamentsQuery({ limit: 200 });
  const regionOptions = (regionsData?.data || []).map((r) => ({
    value: r._id,
    label: r.name,
  }));
  const tournamentOptions = (tournamentsData?.data || []).map((t) => ({
    value: t._id,
    label: t.title,
  }));

  const targetPayload = useMemo(
    () => ({ type: state.targetType, ids: state.targetIds }),
    [state.targetType, state.targetIds],
  );

  useEffect(() => {
    state.setField("targetIds", []);
  }, [state.targetType]);

  const onAddButton = () => {
    if (state.buttons.length >= 6) return;
    state.setField("buttons", [...state.buttons, { text: "", url: "" }]);
  };
  const onChangeButton = (i, key, value) => {
    const next = state.buttons.map((b, idx) => (idx === i ? { ...b, [key]: value } : b));
    state.setField("buttons", next);
  };
  const onRemoveButton = (i) => {
    state.setField("buttons", state.buttons.filter((_, idx) => idx !== i));
  };

  const onPreview = async () => {
    await preview(targetPayload);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await create({
      title: state.title.trim(),
      body: state.body,
      mediaUrl: state.mediaUrl.trim(),
      buttons: state.buttons.filter((b) => b.text.trim() && b.url.trim()),
      target: targetPayload,
      scheduledAt: state.scheduledAt
        ? new Date(state.scheduledAt).toISOString()
        : undefined,
    });
    close?.();
  };

  const needsIds = state.targetType !== BROADCAST_TARGET.ALL;
  const idsOptions =
    state.targetType === BROADCAST_TARGET.ROLE
      ? ROLE_OPTIONS
      : state.targetType === BROADCAST_TARGET.REGION
      ? regionOptions
      : state.targetType === BROADCAST_TARGET.TOURNAMENT
      ? tournamentOptions
      : [];

  const toggleId = (value) => {
    const set = new Set(state.targetIds);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    state.setField("targetIds", [...set]);
  };

  const [uploading, setUploading] = useState(false);
  const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
    /\/api\/?$/,
    "",
  );
  const absoluteMediaUrl = state.mediaUrl?.startsWith("/uploads/")
    ? `${apiBase}${state.mediaUrl}`
    : state.mediaUrl;

  const onFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadsAPI.image(file);
      // Server returns a /uploads/... relative path; the bot fetches via the public URL.
      state.setField("mediaUrl", `${apiBase}${res.data.data.url}`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Sarlavha
        <Input
          value={state.title}
          onChange={(e) => state.setField("title", e.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        Matn (HTML qabul qilinadi)
        <Input
          type="textarea"
          value={state.body}
          onChange={(e) => state.setField("body", e.target.value)}
        />
      </label>

      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex items-center justify-between">
          <span>Rasm (ixtiyoriy)</span>
          <label className="cursor-pointer text-xs inline-flex items-center gap-1 text-primary hover:underline">
            <ImagePlus size={14} />
            {uploading ? "Yuklanmoqda..." : "Yuklash"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileSelected}
            />
          </label>
        </div>
        <Input
          value={state.mediaUrl}
          onChange={(e) => state.setField("mediaUrl", e.target.value)}
          placeholder="https://... yoki yuklang"
        />
        {absoluteMediaUrl && (
          <img
            src={absoluteMediaUrl}
            alt=""
            className="w-full max-h-40 object-cover rounded-[2px] border"
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex items-center justify-between">
          <span>Inline tugmalar (max 6)</span>
          <Button type="button" variant="outline" size="sm" onClick={onAddButton}>
            <Plus size={16} />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {state.buttons.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                placeholder="Matn"
                value={b.text}
                onChange={(e) => onChangeButton(i, "text", e.target.value)}
              />
              <Input
                placeholder="https://..."
                value={b.url}
                onChange={(e) => onChangeButton(i, "url", e.target.value)}
              />
              <Button type="button" variant="outline" size="sm" onClick={() => onRemoveButton(i)}>
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        Auditoriya
        <Select
          value={state.targetType}
          onChange={(v) => state.setField("targetType", v)}
          options={TARGET_OPTIONS}
        />
      </label>

      {needsIds && (
        <div className="flex flex-col gap-1.5 text-sm">
          Tanlovlar (bir nechtasini tanlash mumkin)
          <div className="flex flex-wrap gap-2">
            {idsOptions.map((o) => {
              const active = state.targetIds.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => toggleId(o.value)}
                  className={`rounded-[2px] border px-2.5 py-1 text-xs ${
                    active ? "bg-primary text-white border-primary" : "bg-white"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <label className="flex flex-col gap-1.5 text-sm">
        Yuborish vaqti (bo'sh = darhol)
        <Input
          type="datetime-local"
          value={state.scheduledAt}
          onChange={(e) => state.setField("scheduledAt", e.target.value)}
        />
      </label>

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={onPreview} disabled={previewing}>
          Auditoriyani tekshirish
        </Button>
        {previewData && (
          <span className="text-sm text-muted-foreground">
            ~ {previewData.size} kishi
          </span>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saqlanmoqda..." : "Yuborish"}
        </Button>
      </div>
    </form>
  );
};

export default BroadcastCreateModal;
