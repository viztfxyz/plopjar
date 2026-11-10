# Plopjar

Fling squishy blobs, merge matching numbers. A free, single-file browser merge puzzle that installs as a PWA and works offline.

## Run it

Static files, no build step. Serve the folder with any static host, for example:

```sh
python3 -m http.server 8000
```

The service worker (offline mode) only registers when the site is served over HTTPS.

## Before deploying

The canonical link, Open Graph tags, JSON-LD, `robots.txt` and `sitemap.xml` need the site's absolute address. They hold the placeholder `SITE_URL` until you set it once:

```sh
./set-domain.sh https://your.domain
```

When you ship an update, bump `CACHE` in `sw.js` so installed copies refresh, and update `<lastmod>` in `sitemap.xml`.

## Privacy

No analytics, no ads, no accounts, no third-party requests. Fonts are self-hosted. Progress and settings live only in the browser's localStorage on the player's device.

## Credits

Fonts: [Bagel Fat One](https://fonts.google.com/specimen/Bagel+Fat+One) and [Figtree](https://fonts.google.com/specimen/Figtree), both under the SIL Open Font License (license texts in `fonts/`).
