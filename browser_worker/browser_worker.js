const { chromium } = require('playwright');

/**
 * Demonstrates a simple browser worker that visits a page and prints the title.
 */
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const title = await page.title();
  console.log('Visited page title:', title);
  await browser.close();
}

run().catch(err => {
  console.error(err);
});
