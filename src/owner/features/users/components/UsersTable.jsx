import { useNavigate } from "react-router-dom";
import Badge from "@/shared/components/ui/badge/Badge";
import { formatPhone } from "@/shared/utils/formatPhone";

const UsersTable = ({ items = [], isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!items.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Foydalanuvchilar topilmadi
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-[2px] border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2 font-medium text-left">Ism</th>
            <th className="px-3 py-2 font-medium text-left">Telegram</th>
            <th className="px-3 py-2 font-medium text-left">Aloqa</th>
            <th className="px-3 py-2 font-medium text-left">Telefon</th>
            <th className="px-3 py-2 font-medium text-left">Holat</th>
          </tr>
        </thead>
        <tbody>
          {items.map((u) => {
            const name =
              [u.firstName, u.lastName].filter(Boolean).join(" ") || "-";
            const telegram = u.tgUsername
              ? `@${u.tgUsername}`
              : u.tgId || "-";
            const phone = formatPhone(u.phone || u.contactPhone) || "-";
            return (
              <tr
                key={u._id}
                className="border-t cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/owner/users/${u._id}`)}
              >
                <td className="px-3 py-2 font-medium">{name}</td>
                <td className="px-3 py-2">{telegram}</td>
                <td className="px-3 py-2">
                  {u.contactUsername ? (
                    <a
                      href={`https://t.me/${u.contactUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      @{u.contactUsername}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-3 py-2">{phone}</td>
                <td className="px-3 py-2">
                  <Badge variant={u.isActive ? "default" : "secondary"}>
                    {u.isActive ? "Faol" : "Nofaol"}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
