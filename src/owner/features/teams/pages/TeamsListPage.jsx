import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import { MODAL } from "@/shared/constants/modals";
import { useTeamsQuery } from "../hooks/useTeamsQuery";
import TeamsTable from "../components/TeamsTable";
import TeamEditModal from "../components/modals/TeamEditModal";
import TeamDeleteModal from "../components/modals/TeamDeleteModal";

const TeamsListPage = () => {
  const { data, isLoading } = useTeamsQuery({ limit: 100 });
  const items = data?.data || [];

  return (
    <div className="p-6 flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Komandalar</h1>
        <p className="text-sm text-muted-foreground">
          Tizimdagi barcha komandalarni ko'rish va boshqarish.
        </p>
      </div>

      <TeamsTable items={items} isLoading={isLoading} />

      <ModalWrapper name={MODAL.TEAM_EDIT} title="Komandani tahrirlash">
        <TeamEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.TEAM_DELETE} title="Komandani o'chirish">
        <TeamDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default TeamsListPage;
