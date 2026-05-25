import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { useRegionsQuery } from "../hooks/useRegionsQuery";
import RegionsTable from "../components/RegionsTable";
import RegionCreateModal from "../components/modals/RegionCreateModal";
import RegionEditModal from "../components/modals/RegionEditModal";
import RegionDeleteModal from "../components/modals/RegionDeleteModal";

const RegionsListPage = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useRegionsQuery({ limit: 200 });
  const items = data?.data || [];

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Mintaqalar</h1>
          <p className="text-sm text-muted-foreground">
            Foydalanuvchi va turnirlar uchun mintaqalar boshqaruvi.
          </p>
        </div>
        <Button onClick={() => openModal(MODAL.REGION_CREATE)}>
          <Plus size={16} className="mr-1" />
          Yangi mintaqa
        </Button>
      </div>

      <RegionsTable items={items} isLoading={isLoading} />

      <ModalWrapper name={MODAL.REGION_CREATE} title="Yangi mintaqa">
        <RegionCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.REGION_EDIT} title="Mintaqani tahrirlash">
        <RegionEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.REGION_DELETE} title="Mintaqani o'chirish">
        <RegionDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default RegionsListPage;
