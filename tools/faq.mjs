// Builds faq/index.html from the questions below, so the visible answers and the FAQPage JSON-LD never drift apart.
// usage: node tools/faq.mjs   (run from the repo root; no dependencies)
import { writeFileSync } from 'node:fs';

const SITE = 'https://plopjar.viztf.lol';
const UPDATED = '2026-11-10', UPDATED_TEXT = '10 November 2026';

const GROUPS = [
  ['About Plopjar', [
    ['What is Plopjar?',
      `<p>Plopjar is a free physics merge puzzle game that runs in your web browser. You fling soft, numbered blobs into a glass jar, and two blobs with the same number merge into one worth double. The aim is to build the biggest blob and the highest score without letting the jar overflow.</p>`],
    ['Is Plopjar free to play?',
      `<p>Yes. Plopjar is completely free. There are no ads, no in-app purchases, no premium version and no account to create. Every mode, level and theme is available to everyone.</p>`],
    ['Who made Plopjar?',
      `<p>Plopjar was designed and built by <a href="https://viztf.lol">Viz</a>, a freelance web designer and developer. It is a single-page web game with self-hosted fonts and no third-party code.</p>`],
    ['Is Plopjar like 2048?',
      `<p>It shares the core idea of 2048: matching numbers merge and double. The difference is physics. Instead of sliding tiles on a grid, you throw squishy blobs into a jar where they roll, bounce and stack. Plopjar also adds combos, power-ups, rainbow wildcards, six modes, a daily jar and 24 puzzle levels.</p>`],
    ['Is Plopjar safe for kids?',
      `<p>Plopjar has no ads, no chat, no accounts, no links to other players and no data collection. It makes no requests to outside servers while you play. The only thing it stores is your progress, kept in your own browser.</p>`],
  ]],
  ['Playing the game', [
    ['How do you play Plopjar?',
      `<p>Grab a blob from the shelf above the jar, slide it to aim, and let go to drop it softly. Pull down before releasing to throw it hard. Matching numbers merge and double, and quick merges in a row build a combo. Don’t let blobs sit above the dashed line. The full guide is on the <a href="/how-to-play/">How to play</a> page.</p>`],
    ['How does a game of Plopjar end?',
      `<p>A game ends when blobs stay above the dashed line near the top of the jar for 3 seconds. A merge, a Shake or a Pop can save you inside that window. Zen mode has no game over, and Sprint ends when you make a 1,024 blob.</p>`],
    ['What is the biggest blob in Plopjar?',
      `<p>The biggest blob is 8,192, a character called The Blob. Before it come Moonjelly (4,096), Duchess (2,048) and Sir Squish (1,024). In Threes mode, where blobs count in powers of three, the top blob is 6,561.</p>`],
    ['How do combos work?',
      `<p>Merges that happen less than about 1.25 seconds apart chain into a combo. Each merge in the chain multiplies its points by the combo count, up to ×5. Longer combos also charge your power-ups faster.</p>`],
    ['What are rainbow blobs?',
      `<p>Rainbow blobs are rare wildcards. A rainbow blob merges with the first blob it touches, whatever its number, and doubles it. They start appearing once you have made a 16 blob.</p>`],
    ['What do the Shake and Pop power-ups do?',
      `<p>Shake jiggles the whole jar to loosen blobs that are stuck. Pop removes one blob you tap. Both are charged by merging, and you can store up to three charges at once.</p>`],
    ['How many levels does Plopjar have?',
      `<p>The Jar trail has 24 puzzle levels. Each has a goal, such as making a 128 blob or hitting a ×5 combo, and a limited number of throws. Finish in fewer throws for up to three stars. See every level on the <a href="/game-modes/#jar-trail">Game modes</a> page.</p>`],
    ['What game modes are there?',
      `<p>There are six modes: Classic, Slim (a narrow jar), Threes (powers of three), Sprint (race to 1,024), Zen (no game over) and Chaos (a rule changes every 25 seconds). There is also a Daily jar that is the same for everyone, and the 24-level Jar trail.</p>`],
    ['Can I watch a replay of my game?',
      `<p>Yes. When a game ends, tap Replay to watch it back at 1×, 2×, 4× or 8× speed. You can also tap Share to send your score and biggest blob to a friend.</p>`],
  ]],
  ['Devices, saving and privacy', [
    ['Can I play Plopjar offline?',
      `<p>Yes. After you open Plopjar once, it saves itself in your browser and works without an internet connection, including on planes and the subway. Installing it to your home screen makes it open like an app.</p>`],
    ['How do I install Plopjar on my phone?',
      `<p>On iPhone or iPad, open Plopjar in Safari, tap the Share button and choose Add to Home Screen. On Android, open it in Chrome, tap the menu and choose Install app or Add to Home screen. On a computer, use the install icon in Chrome or Edge’s address bar. Where your browser supports it, Settings in Plopjar also shows an Install Plopjar button.</p>`],
    ['What devices does Plopjar work on?',
      `<p>Plopjar runs in any modern browser on phones, tablets, laptops and desktops, including iPhone, iPad, Android, Chromebook, Windows, Mac and Linux. It works with touch, a mouse or a keyboard. Nothing needs to be downloaded from an app store.</p>`],
    ['Can I play Plopjar with a keyboard?',
      `<p>Yes. The arrow keys move the blob along the top of the jar, Space drops it, the number keys 1 to 4 (or Q and E) pick a blob from the shelf, and Esc pauses the game or closes a panel. Shift with an arrow key makes fine adjustments.</p>`],
    ['Where is my progress saved?',
      `<p>Your scores, achievements, themes and settings are saved in your browser’s local storage on your device. An unfinished game is saved too, so you can pick it up later. Progress does not sync between devices, and clearing your browser data erases it.</p>`],
    ['Does Plopjar collect any data?',
      `<p>No. Plopjar has no analytics, no ads, no cookies and no accounts, and it makes no third-party requests. Nothing about you or your games leaves your device.</p>`],
    ['Can I turn off the sound and music?',
      `<p>Yes. The Settings screen has separate switches for sound effects, music, vibration, screen shake and the aim guide. There is also a Reduce motion option, which turns on by itself if your device asks for reduced motion.</p>`],
  ]],
];

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = q => q.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const all = GROUPS.flatMap(g => g[1]);

