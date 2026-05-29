import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const helpLinksAPI = {
  list: () => http.get(ENDPOINTS.helpLinks.base),
  create: (body) => http.post(ENDPOINTS.helpLinks.base, body),
  update: (id, body) => http.patch(ENDPOINTS.helpLinks.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.helpLinks.byId(id)),
};
