import { useState, useEffect } from "react";

import type {
  CreateTournamentInput,
  Currency,
  GameType,
  TournamentFormat,
  TournamentSpeed,
} from "../../../types/tournament";

import { getPokerSites } from "../../../services/poker-site.service";

import type { PokerSite } from "../../../types/poker-site";

interface TournamentFormProps {
  initialValues?: Partial<CreateTournamentInput>;
  submitLabel: string;
  loading: boolean;
  onSubmit: (data: CreateTournamentInput) => Promise<void>;
}

export default function TournamentForm({
  initialValues,
  submitLabel,
  loading,
  onSubmit,
}: TournamentFormProps) {
  const [siteId, setSiteId] =
    useState(initialValues?.siteId ?? "");

  const [name, setName] =
    useState(initialValues?.name ?? "");

  const [format, setFormat] =
    useState<TournamentFormat>(
      initialValues?.format ?? "FREEZEOUT"
    );

  const [gameType, setGameType] =
    useState<GameType>(
      initialValues?.gameType ?? "NLH"
    );

  const [speed, setSpeed] =
    useState<TournamentSpeed>(
      initialValues?.speed ?? "REGULAR"
    );

  const [currency, setCurrency] =
    useState<Currency>(
      initialValues?.currency ?? "USD"
    );

  const [entries, setEntries] =
    useState(
      String(initialValues?.entries ?? 1)
    );

  const [buyIn, setBuyIn] =
    useState(
      String(initialValues?.buyIn ?? "")
    );

  const [fee, setFee] =
    useState(
      String(initialValues?.fee ?? "")
    );

  const [isBounty, setIsBounty] =
    useState(
      initialValues?.isBounty ?? false
    );

  const [bountyCollected, setBountyCollected] =
    useState(
      String(
        initialValues?.bountyCollected ?? 0
      )
    );

  const [prize, setPrize] =
    useState(
      String(initialValues?.prize ?? 0)
    );

  const [position, setPosition] =
    useState(
      initialValues?.position !== undefined
        ? String(initialValues.position)
        : ""
    );

  const [playersCount, setPlayersCount] =
    useState(
      initialValues?.playersCount !== undefined
        ? String(initialValues.playersCount)
        : ""
    );

  const [startedAt, setStartedAt] =
    useState(
      initialValues?.startedAt
        ? initialValues.startedAt.slice(0, 16)
        : ""
    );

  const [finishedAt, setFinishedAt] =
    useState(
      initialValues?.finishedAt
        ? initialValues.finishedAt.slice(0, 16)
        : ""
    );

  const [notes, setNotes] =
    useState(initialValues?.notes ?? "");

  const [sites, setSites] =
    useState<PokerSite[]>([]);

  const [sitesLoading, setSitesLoading] =
    useState(true);

  const [sitesError, setSitesError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadSites() {
      try {
        const data = await getPokerSites();

        setSites(data);

        if (
          !siteId &&
          data.length > 0
        ) {
          setSiteId(data[0].id);
        }
      } catch {
        setSitesError(
          "Could not load poker sites"
        );
      } finally {
        setSitesLoading(false);
      }
    }

    loadSites();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await onSubmit({
      siteId,
      name,
      format,
      gameType,
      speed,
      currency,
      entries: Number(entries),
      buyIn: Number(buyIn),
      fee: Number(fee),
      isBounty,
      bountyCollected: Number(bountyCollected),
      prize: Number(prize),

      ...(position && {
        position: Number(position),
      }),

      ...(playersCount && {
        playersCount: Number(playersCount),
      }),

      startedAt:
        new Date(startedAt).toISOString(),

      ...(finishedAt && {
        finishedAt:
          new Date(finishedAt).toISOString(),
      }),

      ...(notes.trim() && {
        notes: notes.trim(),
      }),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="siteId">
          Poker Site
        </label>

        {sitesLoading ? (
          <p>Loading poker sites...</p>
        ) : sitesError ? (
          <p>{sitesError}</p>
        ) : sites.length === 0 ? (
          <p>No poker sites available.</p>
        ) : (
          <select
            id="siteId"
            value={siteId}
            onChange={(event) =>
              setSiteId(event.target.value)
            }
            required
          >
            {sites.map((site) => (
              <option
                key={site.id}
                value={site.id}
              >
                {site.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label htmlFor="name">
          Tournament name
        </label>

        <input
          id="name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />
      </div>

      <div>
        <label htmlFor="format">
          Format
        </label>

        <select
          id="format"
          value={format}
          onChange={(event) =>
            setFormat(
              event.target.value as TournamentFormat
            )
          }
        >
          <option value="FREEZEOUT">
            Freezeout
          </option>
          <option value="REENTRY">
            Re-entry
          </option>
          <option value="PKO">
            PKO
          </option>
          <option value="MYSTERY_BOUNTY">
            Mystery Bounty
          </option>
          <option value="SATELLITE">
            Satellite
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="gameType">
          Game
        </label>

        <select
          id="gameType"
          value={gameType}
          onChange={(event) =>
            setGameType(
              event.target.value as GameType
            )
          }
        >
          <option value="NLH">NLH</option>
          <option value="PLO">PLO</option>
          <option value="PLO5">PLO5</option>
          <option value="MIXED">Mixed</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="speed">
          Speed
        </label>

        <select
          id="speed"
          value={speed}
          onChange={(event) =>
            setSpeed(
              event.target.value as TournamentSpeed
            )
          }
        >
          <option value="REGULAR">
            Regular
          </option>
          <option value="TURBO">
            Turbo
          </option>
          <option value="HYPER">
            Hyper
          </option>
          <option value="DEEPSTACK">
            Deepstack
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="currency">
          Currency
        </label>

        <select
          id="currency"
          value={currency}
          onChange={(event) =>
            setCurrency(
              event.target.value as Currency
            )
          }
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ARS">ARS</option>
        </select>
      </div>

      <div>
        <label htmlFor="entries">
          Entries
        </label>

        <input
          id="entries"
          type="number"
          min="1"
          value={entries}
          onChange={(event) =>
            setEntries(event.target.value)
          }
          required
        />
      </div>

      <div>
        <label htmlFor="buyIn">
          Buy-in
        </label>

        <input
          id="buyIn"
          type="number"
          min="0"
          step="0.01"
          value={buyIn}
          onChange={(event) =>
            setBuyIn(event.target.value)
          }
          required
        />
      </div>

      <div>
        <label htmlFor="fee">
          Fee
        </label>

        <input
          id="fee"
          type="number"
          min="0"
          step="0.01"
          value={fee}
          onChange={(event) =>
            setFee(event.target.value)
          }
          required
        />
      </div>

      <label>
        <input
          type="checkbox"
          checked={isBounty}
          onChange={(event) =>
            setIsBounty(event.target.checked)
          }
        />
        Bounty tournament
      </label>

      {isBounty && (
        <div>
          <label htmlFor="bountyCollected">
            Bounty collected
          </label>

          <input
            id="bountyCollected"
            type="number"
            min="0"
            step="0.01"
            value={bountyCollected}
            onChange={(event) =>
              setBountyCollected(
                event.target.value
              )
            }
          />
        </div>
      )}

      <div>
        <label htmlFor="prize">
          Prize
        </label>

        <input
          id="prize"
          type="number"
          min="0"
          step="0.01"
          value={prize}
          onChange={(event) =>
            setPrize(event.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="position">
          Position
        </label>

        <input
          id="position"
          type="number"
          min="1"
          value={position}
          onChange={(event) =>
            setPosition(event.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="playersCount">
          Players
        </label>

        <input
          id="playersCount"
          type="number"
          min="1"
          value={playersCount}
          onChange={(event) =>
            setPlayersCount(
              event.target.value
            )
          }
        />
      </div>

      <div>
        <label htmlFor="startedAt">
          Started at
        </label>

        <input
          id="startedAt"
          type="datetime-local"
          value={startedAt}
          onChange={(event) =>
            setStartedAt(event.target.value)
          }
          required
        />
      </div>

      <div>
        <label htmlFor="finishedAt">
          Finished at
        </label>

        <input
          id="finishedAt"
          type="datetime-local"
          value={finishedAt}
          onChange={(event) =>
            setFinishedAt(event.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="notes">
          Notes
        </label>

        <textarea
          id="notes"
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : submitLabel}
      </button>
    </form>
  );
}