import { useState } from "react";
import Card from "@/shared/components/ui/card/Card";
import InputField from "@/shared/components/ui/input/InputField";
import Button from "@/shared/components/ui/button/Button";
import useAuth from "@/shared/hooks/useAuth";
import useObjectState from "@/shared/hooks/useObjectState";
import { ROLE_LABELS } from "@/shared/constants/roles";
import { useChangePassword } from "../hooks/useChangePassword";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

const fullName = (u) =>
  [u?.firstName, u?.lastName].filter(Boolean).join(" ") || u?.username || "-";

const ProfilePage = () => {
  const { user, role } = useAuth();

  const [editing, setEditing] = useState(false);
  const [infoError, setInfoError] = useState("");
  const [infoDone, setInfoDone] = useState(false);
  const profile = useObjectState({
    firstName: "",
    lastName: "",
    username: "",
  });
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const startEdit = () => {
    profile.setFields({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
    });
    setInfoError("");
    setInfoDone(false);
    setEditing(true);
  };

  const onSaveProfile = async (e) => {
    e.preventDefault();
    setInfoError("");
    setInfoDone(false);
    try {
      await updateProfile({
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        username: profile.username.trim(),
      });
      setEditing(false);
      setInfoDone(true);
    } catch (err) {
      setInfoError(err?.response?.data?.message || "Ma'lumotlarni saqlab bo'lmadi");
    }
  };

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
        {editing ? (
          <form onSubmit={onSaveProfile} className="mt-3 flex flex-col gap-4">
            <InputField
              label="Ism"
              value={profile.firstName}
              onChange={(e) => profile.setField("firstName", e.target.value)}
              required
            />
            <InputField
              label="Familiya"
              value={profile.lastName}
              onChange={(e) => profile.setField("lastName", e.target.value)}
            />
            <InputField
              label="Login"
              value={profile.username}
              onChange={(e) => profile.setField("username", e.target.value)}
              required
            />

            {infoError && <p className="text-sm text-destructive">{infoError}</p>}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(false)}
                disabled={isUpdating}
              >
                Bekor qilish
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </div>
          </form>
        ) : (
          <>
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

            {infoDone && (
              <p className="mt-3 text-sm text-emerald-600">
                Ma'lumotlar muvaffaqiyatli yangilandi.
              </p>
            )}

            <div className="mt-4 flex justify-end">
              <Button type="button" variant="outline" onClick={startEdit}>
                Tahrirlash
              </Button>
            </div>
          </>
        )}
      </Card>

      <Card title="Parolni o'zgartirish">
        <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-4">
          <InputField
            label="Joriy parol"
            type="password"
            value={state.currentPassword}
            onChange={(e) => state.setField("currentPassword", e.target.value)}
            required
          />
          <InputField
            label="Yangi parol"
            type="password"
            value={state.newPassword}
            onChange={(e) => state.setField("newPassword", e.target.value)}
            required
          />
          <InputField
            label="Yangi parolni tasdiqlang"
            type="password"
            value={state.confirmPassword}
            onChange={(e) => state.setField("confirmPassword", e.target.value)}
            required
          />

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
