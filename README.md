# Master Thesis Reading Log

Live at https://shmoshua.github.io

## Adding a post

1. Copy `_drafts/paper-template.html` into `_posts/` and rename it
   `YYYY-MM-DD-short-name.html` (e.g. `_posts/2026-10-13-fitzpatrick-functions.html`).
2. Edit the header between the `---` lines: `title`, `list`, `authors`, `topic`, and optionally `paper` (a link).
   `list` picks the homepage list (`thesis` or `ai-safety`). The lists themselves are
   defined in `_data/lists.yml`; add an entry there to create a new one.
3. Write your notes below it, then commit and push.

GitHub Pages rebuilds the site within a minute or two. The homepage list (newest first),
the post header and the contents sidebar are generated automatically, so `index.html`
never needs editing.

## Model pages

`_models/` has one page per model (e.g. `_models/sbm.html` → `/models/sbm/`). Each holds
the setup and the results you keep needing, as boxes with an `id`:

```html
<div class="box theorem" id="kesten-stigum">
  <div class="box-title">Kesten–Stigum threshold</div>
  <p class="statement">…</p>
  <p class="source">Who proved it.</p>
</div>
```

Link to them from any post: `<a href="/models/sbm/">SBM</a>`, or to one result:
`<a href="/models/sbm/#kesten-stigum">Kesten–Stigum</a>`. Each model page lists the notes
that link to it automatically, and `/models/` lists all models. To add a model, copy
`_models/sbm.html` to a new file name.

## Previewing locally (no commit needed)

One-time setup on an Apple Silicon Mac (Homebrew in `/opt/homebrew`). If your shell is
zsh, use `~/.zshrc` instead of `~/.bash_profile`.

```bash
/opt/homebrew/bin/brew install ruby@3.4
echo 'export PATH="/opt/homebrew/opt/ruby@3.4/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
ruby -v                 # should print 3.4
bundle install          # run inside this folder
```

Then, whenever you want to work on the site:

```bash
bundle exec jekyll serve --livereload
```

Open http://localhost:4000. Every time you save a file the site rebuilds and the
browser refreshes, scrolled to the part of the post you just changed. Stop the server
with Ctrl+C.

Tip: turn on File → Auto Save in VS Code so the preview follows along as you type.

Don't use VS Code's Live Server for this site: it doesn't run Jekyll, so you'll see
template code like `{% for post in site.posts %}` instead of the post list.
