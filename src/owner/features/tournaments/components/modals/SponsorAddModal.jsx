import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import Select from "@/shared/components/ui/select/Select";
import { useSponsorAdd } from "../../hooks/useTournaments";

const TYPE_OPTIONS = [
  { value: "telegram", label: "Telegram kanal/guruh" },
  { value: "social", label: "Boshqa ijtimoiy tarmoq" },
];

const SponsorAddModal = ({ close, tournament }) => {
  const state = useObjectState({
    type: "telegram",
    title: "",
    url: "",
    chatId: "",
    chatUsername: "",
  });
  const { mutateAsync, isPending } = useSponsorAdd();
  if (!tournament) return null;

  const isTelegram = state.type === "telegram";

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      id: tournament._id,
      body: {
        type: state.type,
        title: state.title.trim(),
        url: state.url.trim(),
        chatId: isTelegram ? state.chatId.trim() : "",
        chatUsername: isTelegram ? state.chatUsername.trim() : "",
      },
    });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        Turi
        <Select
          value={state.type}
          onChange={(v) => state.setField("type", v)}
          options={TYPE_OPTIONS}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Sarlavha
        <Input
          value={state.title}
          onChange={(e) => state.setField("title", e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        Havola
        <Input
          value={state.url}
          onChange={(e) => state.setField("url", e.target.value)}
          placeholder={isTelegram ? "https://t.me/..." : "https://..."}
          required
        />
      </label>
      {isTelegram && (
        <>
          <label className="flex flex-col gap-1.5 text-sm">
            Telegram username (ixtiyoriy)
            <Input
              value={state.chatUsername}
              onChange={(e) => state.setField("chatUsername", e.target.value)}
              placeholder="@channel_name"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            Chat ID (raqam - obunani tekshirish uchun)
            <Input
              value={state.chatId}
              onChange={(e) => state.setField("chatId", e.target.value)}
              placeholder="-100..."
            />
            <span className="text-xs text-muted-foreground">
              Bot kanalga admin sifatida qo'shilgan bo'lishi kerak. 
            </span>
          </label>
        </>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={() => close?.()}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Qo'shilmoqda..." : "Qo'shish"}
        </Button>
      </div>
    </form>
  );
};

export default SponsorAddModal;
