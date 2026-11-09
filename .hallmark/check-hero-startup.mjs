import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const puppeteer = require('./tools/node_modules/puppeteer-core');
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, pipe: true });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.setCacheEnabled(false);
  await page.emulateCPUThrottling(4);
  const client = await page.createCDPSession();
  await client.send('Profiler.enable');
  await client.send('Profiler.start');
  await page.evaluateOnNewDocument(() => {
    window.startupMetrics = { geometryCalls: 0, geometryMs: 0, lengthMs: 0, longTasks: [], frameGaps: [] };
    const originalLength = SVGGeometryElement.prototype.getTotalLength;
    SVGGeometryElement.prototype.getTotalLength = function (...args) {
      const start = performance.now();
      const result = originalLength.apply(this, args);
      window.startupMetrics.lengthMs += performance.now() - start;
      return result;
    };
    const original = SVGGeometryElement.prototype.getPointAtLength;
    SVGGeometryElement.prototype.getPointAtLength = function (...args) {
      const start = performance.now();
      const result = original.apply(this, args);
      window.startupMetrics.geometryCalls++;
      window.startupMetrics.geometryMs += performance.now() - start;
      return result;
    };
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) window.startupMetrics.longTasks.push({ start: Math.round(entry.startTime), duration: Math.round(entry.duration) });
    }).observe({ type: 'longtask', buffered: true });
    let previous;
    const tick = now => {
      if (previous && now - previous > 35) window.startupMetrics.frameGaps.push(Math.round(now - previous));
      previous = now;
      if (now < 4500) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise(resolve => setTimeout(resolve, 4500));
  const { profile } = await client.send('Profiler.stop');
  console.log('CPU hotspots', JSON.stringify(profile.nodes.filter(node => node.hitCount).sort((a, b) => b.hitCount - a.hitCount).slice(0, 15).map(node => ({ name: node.callFrame.functionName, file: node.callFrame.url.split('/').at(-1), hits: node.hitCount })), null, 2));
  console.log(JSON.stringify(await page.evaluate(() => ({ ...window.startupMetrics, fontStatus: document.fonts.status, portraitLoaded: document.querySelector('.portrait-frame img').complete, headingTransform: getComputedStyle(document.querySelector('.hero-title-label')).transform, portraitOpacity: getComputedStyle(document.querySelector('.portrait-composition')).opacity })), null, 2));
  if (errors.length) throw new Error(errors.join('\n'));
} finally {
  await browser.close();
}
