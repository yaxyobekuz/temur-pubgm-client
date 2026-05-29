import { useMutation } from "@tanstack/react-query";
import { profileAPI } from "../api/profile.api";

export const useChangePassword = () =>
  useMutation({
    mutationFn: (body) => profileAPI.changePassword(body).then((r) => r.data),
  });
