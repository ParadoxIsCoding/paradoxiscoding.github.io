---
title: Welcome to the blog
date: 2026-10-14
tags: meta, notes
summary: A placeholder post showing how writing works on this site. Delete it when you publish your first real one.
---

This is a placeholder. To publish something, add a Markdown file to `src/posts/`, fill in the header, and deploy.

## How posts work

Every file in `src/posts/` becomes a post. The filename is the URL, so `my-first-post.md` lives at `#/blog/my-first-post`. The block between the `---` lines at the top holds the details:

```
---
title: My first post
date: 2026-10-20
tags: engineering, robotics
summary: One or two sentences shown on the index.
draft: true
---
```

Set `draft: true` and the post is visible while you run `npm run dev` but left out of the production build.

## What you can write

Ordinary Markdown works: **bold**, *emphasis*, [links](https://github.com/ParadoxIsCoding), lists, tables, images and code.

> Quotes get a purple rule down the side.

1. Numbered lists work.
2. So do nested sections, using `###` headings.

### Reading aids

Longer posts get a progress bar along the top and a table of contents beside the text that follows where you are. Hover a code block to copy it.

| Key | Action |
| --- | --- |
| `/` | Search the index |
| `j` / `k` | Move through posts, or scroll a post |
| `esc` | Go back one level |
