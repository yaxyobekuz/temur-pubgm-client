import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { broadcastsAPI } from "../api/broadcasts.api";

export const useBroadcastsQuery = (params = {}) =>
  useQuery({
    queryKey: qk.broadcasts.list(params),
    queryFn: () => broadcastsAPI.list(params).then((r) => r.data),
    refetchInterval: 5000, // running jobs animate counters
  });

export const useBroadcastQuery = (id) =>
  useQuery({
    queryKey: qk.broadcasts.one(id),
    queryFn: () => broadcastsAPI.byId(id).then((r) => r.data.data),
    enabled: !!id,
    refetchInterval: 5000,
  });

const invalidateAll = (qc) => qc.invalidateQueries({ queryKey: qk.broadcasts.all() });

export const useBroadcastCreate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => broadcastsAPI.create(body).then((r) => r.data.data),
    onSuccess: () => invalidateAll(qc),
  });
};

export const useBroadcastCancel = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => broadcastsAPI.cancel(id).then((r) => r.data.data),
    onSuccess: () => invalidateAll(qc),
  });
};

export const useBroadcastRemove = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => broadcastsAPI.remove(id).then((r) => r.data),
    onSuccess: () => invalidateAll(qc),
  });
};

export const useAudiencePreview = () =>
  useMutation({
    mutationFn: (target) =>
      broadcastsAPI.audiencePreview(target).then((r) => r.data.data),
  });
