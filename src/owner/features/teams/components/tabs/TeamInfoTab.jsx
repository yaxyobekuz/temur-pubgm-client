import { Crown, User } from "lucide-react";
import Badge from "@/shared/components/ui/badge/Badge";
import { toMediaUrl } from "@/shared/utils/mediaUrl";

const memberName = (u) =>
  [u?.firstName, u?.lastName].filter(Boolean).join(" ") ||
  u?.username ||
  u?.tgUsername ||
  "-";

const MemberRow = ({ user, isLeader }) => (
  <div className="flex items-center justify-between gap-3 rounded-[2px] border bg-white p-3">
    <div className="flex items-center gap-3">
      {isLeader ? (
        <Crown size={18} className="text-primary" />
      ) : (
        <User size={18} className="text-muted-foreground" />
      )}
      <div>
        <div className="font-medium">{memberName(user)}</div>
        {user?.gameNickname && (
          <div className="text-xs text-muted-foreground">{user.gameNickname}</div>
        )}
      </div>
    </div>
    {user?.tgUsername && (
      <Badge variant="secondary">@{user.tgUsername.replace(/^@/, "")}</Badge>
    )}
  </div>
);

const TeamInfoTab = ({ team }) => {
  const leaderId = team.leader?._id || team.leader;
  const members = (team.members || []).filter(
    (m) => String(m?._id || m) !== String(leaderId),
  );

  return (
    <div className="space-y-4">
      <div className="rounded-[2px] border bg-white p-4 flex items-center gap-4">
        {team.logo ? (
          <img
            src={toMediaUrl(team.logo)}
            alt={team.name}
            className="size-16 rounded-[2px] border object-cover"
          />
        ) : (
          <div className="size-16 rounded-[2px] border bg-muted" />
        )}
        <div className="text-sm">
          <div className="text-muted-foreground text-xs uppercase">Invite kod</div>
          <div className="font-mono">{team.inviteCode}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase text-muted-foreground">
          Sardor
        </h2>
        {team.leader ? (
          <MemberRow user={team.leader} isLeader />
        ) : (
          <div className="text-sm text-muted-foreground">Sardor yo'q</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase text-muted-foreground">
          A'zolar ({members.length})
        </h2>
        {members.length ? (
          <div className="flex flex-col gap-2">
            {members.map((m) => (
              <MemberRow key={m._id || m} user={m} />
            ))}
          </div>
        ) : (
          <div className="p-4 text-sm text-muted-foreground rounded-[2px] border bg-white">
            Boshqa a'zolar yo'q
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamInfoTab;
