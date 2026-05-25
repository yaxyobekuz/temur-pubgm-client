import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const registrationsAPI = {
  list: (params) => http.get(ENDPOINTS.registrations.base, { params }),
  byId: (id) => http.get(ENDPOINTS.registrations.byId(id)),
  kick: (id) => http.post(ENDPOINTS.registrations.kick(id)),
};
