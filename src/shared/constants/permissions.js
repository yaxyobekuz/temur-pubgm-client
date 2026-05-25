// Permission keys - same strings live in the DB
export const PERMISSIONS = Object.freeze({
  USERS_READ: "users.read",
  ACTIVITY_LOGS_READ: "activity_logs.read",

  REGIONS_READ: "regions.read",
  REGIONS_CREATE: "regions.create",
  REGIONS_UPDATE: "regions.update",
  REGIONS_DELETE: "regions.delete",

  TEAMS_READ: "teams.read",
  TEAMS_UPDATE: "teams.update",
  TEAMS_DELETE: "teams.delete",

  TOURNAMENTS_READ: "tournaments.read",
  TOURNAMENTS_CREATE: "tournaments.create",
  TOURNAMENTS_UPDATE: "tournaments.update",
  TOURNAMENTS_DELETE: "tournaments.delete",
  TOURNAMENTS_REGISTER: "tournaments.register",

  STAGES_UPDATE: "stages.update",
  GROUPS_UPDATE: "groups.update",

  REGISTRATIONS_READ: "registrations.read",
  REGISTRATIONS_UPDATE: "registrations.update",

  BROADCASTS_READ: "broadcasts.read",
  BROADCASTS_CREATE: "broadcasts.create",
  BROADCASTS_UPDATE: "broadcasts.update",
  BROADCASTS_DELETE: "broadcasts.delete",

  MATCHES_READ: "matches.read",
  MATCHES_CREATE: "matches.create",
  MATCHES_UPDATE: "matches.update",
  MATCHES_DELETE: "matches.delete",
});
