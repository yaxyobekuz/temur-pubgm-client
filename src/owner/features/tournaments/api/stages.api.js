import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const stagesAPI = {
  listByTournament: (tournamentId) =>
    http.get(ENDPOINTS.stages.base, { params: { tournamentId } }),
  create: (body) => http.post(ENDPOINTS.stages.base, body),
  update: (id, body) => http.patch(ENDPOINTS.stages.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.stages.byId(id)),
  promote: (id, body) => http.post(ENDPOINTS.stages.promote(id), body),
};
