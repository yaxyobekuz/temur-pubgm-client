import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { groupsAPI } from "../api/groups.api";

export const useGroupsQuery = (stageId) =>
  useQuery({
    queryKey: qk.groups.byStage(stageId),
    queryFn: () => groupsAPI.listByStage(stageId).then((r) => r.data.data),
    enabled: !!stageId,
  });

export const useGroupRemoveTeam = (stageId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, teamId }) =>
      groupsAPI.removeTeam(id, teamId).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.groups.byStage(stageId) }),
  });
};

export const useGroupAddTeam = (stageId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, teamId }) =>
      groupsAPI.addTeam(id, teamId).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.groups.byStage(stageId) }),
  });
};
