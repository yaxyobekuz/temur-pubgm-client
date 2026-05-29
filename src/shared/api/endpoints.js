export const ENDPOINTS = Object.freeze({
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
    registerUser: "/auth/register-user",
  },
  users: {
    base: "/users",
    byId: (id) => `/users/${id}`,
    meRole: "/users/me/role",
    mePassword: "/users/me/password",
  },
  activityLogs: {
    base: "/activity-logs",
    byId: (id) => `/activity-logs/${id}`,
    stats: "/activity-logs/stats",
  },
  regions: {
    base: "/regions",
    byId: (id) => `/regions/${id}`,
    public: "/public/regions",
  },
  teams: {
    base: "/teams",
    byId: (id) => `/teams/${id}`,
    me: "/teams/me",
    meRegenerateInvite: "/teams/me/regenerate-invite",
    meKickMember: (userId) => `/teams/me/members/${userId}`,
    meLeave: "/teams/me/leave",
  },
  tournaments: {
    base: "/tournaments",
    byId: (id) => `/tournaments/${id}`,
    status: (id) => `/tournaments/${id}/status`,
    promoteToNext: (id) => `/tournaments/${id}/promote-to-next`,
    register: (id) => `/tournaments/${id}/register`,
    sponsorChannels: (id) => `/tournaments/${id}/sponsor-channels`,
    sponsorChannelById: (id, channelId) =>
      `/tournaments/${id}/sponsor-channels/${channelId}`,
  },
  groups: {
    base: "/groups",
    teamById: (id, teamId) => `/groups/${id}/teams/${teamId}`,
  },
  registrations: {
    base: "/tournament-registrations",
    byId: (id) => `/tournament-registrations/${id}`,
    kick: (id) => `/tournament-registrations/${id}/kick`,
    restore: (id) => `/tournament-registrations/${id}/restore`,
  },
  helpLinks: {
    base: "/help-links",
    byId: (id) => `/help-links/${id}`,
  },
  broadcasts: {
    base: "/broadcasts",
    byId: (id) => `/broadcasts/${id}`,
    cancel: (id) => `/broadcasts/${id}/cancel`,
    audiencePreview: "/broadcasts/audience-preview",
  },
  uploads: {
    image: "/uploads/image",
  },
});
