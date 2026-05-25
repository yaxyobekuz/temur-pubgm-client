import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { regionsAPI } from "../api/regions.api";

export const useRegionCreate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => regionsAPI.create(body).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.regions.all() }),
  });
};

export const useRegionUpdate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) =>
      regionsAPI.update(id, body).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.regions.all() }),
  });
};

export const useRegionRemove = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => regionsAPI.remove(id).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.regions.all() }),
  });
};
