import { Plus } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";
import { useHelpLinksQuery } from "../hooks/useHelpLinks";
import HelpLinksTable from "../components/HelpLinksTable";
import HelpLinkCreateModal from "../components/modals/HelpLinkCreateModal";
import HelpLinkEditModal from "../components/modals/HelpLinkEditModal";
import HelpLinkDeleteModal from "../components/modals/HelpLinkDeleteModal";

const HelpLinksPage = () => {
  const { openModal } = useModal();
  const { data: items = [], isLoading } = useHelpLinksQuery();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Yordam havolalari</h1>
          <p className="text-sm text-muted-foreground">
            Bot "Yordam" tugmasida ko'rinadigan admin havolalari.
          </p>
        </div>
        <Button onClick={() => openModal(MODAL.HELP_LINK_CREATE)}>
          <Plus size={16} className="mr-1" />
          Yangi havola
        </Button>
      </div>

      <HelpLinksTable items={items} isLoading={isLoading} />

      <ModalWrapper name={MODAL.HELP_LINK_CREATE} title="Yangi havola">
        <HelpLinkCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.HELP_LINK_EDIT} title="Havolani tahrirlash">
        <HelpLinkEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.HELP_LINK_DELETE} title="Havolani o'chirish">
        <HelpLinkDeleteModal />
      </ModalWrapper>
    </div>
  );
};

export default HelpLinksPage;
