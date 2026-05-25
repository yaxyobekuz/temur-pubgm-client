import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const groupsAPI = {
  listByStage: (stageId) => http.get(ENDPOINTS.groups.base, { params: { stageId } }),
  create: (body) => http.post(ENDPOINTS.groups.base, body),
  update: (id, body) => http.patch(ENDPOINTS.groups.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.groups.byId(id)),
  removeTeam: (id, teamId) => http.delete(ENDPOINTS.groups.teamById(id, teamId)),
};
