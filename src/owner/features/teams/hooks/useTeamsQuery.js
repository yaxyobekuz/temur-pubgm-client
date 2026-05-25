import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { teamsAPI } from "../api/teams.api";

export const useTeamsQuery = (params = {}) =>
  useQuery({
    queryKey: qk.teams.list(params),
    queryFn: () => teamsAPI.list(params).then((r) => r.data),
  });

export default useTeamsQuery;
