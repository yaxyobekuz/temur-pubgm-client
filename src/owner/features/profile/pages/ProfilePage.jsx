import { useState } from "react";
import Card from "@/shared/components/ui/card/Card";
import Input from "@/shared/components/ui/input/Input";
import Button from "@/shared/components/ui/button/Button";
import useAuth from "@/shared/hooks/useAuth";
import useObjectState from "@/shared/hooks/useObjectState";
import { ROLE_LABELS } from "@/shared/constants/roles";
import { useChangePassword } from "../hooks/useChangePassword";

const fullName = (u) =>
  [u?.firstName, u?.lastName].filter(Boolean).join(" ") || u?.username || "-";

const ProfilePage = () => {
  const { user, role } = useAuth();
  const state = useObjectState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const { mutateAsync, isPending } = useChangePassword();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDone(false);
    if (state.newPassword !== state.confirmPassword) {
      setError("Yangi parollar mos kelmadi");
      return;
    }
    try {
      await mutateAsync({
        currentPassword: state.currentPassword,
        newPassword: state.newPassword,
      });
      state.resetState();
      setDone(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Parolni yangilab bo'lmadi");
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Profil</h1>

      <Card title="Ma'lumotlar">
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ism</span>
            <span className="font-medium">{fullName(user)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Login</span>
            <span className="font-medium">{user?.username || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rol</span>
            <span className="font-medium">{ROLE_LABELS[role] || role || "-"}</span>
          </div>
        </div>
      </Card>

      <Card title="Parolni o'zgartirish">
        <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            Joriy parol
            <Input
              type="password"
              value={state.currentPassword}
              onChange={(e) => state.setField("currentPassword", e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            Yangi parol
            <Input
              type="password"
              value={state.newPassword}
              onChange={(e) => state.setField("newPassword", e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            Yangi parolni tasdiqlang
            <Input
              type="password"
              value={state.confirmPassword}
              onChange={(e) => state.setField("confirmPassword", e.target.value)}
              required
            />
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {done && <p className="text-sm text-emerald-600">Parol muvaffaqiyatli yangilandi.</p>}

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
