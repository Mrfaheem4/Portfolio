import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const puppeteer = createRequire(new URL('./tools/package.json', import.meta.url))('puppeteer-core');
console.log('Launching Chrome');
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, pipe: true });
const errors = [];
try {
  const page = await browser.newPage();
  console.log('Loading portfolio');
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const color = () => page.$eval('.nav-surface', el => getComputedStyle(el).backgroundColor);
  assert.equal(await color(), 'rgb(16, 31, 41)');
  console.log('Initial color verified');
  const scrollTo = async id => {
    await page.evaluate(id => {
      const section = document.getElementById(id);
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
    }, id);
  };
  await scrollTo('experience');
  await page.waitForSelector('.nav-ink.is-changing');
  await page.waitForFunction(() => !document.querySelector('.nav-ink').classList.contains('is-changing'));
  assert.equal(await color(), 'rgb(16, 60, 58)');
  console.log('Ink animation verified');
  await scrollTo('work');
  await page.waitForSelector('.nav-ink.is-changing');
  await scrollTo('about');
  await scrollTo('skills');
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.nav-surface')).backgroundColor === 'rgb(27, 51, 70)');
  await page.click('.sm-toggle');
  await page.waitForSelector('.portfolio-menu[data-open]');
  await page.waitForFunction(() => document.querySelector('main').inert);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('.portfolio-menu').hasAttribute('data-open'));
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains('sm-toggle')), true);
  console.log('Rapid scrolling and desktop menu verified');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 375, height: 812 });
  await scrollTo('contact');
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.nav-surface')).backgroundColor === 'rgb(114, 47, 50)');
  assert.equal(await page.$eval('.nav-ink', el => el.classList.contains('is-changing')), false);
  await page.click('.sm-toggle');
  await page.waitForSelector('.portfolio-menu[data-open]');
  await page.click('.sm-panel-item[href="#experience"]');
  await page.waitForFunction(() => location.hash === '#experience' && !document.querySelector('.portfolio-menu').hasAttribute('data-open'));
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.nav-surface')).backgroundColor === 'rgb(16, 60, 58)');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  assert.deepEqual(errors, []);
  console.log('Passed: section ink wash, rapid scrolling, desktop menu and Escape focus, mobile menu anchors, reduced motion, no overflow or runtime errors.');
} finally {
  await browser.close();
}
