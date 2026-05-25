// Mirrors server/src/constants/tournament.js - keep in sync.
const STAGE_KEYS = Array.from({ length: 9 }, (_, i) => [`STAGE_${i + 1}`, `stage${i + 1}`]);

export const TOURNAMENT_STATUS = Object.freeze({
  DRAFT: "draft",
  ANNOUNCED: "announced",
  REGISTRATION: "registration",
  ...Object.fromEntries(STAGE_KEYS),
  FINAL: "final",
  FINISHED: "finished",
});

export const TOURNAMENT_STATUS_LABELS = Object.freeze({
  [TOURNAMENT_STATUS.DRAFT]: "Qoralama",
  [TOURNAMENT_STATUS.ANNOUNCED]: "E'lon qilindi",
  [TOURNAMENT_STATUS.REGISTRATION]: "Ro'yxatdan o'tish",
  ...Object.fromEntries(STAGE_KEYS.map(([, v], i) => [v, `${i + 1}-bosqich`])),
  [TOURNAMENT_STATUS.FINAL]: "Final",
  [TOURNAMENT_STATUS.FINISHED]: "Yakunlandi",
});

export const stageNumberFromStatus = (status) => {
  const m = /^stage(\d+)$/.exec(status || "");
  return m ? Number(m[1]) : null;
};

export const stageStatusFor = (stageNumber, stagesCount) => {
  if (stageNumber < 1 || stageNumber > stagesCount) return null;
  if (stageNumber === stagesCount) return TOURNAMENT_STATUS.FINAL;
  return `stage${stageNumber}`;
};

export const allowedNextStatuses = (current, stagesCount = 3) => {
  if (current === TOURNAMENT_STATUS.FINISHED) return [];
  const FINISHED = TOURNAMENT_STATUS.FINISHED;
  if (current === TOURNAMENT_STATUS.DRAFT) return [TOURNAMENT_STATUS.ANNOUNCED, FINISHED];
  if (current === TOURNAMENT_STATUS.ANNOUNCED) return [TOURNAMENT_STATUS.REGISTRATION, FINISHED];
  if (current === TOURNAMENT_STATUS.REGISTRATION) {
    return [stageStatusFor(1, stagesCount), FINISHED].filter(Boolean);
  }
  if (current === TOURNAMENT_STATUS.FINAL) return [FINISHED];
  const n = stageNumberFromStatus(current);
  if (n !== null) {
    return [stageStatusFor(n + 1, stagesCount), FINISHED].filter(Boolean);
  }
  return [];
};

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

// UI helper: order raqami va umumiy soni bo'yicha yorliq.
export const getStageLabel = (order, total) =>
  order === total ? "Final" : `${order}-bosqich`;

export const DEFAULT_STAGES_COUNT = 3;
export const MAX_STAGES_COUNT = 9;
export const DEFAULT_GROUP_SIZE = 20;

// Common PUBG Mobile maps - owner can pick from these or type custom.
export const PUBGM_MAPS = ["Erangel", "Miramar", "Sanhok", "Vikendi", "Livik", "Karakin"];
