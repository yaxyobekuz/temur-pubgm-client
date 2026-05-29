import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const profileAPI = {
  updateProfile: (body) => http.patch(ENDPOINTS.users.me, body),
  changePassword: (body) => http.post(ENDPOINTS.users.mePassword, body),
};
