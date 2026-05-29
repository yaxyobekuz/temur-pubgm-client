import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { helpLinksAPI } from "../api/helpLinks.api";

export const useHelpLinksQuery = () =>
  useQuery({
    queryKey: qk.helpLinks.list(),
    queryFn: () => helpLinksAPI.list().then((r) => r.data.data),
  });

const invalidate = (qc) => qc.invalidateQueries({ queryKey: qk.helpLinks.all() });

export const useHelpLinkCreate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => helpLinksAPI.create(body).then((r) => r.data.data),
    onSuccess: () => invalidate(qc),
  });
};

export const useHelpLinkUpdate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => helpLinksAPI.update(id, body).then((r) => r.data.data),
    onSuccess: () => invalidate(qc),
  });
};

export const useHelpLinkRemove = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => helpLinksAPI.remove(id).then((r) => r.data),
    onSuccess: () => invalidate(qc),
  });
};
