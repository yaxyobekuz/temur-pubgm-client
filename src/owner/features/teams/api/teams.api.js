import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const teamsAPI = {
  list: (params) => http.get(ENDPOINTS.teams.base, { params }),
  byId: (id) => http.get(ENDPOINTS.teams.byId(id)),
  update: (id, body) => http.patch(ENDPOINTS.teams.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.teams.byId(id)),
};
