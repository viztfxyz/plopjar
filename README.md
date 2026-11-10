# Plopjar

Fling squishy blobs, merge matching numbers. A free, single-file browser merge puzzle that installs as a PWA and works offline.

## Run it

Static files, no build step. Serve the folder with any static host, for example:

```sh
python3 -m http.server 8000
```

The service worker (offline mode) only registers when the site is served over HTTPS.

## Pages and SEO

- `index.html` is the game. `how-to-play/`, `game-modes/` and `faq/` are static guide pages that share `site.css`. They exist so search engines and AI assistants have real text to index and quote.
- `faq/index.html` is generated. Edit the questions in `tools/faq.mjs`, then run `node tools/faq.mjs`. That keeps the visible answers and the FAQPage structured data in sync.
- Open Graph cards live in `og/`. Edit `tools/og/og.html`, then run `npx -y -p playwright node tools/og/render.mjs`. `og-image.png` is the homepage card.
- `llms.txt` is a plain-text summary for AI assistants. `robots.txt` allows every crawler. `vercel.json` sets trailing slashes and cache headers.
- The site address `https://plopjar.viztf.lol` is written into canonical links, Open Graph tags, JSON-LD, `robots.txt`, `sitemap.xml` and `llms.txt`.

## When you ship an update

- Bump `CACHE` in `sw.js` so installed copies refresh.
- Update `<lastmod>` in `sitemap.xml`, plus the "Updated" dates and `dateModified` on any guide page you changed.
- If you change rules, modes or levels in the game, update the guide pages and `llms.txt` to match.

## Privacy

No analytics, no ads, no accounts, no third-party requests. Fonts are self-hosted. Progress and settings live only in the browser's localStorage on the player's device.

## Credits

Fonts: [Bagel Fat One](https://fonts.google.com/specimen/Bagel+Fat+One) and [Figtree](https://fonts.google.com/specimen/Figtree), both under the SIL Open Font License (license texts in `fonts/`).
