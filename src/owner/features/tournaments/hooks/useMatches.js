import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { matchesAPI } from "../api/matches.api";

export const useMatchesByTournamentQuery = (tournamentId) =>
  useQuery({
    queryKey: qk.matches.byTournament(tournamentId),
    queryFn: () => matchesAPI.listByTournament(tournamentId).then((r) => r.data.data),
    enabled: !!tournamentId,
  });

export const useMatchQuery = (id) =>
  useQuery({
    queryKey: qk.matches.one(id),
    queryFn: () => matchesAPI.byId(id).then((r) => r.data.data),
    enabled: !!id,
  });

export const useStandingsQuery = (stageId) =>
  useQuery({
    queryKey: qk.matches.standings(stageId),
    queryFn: () => matchesAPI.standings(stageId).then((r) => r.data.data),
    enabled: !!stageId,
  });

const invalidateAll = (qc) => qc.invalidateQueries({ queryKey: qk.matches.all() });

export const useMatchCreate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => matchesAPI.create(body).then((r) => r.data.data),
    onSuccess: () => invalidateAll(qc),
  });
};

export const useMatchUpdate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => matchesAPI.update(id, body).then((r) => r.data.data),
    onSuccess: () => invalidateAll(qc),
  });
};

export const useMatchRemove = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => matchesAPI.remove(id).then((r) => r.data),
    onSuccess: () => invalidateAll(qc),
  });
};

export const useMatchSetResults = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, results }) =>
      matchesAPI.setResults(id, results).then((r) => r.data.data),
    onSuccess: () => invalidateAll(qc),
  });
};

export const useMatchBroadcastRoom = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => matchesAPI.broadcastRoom(id).then((r) => r.data.data),
    onSuccess: () => invalidateAll(qc),
  });
};
