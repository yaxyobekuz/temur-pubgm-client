import { useEffect, useMemo } from "react";
import { Plus, X } from "lucide-react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import InputField from "@/shared/components/ui/input/InputField";
import InputHttps from "@/shared/components/ui/input/InputHttps";
import SelectField from "@/shared/components/ui/select/SelectField";
import ImageUpload from "@/shared/components/ui/upload/ImageUpload";
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

  const { data: regionsData } = useRegionsQuery({ limit: 200 });
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

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <InputField
        label="Sarlavha"
        value={state.title}
        onChange={(e) => state.setField("title", e.target.value)}
        required
      />

      <InputField
        label="Matn"
        type="textarea"
        value={state.body}
        onChange={(e) => state.setField("body", e.target.value)}
      />

      <ImageUpload
        label="Rasm (ixtiyoriy)"
        value={state.mediaUrl}
        onChange={(v) => state.setField("mediaUrl", v)}
      />

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
              <InputHttps
                value={b.url}
                onChange={(e) => onChangeButton(i, "url", e.target.value)}
              />
              <Button type="button" variant="danger" size="sm" onClick={() => onRemoveButton(i)}>
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <SelectField
        label="Auditoriya"
        value={state.targetType}
        onChange={(v) => state.setField("targetType", v)}
        options={TARGET_OPTIONS}
      />

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

      <InputField
        label="Yuborish vaqti (bo'sh = darhol)"
        type="datetime-local"
        value={state.scheduledAt}
        onChange={(e) => state.setField("scheduledAt", e.target.value)}
      />

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
