import { posts, type Post } from "./posts";

type Dispose = () => void;

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

const shell = (content: string, crumb: string) => `
  <div class="blog-page min-h-dvh w-full bg-[#08080a] text-[#cdd6f4] font-mono selection:bg-[#313244]">
    <header class="sticky top-0 z-30 border-b border-[#1e2030] bg-[#08080a]/85 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 text-sm">
        <div class="flex items-center gap-2 min-w-0">
          <a href="#/" class="shrink-0 text-[#89b4fa] hover:text-[#b4befe] transition-colors">taha@pitwall</a>
          <span class="text-[#585b70]">:</span>
          <span class="truncate text-[#a6e3a1]">${crumb}</span>
        </div>
        <a href="#/" class="shrink-0 rounded-md border border-[#2d3139] px-3 py-1 text-[#a6adc8] hover:border-[#89b4fa] hover:text-[#b4befe] transition-colors">&larr; home</a>
      </div>
    </header>
    ${content}
  </div>`;

/* ---------------------------------------------------------------- index */

const mountIndex = (root: HTMLElement): Dispose => {
  document.title = "Blog | Taha Salman";
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();
  const activeTags = new Set<string>();
  let query = "";
  let selected = 0;
  let visible: Post[] = posts;

  root.innerHTML = shell(
    `<main class="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#d8b4fe] tracking-wide">Blog</h1>
      <p class="mt-2 text-[#9399b2] text-sm sm:text-[15px] leading-relaxed">Longer writing, thinking out loud.</p>

      <div class="mt-8 flex items-center gap-2 rounded-md border border-[#2d3139] bg-[#0d0d11] px-3 py-2 focus-within:border-[#89b4fa] transition-colors">
        <span class="text-[#a6e3a1] shrink-0" aria-hidden="true">grep</span>
        <input id="blog-search" type="search" placeholder="search posts" autocomplete="off" spellcheck="false" aria-label="Search posts" class="min-w-0 flex-1 bg-transparent text-[#e5c07b] placeholder:text-[#45475a] outline-none text-sm" />
        <kbd class="hidden sm:block shrink-0 rounded border border-[#2d3139] px-1.5 text-[11px] text-[#585b70]">/</kbd>
      </div>

      <div id="blog-tags" class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by tag"></div>
      <div id="blog-list" class="mt-6" role="list" aria-live="polite"></div>
      <p class="mt-10 hidden sm:block select-none text-[11px] text-[#585b70]">[Hint: <kbd>/</kbd> search · <kbd>j</kbd>/<kbd>k</kbd> move · <kbd>enter</kbd> open · <kbd>esc</kbd> home]</p>
    </main>`,
    "~/blog",
  );

  const search = root.querySelector<HTMLInputElement>("#blog-search")!;
  const tagBar = root.querySelector<HTMLElement>("#blog-tags")!;
  const list = root.querySelector<HTMLElement>("#blog-list")!;

  const renderTags = () => {
    tagBar.innerHTML = allTags
      .map((tag) => {
        const on = activeTags.has(tag);
        return `<button type="button" data-tag="${escapeHtml(tag)}" aria-pressed="${on}" class="rounded-full border px-3 py-0.5 text-xs transition-colors cursor-pointer ${
          on ? "border-[#cba6f7] bg-[#cba6f7]/15 text-[#cba6f7]" : "border-[#2d3139] text-[#a6adc8] hover:border-[#89b4fa] hover:text-[#89b4fa]"
        }">${escapeHtml(tag)}</button>`;
      })
      .join("");
  };

  const renderList = () => {
    const q = query.trim().toLowerCase();
    visible = posts.filter(
      (p) =>
        [...activeTags].every((t) => p.tags.includes(t)) &&
        (!q || `${p.title} ${p.summary} ${p.tags.join(" ")}`.toLowerCase().includes(q)),
    );
    selected = Math.min(selected, Math.max(visible.length - 1, 0));

    if (!posts.length) {
      list.innerHTML = '<p class="text-sm text-[#585b70]">Nothing here yet. First post soon.</p>';
      return;
    }
    if (!visible.length) {
      list.innerHTML = `<p class="text-sm text-[#f38ba8]">grep: no posts match${q ? ` "${escapeHtml(query.trim())}"` : ""}.</p>`;
      return;
    }

    list.innerHTML = visible
      .map(
        (p, i) => `
        <a role="listitem" href="#/blog/${encodeURIComponent(p.slug)}" data-index="${i}" class="blog-row group block border-l-2 px-4 py-4 -ml-px transition-colors ${
          i === selected ? "border-[#89b4fa] bg-[#89b4fa]/[0.06]" : "border-transparent hover:border-[#45475a]"
        }">
          <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-[#585b70]">
            <time datetime="${p.date}">${formatDate(p.date)}</time>
            <span>${p.minutes} min read</span>
          </div>
          <h2 class="mt-1 text-lg font-semibold text-[#cdd6f4] group-hover:text-[#b4befe] transition-colors"><span class="text-[#89b4fa] mr-2 ${i === selected ? "" : "invisible"}" aria-hidden="true">&gt;</span>${escapeHtml(p.title)}</h2>
          ${p.summary ? `<p class="mt-1 text-sm leading-relaxed text-[#9399b2]">${escapeHtml(p.summary)}</p>` : ""}
          ${p.tags.length ? `<div class="mt-2 flex flex-wrap gap-2 text-xs text-[#cba6f7]">${p.tags.map((t) => `<span>#${escapeHtml(t)}</span>`).join("")}</div>` : ""}
        </a>`,
      )
      .join("");
  };

  const refresh = () => {
    renderTags();
    renderList();
  };
  refresh();

  search.addEventListener("input", () => {
    query = search.value;
    selected = 0;
    renderList();
  });

  tagBar.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>("[data-tag]");
    if (!button) return;
    const tag = button.dataset.tag!;
    if (!activeTags.delete(tag)) activeTags.add(tag);
    selected = 0;
    refresh();
  });

  list.addEventListener("mousemove", (event) => {
    const row = (event.target as HTMLElement).closest<HTMLElement>("[data-index]");
    if (!row) return;
    const index = Number(row.dataset.index);
    if (index !== selected) {
      selected = index;
      renderList();
    }
  });

  const onKey = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === "/" && !isTyping(event.target)) {
      event.preventDefault();
      search.focus();
      return;
    }
    if (event.key === "Escape") {
      if (query || document.activeElement === search) {
        search.value = "";
        query = "";
        search.blur();
        renderList();
      } else {
        location.hash = "#/";
      }
      return;
    }
    if (event.key === "Enter" && isTyping(event.target) && visible[selected]) {
      location.hash = `#/blog/${encodeURIComponent(visible[selected].slug)}`;
      return;
    }
    const down = event.key === "ArrowDown" || (event.key === "j" && !isTyping(event.target));
    const up = event.key === "ArrowUp" || (event.key === "k" && !isTyping(event.target));
    if ((down || up) && visible.length) {
      event.preventDefault();
      selected = (selected + (down ? 1 : -1) + visible.length) % visible.length;
      renderList();
      list.querySelector<HTMLElement>(`[data-index="${selected}"]`)?.scrollIntoView({ block: "nearest" });
    }
  };
  document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
};

