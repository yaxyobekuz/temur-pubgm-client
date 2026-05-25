import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { teamsAPI } from "../api/teams.api";

export const useTeamUpdate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => teamsAPI.update(id, body).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.teams.all() }),
  });
};

export const useTeamRemove = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => teamsAPI.remove(id).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.teams.all() }),
  });
};
