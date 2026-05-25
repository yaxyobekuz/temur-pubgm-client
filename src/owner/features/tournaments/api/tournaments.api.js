import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const tournamentsAPI = {
  list: (params) => http.get(ENDPOINTS.tournaments.base, { params }),
  byId: (id) => http.get(ENDPOINTS.tournaments.byId(id)),
  create: (body) => http.post(ENDPOINTS.tournaments.base, body),
  update: (id, body) => http.patch(ENDPOINTS.tournaments.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.tournaments.byId(id)),
  changeStatus: (id, next) => http.post(ENDPOINTS.tournaments.status(id), { next }),
  addSponsor: (id, body) => http.post(ENDPOINTS.tournaments.sponsorChannels(id), body),
  removeSponsor: (id, channelId) =>
    http.delete(ENDPOINTS.tournaments.sponsorChannelById(id, channelId)),
};
