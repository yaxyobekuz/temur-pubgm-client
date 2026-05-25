import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const uploadsAPI = {
  image: (file) => {
    const fd = new FormData();
    fd.append("file", file);
    return http.post(ENDPOINTS.uploads.image, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
