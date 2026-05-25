import Badge from "@/shared/components/ui/badge/Badge";
import { useBroadcastQuery } from "../../hooks/useBroadcasts";
import { BROADCAST_TARGET_LABELS } from "@/shared/constants/broadcast";
import BroadcastStatusBadge from "../BroadcastStatusBadge";

const fmt = (iso) => (iso ? new Date(iso).toLocaleString("uz-UZ") : "-");

const Row = ({ label, children }) => (
  <div className="flex flex-col gap-1 border-t py-2 first:border-t-0 sm:flex-row sm:items-center">
    <div className="text-xs uppercase text-muted-foreground sm:w-36">{label}</div>
    <div className="text-sm">{children}</div>
  </div>
);

const BroadcastDetailModal = ({ broadcast }) => {
  // Refetch latest data so counters stay live while running.
  const { data: latest } = useBroadcastQuery(broadcast?._id);
  const b = latest || broadcast;
  if (!b) return null;

  const progress = b.audienceSize
    ? Math.min(100, Math.round(((b.sentCount + b.failedCount) / b.audienceSize) * 100))
    : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-[2px] border bg-white px-4 py-2">
        <Row label="Sarlavha">{b.title}</Row>
        <Row label="Status"><BroadcastStatusBadge status={b.status} /></Row>
        <Row label="Auditoriya">{b.audienceSize}</Row>
        <Row label="Yuborildi">{b.sentCount}</Row>
        <Row label="Xato">{b.failedCount}</Row>
        <Row label="Reja">{fmt(b.scheduledAt || b.createdAt)}</Row>
        <Row label="Boshlangan">{fmt(b.startedAt)}</Row>
        <Row label="Yakunlangan">{fmt(b.finishedAt)}</Row>
        <Row label="Maqsad">
          <Badge variant="secondary">
            {BROADCAST_TARGET_LABELS[b.target?.type] || b.target?.type}
          </Badge>
          {Array.isArray(b.target?.ids) && b.target.ids.length > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              {b.target.ids.length} ta tanlov
            </span>
          )}
        </Row>
      </div>

      <div className="h-2 w-full rounded bg-muted">
        <div
          className="h-full rounded bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {b.mediaUrl && (
        <img
          src={b.mediaUrl}
          alt=""
          className="w-full max-h-60 object-cover rounded-[2px] border"
        />
      )}

      {b.body && (
        <div className="rounded-[2px] border bg-white px-4 py-2 text-sm whitespace-pre-wrap">
          {b.body}
        </div>
      )}

      {!!b.buttons?.length && (
        <div className="flex flex-wrap gap-2">
          {b.buttons.map((btn, i) => (
            <span key={i} className="text-xs rounded-[2px] border px-2.5 py-1">
              {btn.text} → {btn.url}
            </span>
          ))}
        </div>
      )}

      {!!b.failures?.length && (
        <details className="rounded-[2px] border bg-white p-3 text-xs">
          <summary className="cursor-pointer text-sm">
            Xatolar ({b.failures.length})
          </summary>
          <ul className="mt-2 space-y-1">
            {b.failures.slice(0, 50).map((e, i) => (
              <li key={i} className="flex gap-3 font-mono">
                <span className="text-muted-foreground">{e.tgId}</span>
                <span>{e.reason}</span>
              </li>
            ))}
            {b.failures.length > 50 && (
              <li className="text-muted-foreground">…va boshqalar</li>
            )}
          </ul>
        </details>
      )}
    </div>
  );
};

export default BroadcastDetailModal;
