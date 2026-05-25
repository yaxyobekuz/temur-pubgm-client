import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const regionsAPI = {
  list: (params) => http.get(ENDPOINTS.regions.base, { params }),
  byId: (id) => http.get(ENDPOINTS.regions.byId(id)),
  create: (body) => http.post(ENDPOINTS.regions.base, body),
  update: (id, body) => http.patch(ENDPOINTS.regions.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.regions.byId(id)),
};
