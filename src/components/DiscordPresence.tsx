// src/components/DiscordPresence.tsx
import * as React from "react";

/** Standalone union so TS doesn’t choke on optional Presence["data"] */
type DiscordStatus = "online" | "idle" | "dnd" | "offline";

type Presence = {
  success: boolean;
  data?: {
    discord_status: DiscordStatus;
    discord_user: { username: string };
    activities: Array<{
      name: string;
      type: number;
      state?: string;
      details?: string;
    }>;
  };
};

// Tiny inline Discord glyph so we don't depend on an icon package export
const DiscordGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.317 4.369a19.91 19.91 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.21.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.4-.41-.874-.622-1.249a.077.077 0 0 0-.078-.037c-1.4.27-3.06.74-4.886 1.515a.07.07 0 0 0-.032.027C2.21 9.052 1.23 13.58 1.5 18.061a.08.08 0 0 0 .031.057 19.96 19.96 0 0 0 5.993 3.028.078.078 0 0 0 .084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.104 13.14 13.14 0 0 1-1.872-.892.077.077 0 0 1-.008-.127c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.372.292a.077.077 0 0 1-.006.127 12.18 12.18 0 0 1-1.873.891.076.076 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.077.077 0 0 0 .084.028 19.94 19.94 0 0 0 6.002-3.028.077.077 0 0 0 .03-.056c.5-8.173-1.287-12.665-5.384-13.665a.06.06 0 0 0-.032-.004zM8.02 15.51c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.094 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.958 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.094 2.157 2.419 0 1.334-.947 2.419-2.157 2.419z" />
  </svg>
);

const statusDot: Record<DiscordStatus, string> = {
  online: "bg-emerald-500",
  idle: "bg-amber-400",
  dnd: "bg-rose-500",
  offline: "bg-zinc-500",
};

const USER_ID = "733568404081999932";
const PROFILE_URL = `https://discord.com/users/${USER_ID}`;

export default function DiscordPresence() {
  const [username, setUsername] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<DiscordStatus>("offline");
  const [activity, setActivity] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/${USER_ID}`,
          { cache: "no-store", signal: controller.signal }
        );
        if (!res.ok) return;
        const json: Presence = await res.json();
        if (!mounted || !json.success || !json.data) return;

        setUsername(json.data.discord_user.username);
        setStatus(json.data.discord_status);

        const act =
          json.data.activities.find(a => a.type === 0 || a.type === 2 || a.type === 4) ??
          json.data.activities[0];
        setActivity(act ? act.state || act.details || act.name : null);
      } catch {
        // ignore — keep UI stable
      }
    };

    load();
    const id = setInterval(load, 30000);
    return () => {
      mounted = false;
      controller.abort();
      clearInterval(id);
    };
  }, []);

  return (
    <a
      href={PROFILE_URL}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
      aria-label="Discord profile"
      title={username ? `Discord • ${username}` : "Discord"}
    >
      <DiscordGlyph className="h-4 w-4" />
      <span className="hidden sm:inline">Discord</span>
      <span
        className={`ml-1 inline-block h-2 w-2 rounded-full ${statusDot[status]}`}
        aria-hidden="true"
      />
      {activity && (
        <span className="hidden md:inline text-xs text-zinc-500 ml-1 truncate max-w-[14rem]">
          • {activity}
        </span>
      )}
    </a>
  );
}
