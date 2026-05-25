// Mirrors server/src/constants/tournament.js - keep in sync.
export const TOURNAMENT_STATUS = Object.freeze({
  DRAFT: "draft",
  ANNOUNCED: "announced",
  REGISTRATION: "registration",
  STAGE_1: "stage1",
  STAGE_2: "stage2",
  FINAL: "final",
  FINISHED: "finished",
});

export const TOURNAMENT_STATUS_LABELS = Object.freeze({
  [TOURNAMENT_STATUS.DRAFT]: "Qoralama",
  [TOURNAMENT_STATUS.ANNOUNCED]: "E'lon qilindi",
  [TOURNAMENT_STATUS.REGISTRATION]: "Ro'yxatdan o'tish",
  [TOURNAMENT_STATUS.STAGE_1]: "1-bosqich",
  [TOURNAMENT_STATUS.STAGE_2]: "2-bosqich",
  [TOURNAMENT_STATUS.FINAL]: "Final",
  [TOURNAMENT_STATUS.FINISHED]: "Yakunlandi",
});

const STATUS_TRANSITIONS = {
  [TOURNAMENT_STATUS.DRAFT]: [TOURNAMENT_STATUS.ANNOUNCED, TOURNAMENT_STATUS.FINISHED],
  [TOURNAMENT_STATUS.ANNOUNCED]: [TOURNAMENT_STATUS.REGISTRATION, TOURNAMENT_STATUS.FINISHED],
  [TOURNAMENT_STATUS.REGISTRATION]: [TOURNAMENT_STATUS.STAGE_1, TOURNAMENT_STATUS.FINISHED],
  [TOURNAMENT_STATUS.STAGE_1]: [TOURNAMENT_STATUS.STAGE_2, TOURNAMENT_STATUS.FINISHED],
  [TOURNAMENT_STATUS.STAGE_2]: [TOURNAMENT_STATUS.FINAL, TOURNAMENT_STATUS.FINISHED],
  [TOURNAMENT_STATUS.FINAL]: [TOURNAMENT_STATUS.FINISHED],
  [TOURNAMENT_STATUS.FINISHED]: [],
};

export const allowedNextStatuses = (current) =>
  STATUS_TRANSITIONS[current] || [];

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

export const STAGE_STATUS = Object.freeze({
  PENDING: "pending",
  ACTIVE: "active",
  FINISHED: "finished",
});

export const STAGE_STATUS_LABELS = Object.freeze({
  [STAGE_STATUS.PENDING]: "Kutilmoqda",
  [STAGE_STATUS.ACTIVE]: "Faol",
  [STAGE_STATUS.FINISHED]: "Yakunlandi",
});

export const STAGE_ORDER = Object.freeze({
  ONE: 1,
  TWO: 2,
  FINAL: "final",
});

export const STAGE_ORDER_LABELS = Object.freeze({
  1: "1-bosqich",
  2: "2-bosqich",
  final: "Final",
});

export const ALL_STAGE_ORDERS = [
  STAGE_ORDER.ONE,
  STAGE_ORDER.TWO,
  STAGE_ORDER.FINAL,
];

// Common PUBG Mobile maps - owner can pick from these or type custom.
export const PUBGM_MAPS = ["Erangel", "Miramar", "Sanhok", "Vikendi", "Livik", "Karakin"];
