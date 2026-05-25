import { Eye, Trash2, Ban } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { BROADCAST_STATUS, BROADCAST_TARGET_LABELS } from "@/shared/constants/broadcast";
import BroadcastStatusBadge from "./BroadcastStatusBadge";

const formatDate = (iso) => (iso ? new Date(iso).toLocaleString("uz-UZ") : "-");

const BroadcastsTable = ({ items = [], isLoading }) => {
  const { openModal } = useModal();

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!items.length) {
    return <div className="p-4 text-sm text-muted-foreground">Xabarnomalar yo'q</div>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-[2px] border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2 font-medium">Sarlavha</th>
            <th className="px-3 py-2 font-medium">Maqsad</th>
            <th className="px-3 py-2 font-medium">Status</th>
            <th className="px-3 py-2 font-medium">Yuborildi / Xato</th>
            <th className="px-3 py-2 font-medium">Reja</th>
            <th className="px-3 py-2 font-medium text-right">Amal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((b) => {
            const isPending = [BROADCAST_STATUS.QUEUED, BROADCAST_STATUS.RUNNING].includes(
              b.status,
            );
            const isFinal = [
              BROADCAST_STATUS.DONE,
              BROADCAST_STATUS.FAILED,
              BROADCAST_STATUS.CANCELED,
            ].includes(b.status);
            return (
              <tr key={b._id} className="border-t">
                <td className="px-3 py-2">
                  <div className="font-medium">{b.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {b.body || "-"}
                  </div>
                </td>
                <td className="px-3 py-2">
                  {BROADCAST_TARGET_LABELS[b.target?.type] || b.target?.type}
                  <div className="text-xs text-muted-foreground">
                    auditoriya: {b.audienceSize}
                  </div>
                </td>
                <td className="px-3 py-2">
                  <BroadcastStatusBadge status={b.status} />
                </td>
                <td className="px-3 py-2">
                  {b.sentCount} / {b.failedCount}
                </td>
                <td className="px-3 py-2">{formatDate(b.scheduledAt || b.createdAt)}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal(MODAL.BROADCAST_DETAIL, { broadcast: b })}
                    >
                      <Eye size={16} />
                    </Button>
                    {isPending && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(MODAL.BROADCAST_CANCEL, { broadcast: b })}
                      >
                        <Ban size={16} />
                      </Button>
                    )}
                    {isFinal && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(MODAL.BROADCAST_DELETE, { broadcast: b })}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BroadcastsTable;
