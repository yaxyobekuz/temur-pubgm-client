import Badge from "@/shared/components/ui/badge/Badge";
import {
  TOURNAMENT_STATUS,
  TOURNAMENT_STATUS_LABELS,
} from "@/shared/constants/tournament";

const VARIANTS = {
  [TOURNAMENT_STATUS.DRAFT]: "secondary",
  [TOURNAMENT_STATUS.ANNOUNCED]: "outline",
  [TOURNAMENT_STATUS.REGISTRATION]: "default",
  [TOURNAMENT_STATUS.STAGE_1]: "default",
  [TOURNAMENT_STATUS.STAGE_2]: "default",
  [TOURNAMENT_STATUS.FINAL]: "default",
  [TOURNAMENT_STATUS.FINISHED]: "secondary",
};

const TournamentStatusBadge = ({ status }) => (
  <Badge variant={VARIANTS[status] || "outline"}>
    {TOURNAMENT_STATUS_LABELS[status] || status}
  </Badge>
);

export default TournamentStatusBadge;
