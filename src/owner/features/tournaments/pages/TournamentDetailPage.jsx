import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import { MODAL } from "@/shared/constants/modals";
import { useTournamentQuery } from "../hooks/useTournaments";
import InfoTab from "../components/tabs/InfoTab";
import GroupsTab from "../components/tabs/GroupsTab";
import SponsorTab from "../components/tabs/SponsorTab";
import SecretGroupTab from "../components/tabs/SecretGroupTab";
import RegistrationsTab from "../components/tabs/RegistrationsTab";
import MessageTab from "../components/tabs/MessageTab";
import RegistrationKickModal from "../components/modals/RegistrationKickModal";
import RegistrationRestoreModal from "../components/modals/RegistrationRestoreModal";
import TournamentEditModal from "../components/modals/TournamentEditModal";
import TournamentDeleteModal from "../components/modals/TournamentDeleteModal";
import TournamentStatusModal from "../components/modals/TournamentStatusModal";
import StagePromoteModal from "../components/modals/StagePromoteModal";
import SponsorAddModal from "../components/modals/SponsorAddModal";
import SponsorDeleteModal from "../components/modals/SponsorDeleteModal";
import GroupRemoveTeamModal from "../components/modals/GroupRemoveTeamModal";
import GroupAddTeamModal from "../components/modals/GroupAddTeamModal";

const TournamentDetailPage = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("info");
  const { data: tournament, isLoading } = useTournamentQuery(id);

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!tournament) {
    return <div className="p-6 text-sm text-muted-foreground">Turnir topilmadi</div>;
  }

  const tabs = [
    { value: "info", label: "Ma'lumot", content: <InfoTab tournament={tournament} /> },
    {
      value: "groups",
      label: "Guruhlar",
      content: <GroupsTab tournament={tournament} />,
    },
    {
      value: "sponsors",
      label: "Homiy kanallar",
      content: <SponsorTab tournament={tournament} />,
    },
    {
      value: "secret-group",
      label: "Maxfiy guruh",
      content: <SecretGroupTab tournament={tournament} />,
    },
    {
      value: "registrations",
      label: "Ro'yxatdan o'tganlar",
      content: <RegistrationsTab tournament={tournament} />,
    },
    {
      value: "message",
      label: "Xabar yuborish",
      content: <MessageTab tournamentId={tournament._id} />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link to="/owner/tournaments">
            <ChevronLeft size={16} className="mr-1" />
            Orqaga
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold flex-1 truncate">{tournament.title}</h1>
      </div>

      <TabsButtons items={tabs} value={tab} onChange={setTab} />

      <ModalWrapper name={MODAL.TOURNAMENT_EDIT} title="Turnirni tahrirlash" className="max-w-xl">
        <TournamentEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.TOURNAMENT_DELETE} title="Turnirni o'chirish">
        <TournamentDeleteModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.TOURNAMENT_STATUS} title="Statusni o'zgartirish">
        <TournamentStatusModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.STAGE_PROMOTE}
        title="Keyingi bosqichga o'tkazish"
        className="max-w-xl"
      >
        <StagePromoteModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_REMOVE_TEAM} title="Komandani guruhdan chiqarish">
        <GroupRemoveTeamModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_ADD_TEAM} title="Guruhga komanda qo'shish">
        <GroupAddTeamModal />
      </ModalWrapper>

      <ModalWrapper name={MODAL.SPONSOR_ADD} title="Homiy kanal qo'shish">
        <SponsorAddModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.SPONSOR_DELETE} title="Kanalni o'chirish">
        <SponsorDeleteModal />
      </ModalWrapper>

      <ModalWrapper name={MODAL.REGISTRATION_KICK} title="Komandani chiqarish">
        <RegistrationKickModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.REGISTRATION_RESTORE} title="Komandani qaytarish">
        <RegistrationRestoreModal />
      </ModalWrapper>
    </div>
  );
};

export default TournamentDetailPage;
