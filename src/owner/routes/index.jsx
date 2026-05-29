import { Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "@/owner/pages/DashboardPage";
import { RegionsListPage } from "@/owner/features/regions";
import { TeamsListPage, TeamDetailPage } from "@/owner/features/teams";
import {
  TournamentsListPage,
  TournamentDetailPage,
} from "@/owner/features/tournaments";
import { BroadcastsListPage } from "@/owner/features/broadcasts";
import { ProfilePage } from "@/owner/features/profile";
import { HelpLinksPage } from "@/owner/features/help-links";

const OwnerRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="regions" element={<RegionsListPage />} />
    <Route path="teams" element={<TeamsListPage />} />
    <Route path="teams/:id" element={<TeamDetailPage />} />
    <Route path="tournaments" element={<TournamentsListPage />} />
    <Route path="tournaments/:id" element={<TournamentDetailPage />} />
    <Route path="broadcasts" element={<BroadcastsListPage />} />
    <Route path="help-links" element={<HelpLinksPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="*" element={<Navigate to="dashboard" replace />} />
  </Routes>
);

export default OwnerRoutes;
