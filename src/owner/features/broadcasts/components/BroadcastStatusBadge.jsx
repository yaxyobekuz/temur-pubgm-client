import Badge from "@/shared/components/ui/badge/Badge";
import {
  BROADCAST_STATUS,
  BROADCAST_STATUS_LABELS,
} from "@/shared/constants/broadcast";

const VARIANTS = {
  [BROADCAST_STATUS.QUEUED]: "outline",
  [BROADCAST_STATUS.RUNNING]: "default",
  [BROADCAST_STATUS.DONE]: "secondary",
  [BROADCAST_STATUS.FAILED]: "destructive",
  [BROADCAST_STATUS.CANCELED]: "secondary",
};

const BroadcastStatusBadge = ({ status }) => (
  <Badge variant={VARIANTS[status] || "outline"}>
    {BROADCAST_STATUS_LABELS[status] || status}
  </Badge>
);

export default BroadcastStatusBadge;
