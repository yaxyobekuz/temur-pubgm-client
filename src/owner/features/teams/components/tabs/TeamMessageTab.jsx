import { useState } from "react";
import { ImagePlus, Plus, Send, X } from "lucide-react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { BROADCAST_TARGET } from "@/shared/constants/broadcast";
import {
  useBroadcastCreate,
  useAudiencePreview,
  uploadsAPI,
} from "@/owner/features/broadcasts";

const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
  /\/api\/?$/,
  "",
);

// Inline composer (no modal) for messaging a single team via the broadcast pipeline.
const TeamMessageTab = ({ teamId }) => {
  const state = useObjectState({
    title: "",
    body: "",
    mediaUrl: "",
    buttons: [], // [{text, url}]
  });
  const [uploading, setUploading] = useState(false);
  const [sent, setSent] = useState(false);

  const { mutateAsync: create, isPending } = useBroadcastCreate();
  const {
    mutateAsync: preview,
    isPending: previewing,
    data: previewData,
  } = useAudiencePreview();

  const target = { type: BROADCAST_TARGET.TEAM, ids: [teamId] };

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

  const onFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadsAPI.image(file);
      state.setField("mediaUrl", `${apiBase}${res.data.data.url}`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const onPreview = async () => {
    await preview(target);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSent(false);
    await create({
      title: state.title.trim(),
      body: state.body,
      mediaUrl: state.mediaUrl.trim(),
      buttons: state.buttons.filter((b) => b.text.trim() && b.url.trim()),
      target,
    });
    state.resetState();
    setSent(true);
  };

  const absoluteMediaUrl = state.mediaUrl?.startsWith("/uploads/")
    ? `${apiBase}${state.mediaUrl}`
    : state.mediaUrl;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-[2px] border bg-white p-4"
    >
      <p className="text-sm text-muted-foreground">
        Xabar shu komandaning sardori va barcha a'zolariga bot orqali yuboriladi.
      </p>

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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemoveButton(i)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onPreview}
            disabled={previewing}
          >
            Qabul qiluvchilarni tekshirish
          </Button>
          {previewData && (
            <span className="text-sm text-muted-foreground">
              ~ {previewData.size} kishi
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {sent && <span className="text-sm text-primary">Yuborildi</span>}
          <Button type="submit" disabled={isPending}>
            <Send size={16} className="mr-1.5" />
            {isPending ? "Yuborilmoqda..." : "Yuborish"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TeamMessageTab;
