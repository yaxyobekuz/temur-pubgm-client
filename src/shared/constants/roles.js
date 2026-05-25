// Static role values (stored as-is in the DB).
// Only `owner` is hard-coded; the others live in the `Role` collection (seeded).
export const ROLES = Object.freeze({
  OWNER: "owner",
  ADMIN: "admin",
  LEADER: "leader",
  PLAYER: "player",
});

export const ROLE_LABELS = Object.freeze({
  owner: "Ega",
  admin: "Administrator",
  leader: "Komanda sardori",
  player: "O'yinchi",
});

export const ALL_ROLES = Object.values(ROLES);

// Default landing route per role. Only roles with a web panel are listed here.
// Leader/player rely on the Telegram bot and have no web home.
export const ROLE_HOME = Object.freeze({
  owner: "/owner",
  admin: "/admin",
});
