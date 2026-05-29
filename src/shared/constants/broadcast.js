// Mirrors server/src/models/broadcastJob.model.js - keep in sync.
export const BROADCAST_STATUS = Object.freeze({
  QUEUED: "queued",
  RUNNING: "running",
  DONE: "done",
  FAILED: "failed",
  CANCELED: "canceled",
});

export const BROADCAST_STATUS_LABELS = Object.freeze({
  [BROADCAST_STATUS.QUEUED]: "Navbatda",
  [BROADCAST_STATUS.RUNNING]: "Yuborilmoqda",
  [BROADCAST_STATUS.DONE]: "Yakunlandi",
  [BROADCAST_STATUS.FAILED]: "Xato",
  [BROADCAST_STATUS.CANCELED]: "Bekor qilindi",
});

export const BROADCAST_TARGET = Object.freeze({
  ALL: "all",
  ROLE: "role",
  REGION: "region",
  TOURNAMENT: "tournament",
  TEAM: "team",
});

export const BROADCAST_TARGET_LABELS = Object.freeze({
  [BROADCAST_TARGET.ALL]: "Hammaga",
  [BROADCAST_TARGET.ROLE]: "Rol bo'yicha",
  [BROADCAST_TARGET.REGION]: "Mintaqa bo'yicha",
  [BROADCAST_TARGET.TOURNAMENT]: "Turnir ishtirokchilariga",
  [BROADCAST_TARGET.TEAM]: "Komandaga",
});
