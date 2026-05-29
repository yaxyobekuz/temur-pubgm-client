import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { profileAPI } from "../api/profile.api";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body) => profileAPI.updateProfile(body).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.auth.me() });
    },
  });
};
