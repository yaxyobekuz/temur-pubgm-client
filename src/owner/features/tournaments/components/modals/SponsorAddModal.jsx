import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import SelectField from "@/shared/components/ui/select/SelectField";
import { useSponsorAdd } from "../../hooks/useTournaments";
import { isPrivateTelegramUrl } from "../../utils/sponsorChannel";

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
  });
  const { mutateAsync, isPending } = useSponsorAdd();
  if (!tournament) return null;

  const isTelegram = state.type === "telegram";
  const isPrivate = isTelegram && isPrivateTelegramUrl(state.url);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isPrivate && !state.chatId.trim()) return;
    const body = {
      type: state.type,
      title: state.title.trim(),
      url: state.url.trim(),
    };
    if (isPrivate && state.chatId.trim()) {
      body.chatId = state.chatId.trim();
    }
    await mutateAsync({ id: tournament._id, body });
    close?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <SelectField
        label="Turi"
        value={state.type}
        onChange={(v) => state.setField("type", v)}
        options={TYPE_OPTIONS}
      />
      <InputField
        label="Sarlavha"
        value={state.title}
        onChange={(e) => state.setField("title", e.target.value)}
        required
      />
      <InputField
        label="Havola"
        value={state.url}
        onChange={(e) => state.setField("url", e.target.value)}
        placeholder={isTelegram ? "https://t.me/..." : "https://..."}
        required
      />
      {isPrivate && (
        <InputField
          label="Chat ID"
          value={state.chatId}
          onChange={(e) => state.setField("chatId", e.target.value)}
          placeholder="-100..."
          required
          description="Yopiq kanal aniqlandi. Chat ID kiriting (bot kanalga admin sifatida qo'shilgan bo'lishi kerak)."
        />
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
