import { useEffect } from "react";
import { ShieldCheck, ShieldAlert, Trash2 } from "lucide-react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import InputField from "@/shared/components/ui/input/InputField";
import { isPrivateTelegramUrl } from "../../utils/sponsorChannel";
import { useSecretGroupSet, useSecretGroupClear } from "../../hooks/useTournaments";

const SecretGroupTab = ({ tournament }) => {
  const sg = tournament.secretGroup || {};
  const state = useObjectState({ url: "", chatId: "" });
  const { mutateAsync: save, isPending: saving } = useSecretGroupSet();
  const { mutateAsync: clear, isPending: clearing } = useSecretGroupClear();

  useEffect(() => {
    state.setFields({ url: sg.url || "", chatId: sg.chatId || "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournament._id]);

  const urlInvalid = state.url.trim() && !isPrivateTelegramUrl(state.url);
  const resolved = !!sg.chatId;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isPrivateTelegramUrl(state.url)) return;
    const body = { url: state.url.trim() };
    if (state.chatId.trim()) body.chatId = state.chatId.trim();
    await save({ id: tournament._id, body });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Maxfiy guruh — turnirga ro'yxatdan o'tish uchun jamoa sardori qo'shilishi shart bo'lgan
        yopiq guruh. O'yinchilar bu guruh uchun tekshirilmaydi.
      </p>

      {sg.url && (
        <div className="rounded-[2px] border bg-white p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {resolved ? (
              <ShieldCheck size={18} className="text-primary" />
            ) : (
              <ShieldAlert size={18} className="text-destructive" />
            )}
            <div>
              <div className="font-medium">{sg.title || "Maxfiy guruh"}</div>
              <a
                href={sg.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:underline break-all"
              >
                {sg.url}
              </a>
              <div className="mt-1">
                {resolved ? (
                  <Badge variant="default">Aniqlangan ✅</Badge>
                ) : (
                  <Badge variant="destructive">Bot admin qilinishini kutmoqda</Badge>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={clearing}
            onClick={() => clear(tournament._id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )}

      {!resolved && sg.url && (
        <div className="rounded-[2px] border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          Chat ID hali aniqlanmagan. 1) Havolani saqlang. 2) Botni o'sha yopiq guruhga
          <b> admin</b> qiling — bot chat ID'ni avtomatik aniqlaydi. (Yoki pastda Chat ID'ni
          qo'lda kiriting.)
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputField
          label="Maxfiy guruh havolasi"
          value={state.url}
          onChange={(e) => state.setField("url", e.target.value)}
          placeholder="https://t.me/+..."
          required
          description={urlInvalid ? "Yopiq (t.me/+...) havola kiriting" : ""}
        />
        <InputField
          label="Chat ID (ixtiyoriy — avto-aniqlash ishlamasa)"
          value={state.chatId}
          onChange={(e) => state.setField("chatId", e.target.value)}
          placeholder="-100..."
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={saving || urlInvalid || !state.url.trim()}>
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecretGroupTab;
