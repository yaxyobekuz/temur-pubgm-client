import { useState } from "react";
import { Plus, Send, X } from "lucide-react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import InputField from "@/shared/components/ui/input/InputField";
import InputHttps from "@/shared/components/ui/input/InputHttps";
import ImageUpload from "@/shared/components/ui/upload/ImageUpload";
import { BROADCAST_TARGET } from "@/shared/constants/broadcast";
import { useBroadcastCreate } from "@/owner/features/broadcasts";

// Inline composer (no modal) for messaging a single user via the broadcast pipeline.
const UserMessageTab = ({ userId, hasTelegram = true }) => {
  const state = useObjectState({
    title: "",
    body: "",
    mediaUrl: "",
    buttons: [], // [{text, url}]
  });
  const [sent, setSent] = useState(false);

  const { mutateAsync: create, isPending } = useBroadcastCreate();

  const target = { type: BROADCAST_TARGET.USER, ids: [userId] };

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

  if (!hasTelegram) {
    return (
      <div className="rounded-[2px] border bg-white p-4 text-sm text-muted-foreground">
        Bu foydalanuvchi Telegram orqali ulanmagan, shuning uchun xabar yuborib bo'lmaydi.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-[2px] border bg-white p-4"
    >
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
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => onRemoveButton(i)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        {sent && <span className="text-sm text-primary">Yuborildi</span>}
        <Button type="submit" disabled={isPending}>
          <Send size={16} className="mr-1.5" />
          {isPending ? "Yuborilmoqda..." : "Yuborish"}
        </Button>
      </div>
    </form>
  );
};

export default UserMessageTab;
