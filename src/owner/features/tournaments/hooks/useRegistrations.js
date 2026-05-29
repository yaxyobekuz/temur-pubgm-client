import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { registrationsAPI } from "../api/registrations.api";

export const useRegistrationsByTournament = (tournamentId, status) =>
  useQuery({
    queryKey: qk.registrations.byTournament(tournamentId, { status }),
    queryFn: () =>
      registrationsAPI
        .list({ tournament: tournamentId, status })
        .then((r) => r.data.data),
    enabled: !!tournamentId,
  });

// Invalidate every byTournament query for this tournament regardless of its params.
const invalidateByTournament = (qc, tournamentId) =>
  qc.invalidateQueries({
    queryKey: ["registrations", "byTournament", tournamentId],
  });

export const useRegistrationKick = (tournamentId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => registrationsAPI.kick(id).then((r) => r.data.data),
    onSuccess: () => invalidateByTournament(qc, tournamentId),
  });
};

export const useRegistrationRestore = (tournamentId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => registrationsAPI.restore(id).then((r) => r.data.data),
    onSuccess: () => invalidateByTournament(qc, tournamentId),
  });
};
