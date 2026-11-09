import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const puppeteer = require('./tools/node_modules/puppeteer-core');
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, pipe: true });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 768, 375, 320]) {
    await page.setViewport({ width, height: width <= 375 ? 380 : 900 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.hero-title-label');
    await page.waitForFunction(() => [...document.querySelectorAll('.hero-title-label')].every(el => getComputedStyle(el).transform === 'none'), { timeout: 12000 });
    if (width <= 375) {
      assert.equal(await page.$eval('.portrait-composition', el => getComputedStyle(el).opacity), '0', 'Offscreen portrait should wait');
      await page.$eval('.portrait-composition', el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    }
    await page.waitForFunction(() => { const el = document.querySelector('.portrait-composition'); return getComputedStyle(el).opacity === '1' && getComputedStyle(el).transform === 'none'; }, { timeout: 12000 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await page.$eval('.hero-title-label', el => el.style.willChange), '');
    const geometry = await page.evaluate(async () => {
      const { createRibbonGeometry } = await import('/src/lib/ribbonPath.js');
      const main = document.querySelector('main');
      const sections = [...main.querySelectorAll(':scope > section')].map(el => ({ id: el.id, top: el.offsetTop, height: el.offsetHeight }));
      const geometry = createRibbonGeometry(main.clientWidth, main.offsetHeight, sections);
      const path = document.querySelector('.scroll-ribbon path');
      const length = path.getTotalLength();
      let maxError = 0;
      for (let index = 0; index < geometry.samples.length; index += 30) {
        const sample = geometry.samples[index];
        const native = path.getPointAtLength(sample.distance * length / geometry.length);
        maxError = Math.max(maxError, Math.abs(native.y - sample.y));
      }
      return { maxError, lengthError: Math.abs(length - geometry.length) };
    });
    assert(geometry.maxError < 2, `Ribbon approximation error ${geometry.maxError}`);
    await page.click('.sm-toggle');
    await page.waitForFunction(() => { const el = document.querySelector('.staggered-menu-panel'); return document.querySelector('.portfolio-menu').hasAttribute('data-open') && Math.abs(new DOMMatrix(getComputedStyle(el).transform).m41) < 1; });
    await page.waitForFunction(() => [...document.querySelectorAll('.sm-panel-itemLabel')].every(el => Math.abs(new DOMMatrix(getComputedStyle(el).transform).m42) < 1));
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('.portfolio-menu').hasAttribute('data-open'));
    assert.equal(await page.evaluate(() => document.activeElement.classList.contains('sm-toggle')), true);
    console.log(width, 'hero, portrait, menu, overflow, geometry:', JSON.stringify(geometry));
  }
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.hero-title-label');
  assert.equal(await page.$eval('.hero-title-label', el => getComputedStyle(el).transform), 'none');
  assert.equal(await page.$eval('.portrait-composition', el => getComputedStyle(el).opacity), '1');
  assert.deepEqual(errors, []);
  console.log('Passed: hero and portrait reveals, deferred mobile portrait, menu opening and Escape, ribbon accuracy, reduced motion, no runtime errors.');
} finally { await browser.close(); }
