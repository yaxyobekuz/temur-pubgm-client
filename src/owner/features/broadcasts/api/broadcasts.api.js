import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const broadcastsAPI = {
  list: (params) => http.get(ENDPOINTS.broadcasts.base, { params }),
  byId: (id) => http.get(ENDPOINTS.broadcasts.byId(id)),
  create: (body) => http.post(ENDPOINTS.broadcasts.base, body),
  cancel: (id) => http.post(ENDPOINTS.broadcasts.cancel(id)),
  remove: (id) => http.delete(ENDPOINTS.broadcasts.byId(id)),
  audiencePreview: (target) =>
    http.post(ENDPOINTS.broadcasts.audiencePreview, target),
};
