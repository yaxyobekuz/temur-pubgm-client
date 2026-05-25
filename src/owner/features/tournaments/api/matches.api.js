import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const matchesAPI = {
  listByTournament: (tournamentId) =>
    http.get(ENDPOINTS.matches.base, { params: { tournament: tournamentId } }),
  listByGroup: (groupId) =>
    http.get(ENDPOINTS.matches.base, { params: { group: groupId } }),
  byId: (id) => http.get(ENDPOINTS.matches.byId(id)),
  create: (body) => http.post(ENDPOINTS.matches.base, body),
  update: (id, body) => http.patch(ENDPOINTS.matches.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.matches.byId(id)),
  setResults: (id, results) => http.post(ENDPOINTS.matches.results(id), { results }),
  broadcastRoom: (id) => http.post(ENDPOINTS.matches.broadcastRoom(id)),
  standings: (stageId) => http.get(ENDPOINTS.matches.standings(stageId)),
};