/* ----------------------------------------------------------------- post */

const mountPost = (root: HTMLElement, post: Post): Dispose => {
  document.title = `${post.title} | Taha Salman`;
  const index = posts.indexOf(post);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  root.innerHTML =
    `<div id="read-progress" class="fixed top-0 left-0 z-40 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-[#89b4fa] to-[#cba6f7]"></div>` +
    shell(
      `<div class="mx-auto flex max-w-5xl gap-12 px-5 py-10 sm:py-14">
        <article class="min-w-0 flex-1 max-w-[42rem]">
          <a href="#/blog" class="text-sm text-[#585b70] hover:text-[#89b4fa] transition-colors">&larr; all posts</a>
          <h1 class="mt-5 text-2xl sm:text-4xl font-bold leading-tight text-[#d8b4fe]">${escapeHtml(post.title)}</h1>
          <div class="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs text-[#585b70]">
            <time datetime="${post.date}">${formatDate(post.date)}</time>
            <span>${post.minutes} min read</span>
            ${post.tags.map((t) => `<span class="text-[#cba6f7]">#${escapeHtml(t)}</span>`).join("")}
          </div>
          <div id="post-body" class="prose-blog mt-10">${post.html}</div>
          <footer class="mt-16 border-t border-[#1e2030] pt-6">
            <div class="flex flex-wrap items-center justify-between gap-3 text-sm">
              <button id="copy-link" type="button" class="rounded-md border border-[#2d3139] px-3 py-1.5 text-[#a6adc8] hover:border-[#89b4fa] hover:text-[#b4befe] transition-colors cursor-pointer">copy link</button>
              <button id="to-top" type="button" class="text-[#585b70] hover:text-[#89b4fa] transition-colors cursor-pointer">back to top &uarr;</button>
            </div>
            <nav class="mt-8 grid gap-4 sm:grid-cols-2 text-sm" aria-label="More posts">
              ${
                newer
                  ? `<a href="#/blog/${encodeURIComponent(newer.slug)}" class="rounded-md border border-[#2d3139] p-4 hover:border-[#89b4fa] transition-colors"><div class="text-xs text-[#585b70]">&larr; newer</div><div class="mt-1 text-[#cdd6f4]">${escapeHtml(newer.title)}</div></a>`
                  : "<div></div>"
              }
              ${
                older
                  ? `<a href="#/blog/${encodeURIComponent(older.slug)}" class="rounded-md border border-[#2d3139] p-4 text-right hover:border-[#89b4fa] transition-colors"><div class="text-xs text-[#585b70]">older &rarr;</div><div class="mt-1 text-[#cdd6f4]">${escapeHtml(older.title)}</div></a>`
                  : ""
              }
            </nav>
          </footer>
        </article>
        <aside id="toc" class="hidden lg:block w-56 shrink-0" aria-label="On this page">
          <div class="sticky top-24 text-sm">
            <div class="mb-3 text-xs uppercase tracking-widest text-[#585b70]">On this page</div>
            <ul id="toc-list" class="space-y-2 border-l border-[#1e2030]"></ul>
            <p class="mt-8 select-none text-[11px] leading-relaxed text-[#585b70]"><kbd>j</kbd>/<kbd>k</kbd> scroll · <kbd>esc</kbd> back</p>
          </div>
        </aside>
      </div>`,
      `~/blog/${escapeHtml(post.slug)}`,
    );

  const body = root.querySelector<HTMLElement>("#post-body")!;
  const progress = root.querySelector<HTMLElement>("#read-progress")!;
  const toc = root.querySelector<HTMLElement>("#toc")!;
  const tocList = root.querySelector<HTMLElement>("#toc-list")!;

  // Headings: give each an id and build the table of contents from them.
  const headings = [...body.querySelectorAll<HTMLElement>("h2, h3")];
  const used = new Set<string>();
  for (const heading of headings) {
    let id = slugify(heading.textContent ?? "") || "section";
    while (used.has(id)) id += "-";
    used.add(id);
    heading.id = id;
  }
  if (headings.length < 2) toc.remove();
  tocList.innerHTML = headings
    .map(
      (h) =>
        `<li><button type="button" data-target="${h.id}" class="toc-link -ml-px block w-full border-l-2 border-transparent py-0.5 text-left leading-snug text-[#585b70] hover:text-[#cdd6f4] transition-colors cursor-pointer ${
          h.tagName === "H3" ? "pl-6 text-[13px]" : "pl-4"
        }">${escapeHtml(h.textContent ?? "")}</button></li>`,
    )
    .join("");

  // Code blocks: copy button.
  for (const pre of body.querySelectorAll<HTMLElement>("pre")) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "copy";
    button.className = "code-copy";
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.querySelector("code")?.textContent ?? pre.textContent ?? "");
        button.textContent = "copied";
      } catch {
        button.textContent = "failed";
      }
      setTimeout(() => (button.textContent = "copy"), 1400);
    });
    pre.append(button);
  }

  // External links open in a new tab.
  for (const a of body.querySelectorAll<HTMLAnchorElement>("a[href^='http']")) {
    a.target = "_blank";
    a.rel = "noreferrer";
  }

  const scrollToHeading = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  tocList.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>("[data-target]");
    if (button) scrollToHeading(button.dataset.target!);
  });

  const copyLink = root.querySelector<HTMLButtonElement>("#copy-link")!;
  copyLink.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      copyLink.textContent = "copied";
    } catch {
      copyLink.textContent = "press ctrl+c on the address bar";
    }
    setTimeout(() => (copyLink.textContent = "copy link"), 1600);
  });
  root.querySelector("#to-top")!.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Reading progress + scroll-spy.
  const links = [...tocList.querySelectorAll<HTMLElement>(".toc-link")];
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 1})`;

    let current = -1;
    headings.forEach((h, i) => {
      if (h.getBoundingClientRect().top <= 120) current = i;
    });
    if (max > 0 && window.scrollY >= max - 4) current = headings.length - 1;
    links.forEach((link, i) => {
      const on = i === current;
      link.classList.toggle("is-active", on);
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  const onKey = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;
    if (event.key === "Escape") location.hash = "#/blog";
    else if (event.key === "j") window.scrollBy({ top: window.innerHeight * 0.3, behavior: "smooth" });
    else if (event.key === "k") window.scrollBy({ top: -window.innerHeight * 0.3, behavior: "smooth" });
  };
  document.addEventListener("keydown", onKey);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    document.removeEventListener("keydown", onKey);
  };
};

/* --------------------------------------------------------------- router */

const mountNotFound = (root: HTMLElement, slug: string): Dispose => {
  document.title = "Not found | Taha Salman";
  root.innerHTML = shell(
    `<main class="mx-auto max-w-3xl px-5 py-14 text-sm">
      <p class="text-[#f38ba8]">cat: ${escapeHtml(slug)}: no such post</p>
      <a href="#/blog" class="mt-4 inline-block text-[#89b4fa] hover:underline">&larr; back to all posts</a>
    </main>`,
    "~/blog",
  );
  return () => {};
};

export const mountBlog = (root: HTMLElement, slug?: string): Dispose => {
  if (!slug) return mountIndex(root);
  const post = posts.find((p) => p.slug === slug);
  return post ? mountPost(root, post) : mountNotFound(root, slug);
};
