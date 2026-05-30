import { useEffect } from "react";
import { ShieldCheck, ShieldAlert, Trash2 } from "lucide-react";
import useObjectState from "@/shared/hooks/useObjectState";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import InputField from "@/shared/components/ui/input/InputField";
import { isPrivateTelegramUrl } from "../../utils/sponsorChannel";
import {
  useSecretGroupSet,
  useSecretGroupClear,
} from "../../hooks/useTournaments";
import Card from "@/shared/components/ui/card/Card";

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
  const canSubmit =
    isPrivateTelegramUrl(state.url) && !!state.chatId.trim() && !saving;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isPrivateTelegramUrl(state.url) || !state.chatId.trim()) return;
    await save({
      id: tournament._id,
      body: { url: state.url.trim(), chatId: state.chatId.trim() },
    });
  };

  return (
    <div className="flex flex-col gap-4 min-h-svh">
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
                  <Badge variant="default">Sozlangan ✅</Badge>
                ) : (
                  <Badge variant="destructive">Chat ID kiritilmagan</Badge>
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

      <Card className="border-amber-300 text-amber-800 text-sm">
        <b>Chat ID'ni olish tartibi:</b>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>
            Botni yopiq guruhga <b>admin</b> qiling.
          </li>
          <li>
            Guruh ichida <b>/id</b> buyrug'ini yuboring.
          </li>
          <li>Bot qaytargan raqamni quyidagi "Chat ID" maydoniga kiriting.</li>
        </ol>
      </Card>

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
          label="Chat ID"
          value={state.chatId}
          onChange={(e) => state.setField("chatId", e.target.value)}
          placeholder="-100..."
          required
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!canSubmit}>
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecretGroupTab;
