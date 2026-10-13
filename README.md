# Master Thesis Reading Log

Live at https://shmoshua.github.io

## Adding a post

1. Copy `_drafts/paper-template.html` into `_posts/` and rename it
   `YYYY-MM-DD-short-name.html` (e.g. `_posts/2026-10-13-fitzpatrick-functions.html`).
2. Edit the header between the `---` lines: `title`, `authors`, `topic`, and optionally `paper` (a link).
3. Write your notes below it, then commit and push.

GitHub Pages rebuilds the site within a minute or two. The homepage list (newest first),
the post header and the contents sidebar are generated automatically, so `index.html`
never needs editing.

## Previewing locally

The homepage is built by GitHub, so opening `index.html` directly shows template code
instead of the list. To preview before pushing, install Jekyll and run
`jekyll serve` in this folder, then open http://localhost:4000.
