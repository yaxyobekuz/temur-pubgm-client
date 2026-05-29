// Central registry of TanStack Query keys - extend here when adding a feature
export const qk = Object.freeze({
  auth: {
    me: () => ["auth", "me"],
  },
  users: {
    all: () => ["users"],
    list: (params) => ["users", "list", params],
    one: (id) => ["users", "detail", id],
  },
  activityLogs: {
    all: () => ["activityLogs"],
    list: (params) => ["activityLogs", "list", params],
    one: (id) => ["activityLogs", "detail", id],
    stats: (params) => ["activityLogs", "stats", params],
  },
  regions: {
    all: () => ["regions"],
    list: (params) => ["regions", "list", params],
    one: (id) => ["regions", "detail", id],
  },
  teams: {
    all: () => ["teams"],
    list: (params) => ["teams", "list", params],
    one: (id) => ["teams", "detail", id],
    me: () => ["teams", "me"],
  },
  tournaments: {
    all: () => ["tournaments"],
    list: (params) => ["tournaments", "list", params],
    one: (id) => ["tournaments", "detail", id],
  },
  groups: {
    all: () => ["groups"],
    byStage: (stageId) => ["groups", "byStage", stageId],
  },
  registrations: {
    all: () => ["registrations"],
    // Omit params to get a prefix key that matches every status variant (for invalidation).
    byTournament: (tournamentId, params) =>
      params === undefined
        ? ["registrations", "byTournament", tournamentId]
        : ["registrations", "byTournament", tournamentId, params],
    byTeam: (teamId) => ["registrations", "byTeam", teamId],
  },
  broadcasts: {
    all: () => ["broadcasts"],
    list: (params) => ["broadcasts", "list", params],
    one: (id) => ["broadcasts", "detail", id],
  },
  helpLinks: {
    all: () => ["helpLinks"],
    list: () => ["helpLinks", "list"],
  },
});
