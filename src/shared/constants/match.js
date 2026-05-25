// Mirrors server/src/models/match.model.js - keep in sync.
export const MATCH_STATUS = Object.freeze({
  SCHEDULED: "scheduled",
  LIVE: "live",
  FINISHED: "finished",
});

export const MATCH_STATUS_LABELS = Object.freeze({
  [MATCH_STATUS.SCHEDULED]: "Rejalashtirilgan",
  [MATCH_STATUS.LIVE]: "Boshlandi",
  [MATCH_STATUS.FINISHED]: "Yakunlangan",
});
