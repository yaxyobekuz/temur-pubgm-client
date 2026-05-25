import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { groupsAPI } from "../api/groups.api";

export const useGroupsQuery = (stageId) =>
  useQuery({
    queryKey: qk.groups.byStage(stageId),
    queryFn: () => groupsAPI.listByStage(stageId).then((r) => r.data.data),
    enabled: !!stageId,
  });

const invalidate = (qc, stageId) =>
  qc.invalidateQueries({ queryKey: qk.groups.byStage(stageId) });

export const useGroupCreate = (stageId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => groupsAPI.create(body).then((r) => r.data.data),
    onSuccess: () => invalidate(qc, stageId),
  });
};

export const useGroupUpdate = (stageId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => groupsAPI.update(id, body).then((r) => r.data.data),
    onSuccess: () => invalidate(qc, stageId),
  });
};

export const useGroupRemove = (stageId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => groupsAPI.remove(id).then((r) => r.data),
    onSuccess: () => invalidate(qc, stageId),
  });
};

export const useGroupRemoveTeam = (stageId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, teamId }) =>
      groupsAPI.removeTeam(id, teamId).then((r) => r.data.data),
    onSuccess: () => invalidate(qc, stageId),
  });
};
