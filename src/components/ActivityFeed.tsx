// src/components/ActivityFeed.tsx
import { useEffect, useMemo, useState } from "react";
import { GitCommit, Github, ExternalLink } from "lucide-react";

/** ---------- Types ---------- */
type GithubRepo = { name: string; url?: string };
type GithubEvent = {
  id: string;
  type: string;
  repo: GithubRepo;
  created_at: string;
  payload?: any;
};

type FeedItem = {
  id: string;
  title: string;
  repo: GithubRepo;
  createdAt: string; // ISO
  htmlUrl?: string;
};

type Props = {
  githubUser: string;
  limit?: number;
  className?: string;
};

/** ---------- Utils ---------- */
function timeAgo(iso: string) {
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const diffSec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);

  const table: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.34524, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let unit: Intl.RelativeTimeFormatUnit = "second";
  let diff = -diffSec;
  let acc = 1;

  for (const [size, name] of table) {
    if (Math.abs(diff) < size) {
      unit = name;
      break;
    }
    diff = Math.floor(diff / size);
    acc *= size;
  }
  return rtf.format(Math.floor(diff), unit);
}

function pickTitle(e: GithubEvent): string {
  if (e.type === "PushEvent" && e.payload?.commits?.length) {
    // show the latest commit message
    return `Commit: ${e.payload.commits[0].message}`.trim();
  }
  if (e.type === "CreateEvent" && e.payload?.ref_type) {
    return `Created ${e.payload.ref_type}${e.payload.ref ? `: ${e.payload.ref}` : ""}`;
  }
  if (e.type === "PullRequestEvent" && e.payload?.action && e.payload?.pull_request?.title) {
    return `PR ${e.payload.action}: ${e.payload.pull_request.title}`;
  }
  if (e.type === "IssuesEvent" && e.payload?.action && e.payload?.issue?.title) {
    return `Issue ${e.payload.action}: ${e.payload.issue.title}`;
  }
  // fallback
  return e.type.replace(/([A-Z])/g, " $1").trim();
}

/** ---------- Fetch GitHub events ---------- */
async function fetchEvents(user: string): Promise<GithubEvent[]> {
  const token = import.meta.env.VITE_GH_TOKEN as string | undefined; // optional
  const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=30`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`);
  }

  return (await res.json()) as GithubEvent[];
}

/** ---------- Component ---------- */
export default function ActivityFeed({ githubUser, limit = 8, className = "" }: Props) {
  const [items, setItems] = useState<FeedItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    fetchEvents(githubUser)
      .then((events) => {
        if (!alive) return;
        // Map to our simplified items
        const mapped: FeedItem[] = events.slice(0, 30).map((e) => {
          const repoHtml = `https://github.com/${e.repo.name}`;
          let htmlUrl: string | undefined;

          // Try to find a sensible target link
          if (e.type === "PushEvent" && e.payload?.commits?.[0]?.url) {
            // API commit URL -> HTML URL
            htmlUrl = e.payload.commits[0].url
              .replace("api.github.com/repos", "github.com")
              .replace("/commits/", "/commit/");
          } else if (e.payload?.pull_request?.html_url) {
            htmlUrl = e.payload.pull_request.html_url;
          } else if (e.payload?.issue?.html_url) {
            htmlUrl = e.payload.issue.html_url;
          } else {
            htmlUrl = repoHtml;
          }

          return {
            id: e.id,
            title: pickTitle(e),
            repo: { name: e.repo.name, url: repoHtml },
            createdAt: e.created_at,
            htmlUrl,
          };
        });

        setItems(mapped.slice(0, limit));
        setLoading(false);
      })
      .catch((err: Error) => {
        if (!alive) return;
        setError(`GitHub API error: ${err.message}`);
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [githubUser, limit]);

  const header = useMemo(
    () => (
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
        <span className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-sm text-zinc-300">
          <Github className="h-4 w-4" /> GitHub
        </span>
      </div>
    ),
    []
  );

  return (
    <div
      className={
        "rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 ring-1 ring-inset ring-white/5 backdrop-blur " +
        className
      }
    >
      {header}

      {/* fixed height; list scrolls */}
      <div className="max-h-96 overflow-y-auto pr-1">
        {loading && <SkeletonList />}

        {!loading && error && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && items && items.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm text-zinc-400">
            No recent activity.
          </div>
        )}

        {!loading && !error && items && items.length > 0 && (
          <ul className="space-y-4">
            {items.map((it) => (
              <li
                key={it.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 hover:bg-zinc-900/70 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 ring-1 ring-inset ring-white/5">
                      <GitCommit className="h-5 w-5 text-zinc-300" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-white">{it.title}</p>

                      <a
                        href={it.htmlUrl ?? it.repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
                        aria-label="Open on GitHub"
                        title="Open on GitHub"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="mt-1 text-sm text-zinc-500">
                      <a
                        className="hover:text-zinc-300"
                        href={`https://github.com/${it.repo.name}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {it.repo.name}
                      </a>{" "}
                      · {timeAgo(it.createdAt)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** ---------- Small skeleton while loading ---------- */
function SkeletonList() {
  return (
    <ul className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 animate-pulse"
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/5 rounded bg-zinc-800" />
              <div className="h-3 w-2/5 rounded bg-zinc-800" />
            </div>
            <div className="h-9 w-9 rounded-lg bg-zinc-800" />
          </div>
        </li>
      ))}
    </ul>
  );
}
