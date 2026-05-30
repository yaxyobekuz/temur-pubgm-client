import { useQuery } from "@tanstack/react-query";
import { qk } from "@/shared/lib/query/keys";
import { usersAPI } from "../api/users.api";

export const useUsersQuery = (params = {}) =>
  useQuery({
    queryKey: qk.users.list(params),
    queryFn: () => usersAPI.list(params).then((r) => r.data),
    keepPreviousData: true,
  });

export const useUserQuery = (id) =>
  useQuery({
    queryKey: qk.users.one(id),
    queryFn: () => usersAPI.byId(id).then((r) => r.data.data),
    enabled: !!id,
  });

export default useUsersQuery;
