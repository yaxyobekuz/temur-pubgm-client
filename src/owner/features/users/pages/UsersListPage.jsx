import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import InputSearch from "@/shared/components/ui/input/InputSearch";
import Pagination from "@/shared/components/ui/pagination/Pagination";
import useObjectState from "@/shared/hooks/useObjectState";
import { ROLES } from "@/shared/constants/roles";
import { useUsersQuery } from "../hooks/useUsersQuery";
import UsersTable from "../components/UsersTable";

const TABS = [
  { value: ROLES.PLAYER, label: "O'yinchilar" },
  { value: ROLES.LEADER, label: "Sardorlar" },
];

const UsersListPage = () => {
  const { tab, search, page, setField, setFields } = useObjectState({
    tab: ROLES.PLAYER,
    search: "",
    page: 1,
  });

  const { data, isLoading } = useUsersQuery({
    role: tab,
    search,
    page,
    limit: 20,
  });

  const meta = data?.meta || {};

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Foydalanuvchilar</h1>
        <p className="text-sm text-muted-foreground">
          Tizimdagi o'yinchilar va komanda sardorlarini ko'rish.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TabsButtons
          items={TABS}
          value={tab}
          onChange={(value) => setFields({ tab: value, page: 1 })}
        />
        <InputSearch
          value={search}
          placeholder="Ism, username yoki telefon..."
          onChange={(e) => setFields({ search: e.target.value, page: 1 })}
          className="sm:w-72"
        />
      </div>

      <UsersTable items={data?.data || []} isLoading={isLoading} />

      <Pagination
        currentPage={meta.page || 1}
        totalPages={meta.totalPages || 1}
        hasNextPage={meta.hasNextPage || false}
        hasPrevPage={meta.hasPrevPage || false}
        onPageChange={(p) => setField("page", p)}
      />
    </div>
  );
};

export default UsersListPage;
