import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const usersAPI = {
  list: (params) => http.get(ENDPOINTS.users.base, { params }),
  byId: (id) => http.get(ENDPOINTS.users.byId(id)),
};
