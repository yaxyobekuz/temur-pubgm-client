import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const profileAPI = {
  changePassword: (body) => http.post(ENDPOINTS.users.mePassword, body),
};
