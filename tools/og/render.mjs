// Renders the Open Graph cards in og.html to /og/<card>.png (1200x630).
// usage, from the repo root:  npx -y -p playwright node tools/og/render.mjs
// (run `npx playwright install chromium` once if Playwright has no browser yet; set CHROME=/path/to/chrome to use another one)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = fileURLToPath(new URL('../../og/', import.meta.url));
mkdirSync(out, { recursive: true });

const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const card of ['how-to-play', 'game-modes', 'faq']) {
  await page.goto(pathToFileURL(here + 'og.html').href + '?card=' + card);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: out + card + '.png' });
  console.log('og/' + card + '.png');
}
await browser.close();
