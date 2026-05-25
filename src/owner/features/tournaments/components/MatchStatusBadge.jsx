import Badge from "@/shared/components/ui/badge/Badge";
import {
  MATCH_STATUS,
  MATCH_STATUS_LABELS,
} from "@/shared/constants/match";

const VARIANTS = {
  [MATCH_STATUS.SCHEDULED]: "outline",
  [MATCH_STATUS.LIVE]: "default",
  [MATCH_STATUS.FINISHED]: "secondary",
};

const MatchStatusBadge = ({ status }) => (
  <Badge variant={VARIANTS[status] || "outline"}>
    {MATCH_STATUS_LABELS[status] || status}
  </Badge>
);

export default MatchStatusBadge;
