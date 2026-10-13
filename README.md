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
browser refreshes. Stop the server with Ctrl+C.

Don't use VS Code's Live Server for this site: it doesn't run Jekyll, so you'll see
template code like `{% for post in site.posts %}` instead of the post list.
