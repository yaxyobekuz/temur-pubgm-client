// Mirrors server/src/models/tournamentRegistration.model.js - keep in sync.
export const REGISTRATION_STATUS = Object.freeze({
  REGISTERED: "registered",
  KICKED: "kicked",
  DQ: "dq",
});

export const REGISTRATION_STATUS_LABELS = Object.freeze({
  [REGISTRATION_STATUS.REGISTERED]: "Ro'yxatda",
  [REGISTRATION_STATUS.KICKED]: "Chiqarildi",
  [REGISTRATION_STATUS.DQ]: "Diskvalifikatsiya",
});

export const ROSTER_SLOT = Object.freeze({
  MAIN: "main",
  RESERVE: "reserve",
});

export const ROSTER_SLOT_LABELS = Object.freeze({
  [ROSTER_SLOT.MAIN]: "Asosiy",
  [ROSTER_SLOT.RESERVE]: "Zaxira",
});

// Mode → main roster size, mirroring server constants/tournament.js.
export const MODE_ROSTER_SIZE = Object.freeze({
  solo: 1,
  duo: 2,
  squad: 4,
});
