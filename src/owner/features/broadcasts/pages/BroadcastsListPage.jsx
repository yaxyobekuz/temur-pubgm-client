import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { useBroadcastsQuery } from "../hooks/useBroadcasts";
import BroadcastsTable from "../components/BroadcastsTable";
import BroadcastCreateModal from "../components/modals/BroadcastCreateModal";
import BroadcastDetailModal from "../components/modals/BroadcastDetailModal";
import BroadcastCancelModal from "../components/modals/BroadcastCancelModal";
import BroadcastDeleteModal from "../components/modals/BroadcastDeleteModal";

const BroadcastsListPage = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useBroadcastsQuery({ limit: 50 });
  const items = data?.data || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Xabarnomalar (Reklama)</h1>
          <p className="text-sm text-muted-foreground">
            Telegram orqali foydalanuvchilarga xabar va reklama yuborish.
          </p>
        </div>
        <Button onClick={() => openModal(MODAL.BROADCAST_CREATE)}>
          <Plus size={16} className="mr-1" />
          Yangi xabarnoma
        </Button>
      </div>

      <BroadcastsTable items={items} isLoading={isLoading} />

      <ModalWrapper
        name={MODAL.BROADCAST_CREATE}
        title="Yangi xabarnoma"
        className="max-w-xl"
      >
        <BroadcastCreateModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.BROADCAST_DETAIL}
        title="Xabarnoma tafsilotlari"
        className="max-w-xl"
      >
        <BroadcastDetailModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.BROADCAST_CANCEL} title="Yuborishni bekor qilish">
        <BroadcastCancelModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.BROADCAST_DELETE} title="Xabarnomani o'chirish">
        <BroadcastDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default BroadcastsListPage;
