import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { useTournamentsQuery } from "../hooks/useTournaments";
import TournamentsTable from "../components/TournamentsTable";
import TournamentCreateModal from "../components/modals/TournamentCreateModal";

const TournamentsListPage = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useTournamentsQuery({ limit: 200 });
  const items = data?.data || [];

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Turnirlar</h1>
          <p className="text-sm text-muted-foreground">
            Turnirlarni yarating va boshqaring.
          </p>
        </div>
        <Button onClick={() => openModal(MODAL.TOURNAMENT_CREATE)}>
          <Plus size={16} className="mr-1" />
          Yangi turnir
        </Button>
      </div>

      <TournamentsTable items={items} isLoading={isLoading} />

      <ModalWrapper
        name={MODAL.TOURNAMENT_CREATE}
        title="Yangi turnir"
        className="max-w-xl"
      >
        <TournamentCreateModal />
      </ModalWrapper>
    </div>
  );
};

export default TournamentsListPage;
