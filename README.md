# start-tab

A lightweight, self-contained new-tab / start page: clock, a search bar (Google / DuckDuckGo / Bing), and an editable list of quick links saved in your browser's `localStorage`.

It's plain HTML, CSS, and JS — no build step, no dependencies — which is what makes it work well both as a GitHub Pages site and as a file served through jsDelivr.

## Files

```
index.html
style.css
script.js
```

## 1. Put it on GitHub

```bash
mkdir start-tab && cd start-tab
git init
# copy index.html, style.css, script.js into this folder
git add .
git commit -m "start tab page"
git branch -M main
git remote add origin https://github.com/<your-username>/start-tab.git
git push -u origin main
```

The repo must be **public** — jsDelivr can only serve files from public GitHub repos.

## 2. Serve it from jsDelivr

jsDelivr auto-mirrors any public GitHub repo with no setup on your end — you don't upload anything to jsDelivr separately, you just point a URL at your repo. The pattern is:

```
https://cdn.jsdelivr.net/gh/<user>/<repo>@<version>/<file>
```

For this repo, once it's pushed:

```
https://cdn.jsdelivr.net/gh/<your-username>/start-tab@main/index.html
https://cdn.jsdelivr.net/gh/<your-username>/start-tab@main/style.css
https://cdn.jsdelivr.net/gh/<your-username>/start-tab@main/script.js
```

Notes:
- `@main` tracks the branch live but is **cached up to 7 days** by jsDelivr/its CDN. For anything you want to update instantly, use a commit hash instead of `@main`, e.g. `@a1b2c3d`.
- If you tag releases (`git tag v1.0.0 && git push --tags`), you can pin to `@v1.0.0` instead, which is the recommended stable pattern jsDelivr documents.
- `index.html` references `style.css` and `script.js` with **relative paths**, so as long as all three are fetched from the same jsDelivr folder, it resolves correctly — you don't need to rewrite the paths to full jsDelivr URLs inside the HTML.

## 3. Use it as your browser's new-tab page

Most browsers won't load a remote URL as the literal "new tab" page without an extension, but two common approaches:

- **Homepage / startup page**: paste the jsDelivr `index.html` URL (or your GitHub Pages URL, see below) into your browser's settings as the homepage/startup URL.
- **New-tab override extension**: use a "custom new tab URL" extension (available for Chrome and Firefox) and point it at the jsDelivr URL.

## Alternative: GitHub Pages

If you'd rather not depend on jsDelivr's cache window, GitHub Pages serves the same files directly with no CDN delay:

1. Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
2. Your page is live at `https://<your-username>.github.io/start-tab/`.

Both are free, static, and require no server.
