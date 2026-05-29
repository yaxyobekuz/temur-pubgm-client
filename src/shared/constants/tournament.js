// Mirrors server/src/constants/tournament.js - keep in sync.
// Lifecycle status: 3 simple states, freely switchable. Stage (bosqich) is tracked
// separately via Tournament.currentStage.
export const TOURNAMENT_STATUS = Object.freeze({
  PENDING: "pending",
  ONGOING: "ongoing",
  FINISHED: "finished",
});

export const TOURNAMENT_STATUS_LABELS = Object.freeze({
  [TOURNAMENT_STATUS.PENDING]: "Kutilmoqda",
  [TOURNAMENT_STATUS.ONGOING]: "Boshlandi",
  [TOURNAMENT_STATUS.FINISHED]: "Yakunlandi",
});

// For the status picker: everything except the current one.
export const allowedNextStatuses = (current) =>
  Object.values(TOURNAMENT_STATUS).filter((s) => s !== current);

export const TOURNAMENT_MODE = Object.freeze({
  SOLO: "solo",
  DUO: "duo",
  SQUAD: "squad",
});

export const TOURNAMENT_MODE_LABELS = Object.freeze({
  [TOURNAMENT_MODE.SOLO]: "Solo (1)",
  [TOURNAMENT_MODE.DUO]: "Duo (2)",
  [TOURNAMENT_MODE.SQUAD]: "Squad (4)",
});

// UI helper: stage label by order number and total count.
export const getStageLabel = (order, total) =>
  order === total ? "Final" : `${order}-bosqich`;

export const DEFAULT_STAGES_COUNT = 3;
export const MAX_STAGES_COUNT = 9;
export const DEFAULT_GROUP_SIZE = 20;

// Common PUBG Mobile maps - owner can pick from these or type custom.
export const PUBGM_MAPS = ["Erangel", "Miramar", "Sanhok", "Vikendi", "Livik", "Karakin"];
