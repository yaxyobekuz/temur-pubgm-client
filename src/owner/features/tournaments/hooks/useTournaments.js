import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { tournamentsAPI } from "../api/tournaments.api";

export const useTournamentsQuery = (params = {}) =>
  useQuery({
    queryKey: qk.tournaments.list(params),
    queryFn: () => tournamentsAPI.list(params).then((r) => r.data),
  });

export const useTournamentQuery = (id) =>
  useQuery({
    queryKey: qk.tournaments.one(id),
    queryFn: () => tournamentsAPI.byId(id).then((r) => r.data.data),
    enabled: !!id,
  });

const invalidateAll = (qc) => qc.invalidateQueries({ queryKey: qk.tournaments.all() });
const invalidateOne = (qc, id) => {
  qc.invalidateQueries({ queryKey: qk.tournaments.one(id) });
  qc.invalidateQueries({ queryKey: qk.tournaments.all() });
};

export const useTournamentCreate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => tournamentsAPI.create(body).then((r) => r.data.data),
    onSuccess: () => invalidateAll(qc),
  });
};

export const useTournamentUpdate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => tournamentsAPI.update(id, body).then((r) => r.data.data),
    onSuccess: (_data, { id }) => invalidateOne(qc, id),
  });
};

export const useTournamentRemove = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => tournamentsAPI.remove(id).then((r) => r.data),
    onSuccess: () => invalidateAll(qc),
  });
};

export const useTournamentChangeStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, next }) =>
      tournamentsAPI.changeStatus(id, next).then((r) => r.data.data),
    onSuccess: (_data, { id }) => invalidateOne(qc, id),
  });
};

export const usePromoteToNextStage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, teamIds }) =>
      tournamentsAPI.promoteToNext(id, teamIds).then((r) => r.data.data),
    onSuccess: (_data, { id }) => {
      invalidateOne(qc, id);
      qc.invalidateQueries({ queryKey: qk.groups.all() });
    },
  });
};

export const useSponsorAdd = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => tournamentsAPI.addSponsor(id, body).then((r) => r.data.data),
    onSuccess: (_data, { id }) => invalidateOne(qc, id),
  });
};

export const useSponsorRemove = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, channelId }) =>
      tournamentsAPI.removeSponsor(id, channelId).then((r) => r.data.data),
    onSuccess: (_data, { id }) => invalidateOne(qc, id),
  });
};

export const useSecretGroupSet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) =>
      tournamentsAPI.setSecretGroup(id, body).then((r) => r.data.data),
    onSuccess: (_data, { id }) => invalidateOne(qc, id),
  });
};

export const useSecretGroupClear = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => tournamentsAPI.clearSecretGroup(id).then((r) => r.data.data),
    onSuccess: (_data, id) => invalidateOne(qc, id),
  });
};
