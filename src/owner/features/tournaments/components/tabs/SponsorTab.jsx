import { Plus, Trash2, Send, Link as LinkIcon } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const SponsorTab = ({ tournament }) => {
  const { openModal } = useModal();
  const channels = tournament.sponsorChannels || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Telegram kanallari ro'yxatdan o'tish paytida tekshiriladi; boshqa havolalar faqat ko'rsatiladi.
        </p>
        <Button onClick={() => openModal(MODAL.SPONSOR_ADD, { tournament })}>
          <Plus size={16} className="mr-1" />
          Kanal qo'shish
        </Button>
      </div>

      {!channels.length ? (
        <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
          Hozircha kanallar yo'q
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {channels.map((c) => (
            <div
              key={c._id}
              className="rounded-[2px] border bg-white p-3 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                {c.type === "telegram" ? (
                  <Send size={18} className="text-primary" />
                ) : (
                  <LinkIcon size={18} className="text-muted-foreground" />
                )}
                <div>
                  <div className="font-medium">{c.title}</div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-muted-foreground hover:underline break-all"
                  >
                    {c.url}
                  </a>
                  {c.type === "telegram" && (
                    <div className="flex gap-2 mt-1">
                      {c.chatUsername && (
                        <Badge variant="secondary">{c.chatUsername}</Badge>
                      )}
                      {c.chatId ? (
                        <Badge variant="default">Tekshirish faol</Badge>
                      ) : (
                        <Badge variant="outline">chatId yo'q</Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  openModal(MODAL.SPONSOR_DELETE, {
                    tournamentId: tournament._id,
                    channel: c,
                  })
                }
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SponsorTab;
