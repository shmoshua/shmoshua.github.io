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

## Sections

The site has three sections, shown as tabs at the top of every page. Their names and
order live in `_data/sections.yml` (rename "Attempts" to "Ansätze" there, for example).

| Tab          | Folder        | Address                 | What goes in it                         |
|--------------|---------------|-------------------------|-----------------------------------------|
| Reading List | `_posts/`     | `/` (the homepage)      | One post per paper (see above)          |
| Attempts     | `_attempts/`  | `/attempts/<file-name>/` | One page per idea, with a dated log    |
| Notes        | `_notes/`     | `/notes/<file-name>/`   | Concepts, models and summaries          |

## Attempts

One page per idea, e.g. `_attempts/wpi-sbm.html` → `/attempts/wpi-sbm/`. Start one by
copying `_drafts/attempt-template.html` into `_attempts/`. The header has a `title`, a
one-line `summary` and a `status` (`open`, `stuck`, `works` or `dropped`).

Each time you work on the idea, add an entry at the bottom of the page:

```html
<h2 class="entry" data-date="2026-10-29">Trying the dual instead</h2>
```

The date (written `YYYY-MM-DD`) is shown above the heading and in the contents sidebar.
The Attempts page sorts ideas by their latest entry and counts the entries, so there are
no dates to keep up to date by hand.

## Notes

`_notes/` has one page per concept or model (e.g. `_notes/sbm.html` → `/notes/sbm/`).
Each holds the setup and the results you keep needing, as boxes with an `id`:

```html
<div class="box theorem" id="kesten-stigum">
  <div class="box-title">Kesten–Stigum threshold</div>
  <p class="statement">…</p>
  <p class="source">Who proved it.</p>
</div>
```

Link to them from any post or attempt: `<a href="/notes/sbm/">SBM</a>`, or to one result:
`<a href="/notes/sbm/#kesten-stigum">Kesten–Stigum</a>`. Each note lists the posts and
attempts that link to it automatically. Add an optional `summary:` line to a note's
header to show a one-line description on the Notes page. To add a note, copy
`_notes/sbm.html` to a new file name.

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
