import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { stagesAPI } from "../api/stages.api";

export const useStagesQuery = (tournamentId) =>
  useQuery({
    queryKey: qk.stages.byTournament(tournamentId),
    queryFn: () => stagesAPI.listByTournament(tournamentId).then((r) => r.data.data),
    enabled: !!tournamentId,
  });

const invalidate = (qc, tournamentId) =>
  qc.invalidateQueries({ queryKey: qk.stages.byTournament(tournamentId) });

export const useStageCreate = (tournamentId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => stagesAPI.create(body).then((r) => r.data.data),
    onSuccess: () => invalidate(qc, tournamentId),
  });
};

export const useStageUpdate = (tournamentId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => stagesAPI.update(id, body).then((r) => r.data.data),
    onSuccess: () => invalidate(qc, tournamentId),
  });
};

export const useStageRemove = (tournamentId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => stagesAPI.remove(id).then((r) => r.data),
    onSuccess: () => invalidate(qc, tournamentId),
  });
};
