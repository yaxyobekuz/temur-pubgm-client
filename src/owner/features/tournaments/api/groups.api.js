import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const groupsAPI = {
  listByStage: (stageId) => http.get(ENDPOINTS.groups.base, { params: { stageId } }),
  addTeam: (id, teamId) => http.post(ENDPOINTS.groups.teams(id), { teamId }),
  removeTeam: (id, teamId) => http.delete(ENDPOINTS.groups.teamById(id, teamId)),
};