const ld = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'FAQPage', '@id': `${SITE}/faq/#faq`, url: `${SITE}/faq/`, name: 'Plopjar FAQ', inLanguage: 'en',
      datePublished: UPDATED, dateModified: UPDATED, author: { '@id': 'https://viztf.lol/#person' },
      about: { '@id': `${SITE}/#game` }, isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: all.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<\/?p>/g, '').replace(/href="\//g, `href="${SITE}/`) } })) },
    { '@type': 'Person', '@id': 'https://viztf.lol/#person', name: 'Viz', url: 'https://viztf.lol' },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Plopjar', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE}/faq/` }] },
  ],
};

const body = GROUPS.map(([title, qs]) => `
  <section class="faq-group" aria-labelledby="${slug(title)}">
    <h2 id="${slug(title)}">${esc(title)}</h2>
${qs.map(([q, a], i) => `    <details id="${slug(q)}"${title === GROUPS[0][0] && i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><div>${a}</div></details>`).join('\n')}
  </section>`).join('\n');

const TITLE = 'Plopjar FAQ: Free, Offline, No Ads, Devices and Saving';
const DESC = 'Answers about Plopjar, the free number merge game: is it free, does it work offline, how to install it, where progress is saved, the biggest blob and more.';
const OG = `${SITE}/og/faq.png`, OGALT = 'Plopjar FAQ: free, offline, no ads, works on any device';

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#170F26">
<link rel="canonical" href="${SITE}/faq/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Plopjar">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="Plopjar FAQ">
<meta property="og:description" content="Free, offline, no ads, works on any device. Quick answers about Plopjar.">
<meta property="og:url" content="${SITE}/faq/">
<meta property="og:image" content="${OG}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${OGALT}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Plopjar FAQ">
<meta name="twitter:description" content="Free, offline, no ads, works on any device. Quick answers about Plopjar.">
<meta name="twitter:image" content="${OG}">
<meta name="twitter:image:alt" content="${OGALT}">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icon-180.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/fonts/bagel-fat-one-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/site.css">
<script type="application/ld+json">
${JSON.stringify(ld)}
</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <a class="brand" href="/" aria-label="Plopjar home"><span style="--c:#FF8FA8">p</span><span style="--c:#FFC83D">l</span><span style="--c:#7BE38A">o</span><span style="--c:#63C7FF">p</span><span style="--c:#A98BFF">j</span><span style="--c:#FF9A5C">a</span><span style="--c:#FF5D73">r</span></a>
  <nav aria-label="Main">
    <a href="/how-to-play/">How to play</a>
    <a href="/game-modes/">Game modes</a>
    <a href="/faq/" aria-current="page">FAQ</a>
    <a class="gum sm" href="/">Play free</a>
  </nav>
</header>

<main id="main">
  <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Plopjar</a></li><li aria-current="page">FAQ</li></ol></nav>
  <h1>Plopjar FAQ</h1>
  <p class="lede">Plopjar is a free number merge game you play in your browser. It has no ads and no sign-up, works offline, and runs on phones, tablets and computers. Here are answers to the questions players ask most.</p>
  <p class="meta">By <a href="https://viztf.lol">Viz</a>, the game’s maker · Updated <time datetime="${UPDATED}">${UPDATED_TEXT}</time> · ${all.length} questions</p>
${body}

  <section class="band">
    <div><h2>Still curious? Just play.</h2><p>It takes about a minute to learn.</p></div>
    <a class="gum" href="/">Play Plopjar</a>
  </section>

  <h2>Keep reading</h2>
  <ul class="next">
    <li><a href="/how-to-play/">How to play<small>Controls, combos, power-ups and 10 tips</small></a></li>
    <li><a href="/game-modes/">Game modes<small>Classic, Slim, Threes, Sprint, Zen, Chaos and 24 puzzle jars</small></a></li>
  </ul>
</main>

<footer>
  <nav aria-label="Footer"><a href="/">Play Plopjar</a><a href="/how-to-play/">How to play</a><a href="/game-modes/">Game modes</a><a href="/faq/">FAQ</a></nav>
  <p>Plopjar is a free browser game made by <a href="https://viztf.lol">Viz</a>. No ads, no accounts, no tracking.</p>
</footer>
</body>
</html>
`;
writeFileSync(new URL('../faq/index.html', import.meta.url), html);
console.log(`faq/index.html: ${all.length} questions`);
