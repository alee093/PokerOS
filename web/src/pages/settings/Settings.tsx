import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Camera, Save, Trash2, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  deleteCurrentUser,
  getCurrentUser,
  updateCurrentUser,
  uploadAvatar,
  removeAvatar,
} from "../../services/user.service";

import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import { useAuth } from "../../context/AuthContext";
import type { UserCurrency, UserProfile } from "../../types/user";

import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const { logout, refreshUser } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");
  const [currency, setCurrency] = useState<UserCurrency>("USD");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [
    removingAvatar,
    setRemovingAvatar,
  ] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getCurrentUser();

        setProfile(data);
        setUsername(data.username);
        setAvatarUrl(data.avatarUrl ?? "");
        setCountry(data.country ?? "");
        setTimezone(data.timezone ?? "");
        setCurrency(data.currency);
      } catch (error) {
        setError(getApiErrorMessage(error, "Could not load your settings"));
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setSaving(true);

      const updated = await updateCurrentUser({
        username: username.trim(),
        avatarUrl: avatarUrl.trim() || null,
        country: country.trim() || null,
        timezone: timezone.trim() || null,
        currency,
      });

      setProfile((current) => (current ? { ...current, ...updated } : current));

      await refreshUser();

      setSuccess("Settings updated successfully");
    } catch (error) {
      setError(getApiErrorMessage(error, "Could not update your settings"));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirmation !== "DELETE") {
      return;
    }

    try {
      setDeleting(true);
      setError(null);

      await deleteCurrentUser();
      await logout();

      navigate("/auth/register", { replace: true });
    } catch (error) {
      setError(getApiErrorMessage(error, "Could not delete your account"));
      setDeleting(false);
    }
  }

  async function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);

    try {
      setUploadingAvatar(true);

      const updated = await uploadAvatar(file);

      setAvatarUrl(updated.avatarUrl ?? "");
      setProfile((current) => (current ? { ...current, ...updated } : current));

      await refreshUser();
    } catch (error) {
      setError(getApiErrorMessage(error, "Could not upload profile picture"));
    } finally {
      setUploadingAvatar(false);
      event.target.value = "";
    }
  }

  async function handleRemoveAvatar() {
    try {
      setRemovingAvatar(true);
      setError(null);
      setSuccess(null);

      await removeAvatar();

      setAvatarUrl("");

      await refreshUser();

      setSuccess(
        "Profile picture removed"
      );
    } catch (error: any) {
      setError(
        getApiErrorMessage(
          error,
          "Could not remove profile picture"
        )
      );
    } finally {
      setRemovingAvatar(false);
    }
  }
  if (loading) {
    return <p className="dashboard-card__empty">Loading settings...</p>;
  }

  if (!profile) {
    return <p className="dashboard-card__empty">Could not load profile.</p>;
  }

  return (
    <div className="settings">
      <header className="settings__header">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile and PokerOS preferences.</p>
        </div>
      </header>

      <form className="settings__form" onSubmit={handleSave}>
        <section className="settings__section">
          <div className="settings__section-header">
            <div>
              <h2><UserRound size={20} />Profile</h2>
              <p>Update your personal information.</p>
            </div>
          </div>

          <div className="settings__profile-avatar">
            <div className="settings__avatar">
              {avatarUrl ? (
                <img src={avatarUrl} alt={username} />
              ) : (
                username.charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <div className="buttons_avatar-container">
                <label className="settings__avatar-upload" htmlFor="avatar">
                  <Camera size={16} />
                  {uploadingAvatar ? "Uploading..." : "Change photo"}
                </label>

                {avatarUrl && (
                <button
                  type="button"
                  className="settings__avatar-remove"
                  onClick={handleRemoveAvatar}
                  disabled={removingAvatar}
                >
                  {removingAvatar
                    ? "Removing..."
                    : "Remove photo"}
                </button>
              )}
              </div>

              <input
                id="avatar"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatarChange}
                disabled={uploadingAvatar}
                hidden
              />

              <p className="settings__hint">JPG, PNG or WebP. Maximum 2 MB.</p>
            </div>
          </div>

          <div className="settings__grid">
            <div className="settings__field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>

            <div className="settings__field">
              <label htmlFor="email">Email</label>
              <input id="email" value={profile.email} disabled />
              <span>Email cannot be changed yet.</span>
            </div>
          </div>
        </section>

        <section className="settings__section">
          <div className="settings__section-header">
            <h2>Preferences</h2>
          </div>

          <div className="settings__grid">
            <div className="settings__field">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                placeholder="Argentina"
              />
            </div>

            <div className="settings__field">
              <label htmlFor="timezone">Timezone</label>
              <input
                id="timezone"
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                placeholder="America/Argentina/Buenos_Aires"
              />
            </div>

            <div className="settings__field">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                value={currency}
                onChange={(event) =>
                  setCurrency(event.target.value as UserCurrency)
                }
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="ARS">ARS</option>
              </select>
            </div>
          </div>
        </section>

        {error && <p className="settings__error">{error}</p>}
        {success && <p className="settings__success">{success}</p>}

        <button type="submit" className="settings__save" disabled={saving}>
          <Save size={17} />
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>

      <section className="settings__section settings__danger">
        <div className="settings__section-header">
          <Trash2 size={20} />
          <div>
            <h2>Danger Zone</h2>
            <p>Permanently delete your PokerOS account and all associated data.</p>
          </div>
        </div>

        <p>
          Type <strong>DELETE</strong> to confirm.
        </p>
        <div className="settings__delete-container">
          <input
            value={deleteConfirmation}
            onChange={(event) => setDeleteConfirmation(event.target.value)}
            placeholder="DELETE"
          />

          <button
            type="button"
            className="settings__delete"
            disabled={deleting || deleteConfirmation !== "DELETE"}
            onClick={handleDeleteAccount}
          >
            <Trash2 size={17} />
            {deleting ? "Deleting..." : "Delete account"}
          </button>
        </div>
      </section>
    </div>
  );
}