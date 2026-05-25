import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import TabsButtons from "@/shared/components/ui/tabs/TabsButtons";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import { MODAL } from "@/shared/constants/modals";
import { useTournamentQuery } from "../hooks/useTournaments";
import InfoTab from "../components/tabs/InfoTab";
import StagesTab from "../components/tabs/StagesTab";
import GroupsTab from "../components/tabs/GroupsTab";
import SponsorTab from "../components/tabs/SponsorTab";
import RegistrationsTab from "../components/tabs/RegistrationsTab";
import RegistrationKickModal from "../components/modals/RegistrationKickModal";
import MatchesTab from "../components/tabs/MatchesTab";
import StandingsTab from "../components/tabs/StandingsTab";
import MatchCreateModal from "../components/modals/MatchCreateModal";
import MatchEditModal from "../components/modals/MatchEditModal";
import MatchDeleteModal from "../components/modals/MatchDeleteModal";
import MatchResultsModal from "../components/modals/MatchResultsModal";
import MatchBroadcastRoomModal from "../components/modals/MatchBroadcastRoomModal";

import TournamentEditModal from "../components/modals/TournamentEditModal";
import TournamentDeleteModal from "../components/modals/TournamentDeleteModal";
import TournamentStatusModal from "../components/modals/TournamentStatusModal";
import StageCreateModal from "../components/modals/StageCreateModal";
import StageEditModal from "../components/modals/StageEditModal";
import StageDeleteModal from "../components/modals/StageDeleteModal";
import GroupCreateModal from "../components/modals/GroupCreateModal";
import GroupEditModal from "../components/modals/GroupEditModal";
import GroupDeleteModal from "../components/modals/GroupDeleteModal";
import GroupAssignTeamsModal from "../components/modals/GroupAssignTeamsModal";
import SponsorAddModal from "../components/modals/SponsorAddModal";
import SponsorDeleteModal from "../components/modals/SponsorDeleteModal";

const TournamentDetailPage = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("info");
  const [activeStageId, setActiveStageId] = useState(null);
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
      value: "stages",
      label: "Bosqichlar",
      content: (
        <StagesTab
          tournament={tournament}
          onSelectStage={(s) => {
            setActiveStageId(s._id);
            setTab("groups");
          }}
        />
      ),
    },
    {
      value: "groups",
      label: "Guruhlar",
      content: (
        <GroupsTab
          tournament={tournament}
          stageId={activeStageId}
          onStageChange={setActiveStageId}
        />
      ),
    },
    {
      value: "sponsors",
      label: "Homiy kanallar",
      content: <SponsorTab tournament={tournament} />,
    },
    {
      value: "registrations",
      label: "Ro'yxatdan o'tganlar",
      content: <RegistrationsTab tournament={tournament} />,
    },
    {
      value: "matches",
      label: "Matchlar",
      content: <MatchesTab tournament={tournament} />,
    },
    {
      value: "standings",
      label: "Reyting",
      content: <StandingsTab tournament={tournament} />,
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-4">
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

      {/* All detail-scoped modals live here so each tab can dispatch openModal cleanly. */}
      <ModalWrapper name={MODAL.TOURNAMENT_EDIT} title="Turnirni tahrirlash" className="max-w-xl">
        <TournamentEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.TOURNAMENT_DELETE} title="Turnirni o'chirish">
        <TournamentDeleteModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.TOURNAMENT_STATUS} title="Statusni o'zgartirish">
        <TournamentStatusModal />
      </ModalWrapper>

      <ModalWrapper name={MODAL.STAGE_CREATE} title="Yangi bosqich">
        <StageCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.STAGE_EDIT} title="Bosqichni tahrirlash">
        <StageEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.STAGE_DELETE} title="Bosqichni o'chirish">
        <StageDeleteModal />
      </ModalWrapper>

      <ModalWrapper name={MODAL.GROUP_CREATE} title="Yangi guruh">
        <GroupCreateModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_EDIT} title="Guruhni tahrirlash">
        <GroupEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_DELETE} title="Guruhni o'chirish">
        <GroupDeleteModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.GROUP_ASSIGN_TEAMS} title="Komandalarni biriktirish">
        <GroupAssignTeamsModal />
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

      <ModalWrapper name={MODAL.MATCH_CREATE} title="Yangi match" className="max-w-lg">
        <MatchCreateModal tournament={tournament} />
      </ModalWrapper>
      <ModalWrapper name={MODAL.MATCH_EDIT} title="Match'ni tahrirlash" className="max-w-lg">
        <MatchEditModal />
      </ModalWrapper>
      <ModalWrapper name={MODAL.MATCH_DELETE} title="Match'ni o'chirish">
        <MatchDeleteModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.MATCH_RESULTS}
        title="Match natijasi"
        className="max-w-2xl"
      >
        <MatchResultsModal />
      </ModalWrapper>
      <ModalWrapper
        name={MODAL.MATCH_BROADCAST_ROOM}
        title="Xona ma'lumotini yuborish"
      >
        <MatchBroadcastRoomModal />
      </ModalWrapper>
    </div>
  );
};

export default TournamentDetailPage;
