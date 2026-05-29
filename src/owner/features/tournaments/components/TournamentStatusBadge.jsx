import Badge from "@/shared/components/ui/badge/Badge";
import {
  TOURNAMENT_STATUS,
  TOURNAMENT_STATUS_LABELS,
} from "@/shared/constants/tournament";

const VARIANTS = {
  [TOURNAMENT_STATUS.PENDING]: "secondary",
  [TOURNAMENT_STATUS.ONGOING]: "default",
  [TOURNAMENT_STATUS.FINISHED]: "outline",
};

const TournamentStatusBadge = ({ status }) => (
  <Badge variant={VARIANTS[status] || "outline"}>
    {TOURNAMENT_STATUS_LABELS[status] || status}
  </Badge>
);

export default TournamentStatusBadge;
