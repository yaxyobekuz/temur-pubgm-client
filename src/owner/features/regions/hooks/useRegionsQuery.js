import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { regionsAPI } from "../api/regions.api";

export const useRegionsQuery = (params = {}) =>
  useQuery({
    queryKey: qk.regions.list(params),
    queryFn: () => regionsAPI.list(params).then((r) => r.data),
  });

export default useRegionsQuery;
