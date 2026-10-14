import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  minutes: number;
  html: string;
};

const WORDS_PER_MINUTE = 200;

const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (!match) return { meta, body: raw };
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: match[2] };
};

const files = import.meta.glob("./posts/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const slug = path.replace(/^.*\//, "").replace(/\.md$/, "");
    const words = body.split(/\s+/).filter(Boolean).length;
    return {
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "1970-01-01",
      tags: (meta.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
      summary: meta.summary ?? "",
      minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
      html: marked.parse(body, { async: false }),
      draft: meta.draft === "true",
    };
  })
  .filter((post) => import.meta.env.DEV || !post.draft)
  .map(({ draft: _draft, ...post }) => post)
  .sort((a, b) => b.date.localeCompare(a.date));
