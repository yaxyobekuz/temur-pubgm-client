import { ROLE_LABELS } from "@/shared/constants/roles";
import { formatPhone } from "@/shared/utils/formatPhone";
import { formatDateUz } from "@/shared/utils/formatDate";

const Row = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 border-t px-4 py-3 first:border-t-0 sm:flex-row sm:items-center">
    <span className="text-xs uppercase text-muted-foreground sm:w-48">{label}</span>
    <span className="text-sm">{value || "-"}</span>
  </div>
);

const UserInfoTab = ({ user }) => {
  const tgUsername = user.tgUsername?.replace(/^@/, "");
  const regionName = typeof user.region === "object" ? user.region?.name : null;

  const telegram = tgUsername ? (
    <a
      href={`https://t.me/${tgUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      @{tgUsername}
    </a>
  ) : (
    user.tgId || "-"
  );

  return (
    <div className="rounded-[2px] border bg-white">
      <Row label="Rol" value={ROLE_LABELS[user.role] || user.role} />
      <Row label="Ism" value={user.firstName} />
      <Row label="Familiya" value={user.lastName} />
      <Row label="Telegram" value={telegram} />
      <Row label="Telefon" value={formatPhone(user.phone)} />
      <Row label="Mintaqa" value={regionName} />
      <Row label="Ro'yxatdan o'tgan" value={formatDateUz(user.createdAt)} />
    </div>
  );
};

export default UserInfoTab;
