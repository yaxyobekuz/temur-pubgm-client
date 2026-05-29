import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import { TOURNAMENT_MODE_LABELS } from "@/shared/constants/tournament";
import { formatDateTimeUZ } from "@/shared/utils/date.utils";
import TournamentStatusBadge from "./TournamentStatusBadge";

const formatDate = (iso) => (iso ? formatDateTimeUZ(iso) : "-");

const TournamentsTable = ({ items = [], isLoading }) => {
  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!items.length) {
    return <div className="p-4 text-sm text-muted-foreground">Turnirlar topilmadi</div>;
  }
  return (
    <div className="w-full overflow-x-auto rounded-[2px] border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2 font-medium">Sarlavha</th>
            <th className="px-3 py-2 font-medium">Rejim</th>
            <th className="px-3 py-2 font-medium">Boshlanish</th>
            <th className="px-3 py-2 font-medium">Status</th>
            <th className="px-3 py-2 font-medium text-right">Amal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t._id} className="border-t">
              <td className="px-3 py-2">
                <div className="font-medium">{t.title}</div>
              </td>
              <td className="px-3 py-2">{TOURNAMENT_MODE_LABELS[t.mode] || t.mode}</td>
              <td className="px-3 py-2">{formatDate(t.startDate)}</td>
              <td className="px-3 py-2">
                <TournamentStatusBadge status={t.status} />
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/owner/tournaments/${t._id}`}>
                      <ExternalLink size={16} className="mr-1" />
                      Ochish
                    </Link>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentsTable;
