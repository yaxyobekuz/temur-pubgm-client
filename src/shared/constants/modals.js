// Modal keys - also used as the Redux store name; never hardcode the string elsewhere
export const MODAL = Object.freeze({
  USER_CREATE: "user:create",
  USER_EDIT: "user:edit",
  USER_DELETE: "user:delete",
  ACTIVITY_LOG_DETAIL: "activityLog:detail",

  REGION_CREATE: "region:create",
  REGION_EDIT: "region:edit",
  REGION_DELETE: "region:delete",

  TEAM_EDIT: "team:edit",
  TEAM_DELETE: "team:delete",

  TOURNAMENT_CREATE: "tournament:create",
  TOURNAMENT_EDIT: "tournament:edit",
  TOURNAMENT_DELETE: "tournament:delete",
  TOURNAMENT_STATUS: "tournament:status",
  STAGE_PROMOTE: "stage:promote",

  SPONSOR_ADD: "sponsor:add",
  SPONSOR_DELETE: "sponsor:delete",

  REGISTRATION_KICK: "registration:kick",
  REGISTRATION_DETAIL: "registration:detail",

  BROADCAST_CREATE: "broadcast:create",
  BROADCAST_DETAIL: "broadcast:detail",
  BROADCAST_CANCEL: "broadcast:cancel",
  BROADCAST_DELETE: "broadcast:delete",

  MATCH_CREATE: "match:create",
  MATCH_EDIT: "match:edit",
  MATCH_DELETE: "match:delete",
  MATCH_RESULTS: "match:results",
  MATCH_BROADCAST_ROOM: "match:broadcastRoom",
});
