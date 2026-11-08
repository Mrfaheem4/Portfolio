import assert from "node:assert/strict";
import { test } from "node:test";
import { publishScrollFrame, smoothRibbonLength, subscribeScrollFrame } from "./scrollFrame.js";

test("ribbon smoothing has the same response at 60 Hz and 120 Hz", () => {
  const advance = (hz) => {
    let value = 0;
    for (let frame = 0; frame < hz / 2; frame++) value = smoothRibbonLength(value, 1000, 1000 / hz);
    return value;
  };
  assert.ok(Math.abs(advance(60) - advance(120)) < 1e-8);
});

test("direction changes stay bounded without overshooting", () => {
  let value = 500;
  for (let frame = 0; frame < 20; frame++) {
    const next = smoothRibbonLength(value, 1000, 16);
    assert.ok(next >= value && next <= 1000);
    value = next;
  }
  for (let frame = 0; frame < 20; frame++) {
    const next = smoothRibbonLength(value, 0, 16);
    assert.ok(next <= value && next >= 0);
    value = next;
  }
});

test("clock pauses cannot produce a jump or negative progress", () => {
  assert.equal(smoothRibbonLength(100, 1000, -1), 100);
  assert.equal(smoothRibbonLength(100, 1000, 5000), smoothRibbonLength(100, 1000, 64));
  assert.equal(smoothRibbonLength(999.99, 1000, 16), 1000);
  assert.equal(smoothRibbonLength(1000, 1000, 16), 1000);
});

test("subscribers receive the same fractional position and timestamp", () => {
  const first = [];
  const second = [];
  const stopFirst = subscribeScrollFrame((scroll, time) => first.push([scroll, time]));
  const stopSecond = subscribeScrollFrame((scroll, time) => second.push([scroll, time]));
  try {
    publishScrollFrame(123.456, 100);
    assert.deepEqual(first, [[123.456, 100]]);
    assert.deepEqual(second, first);
    stopFirst();
    publishScrollFrame(150.25, 116);
    assert.equal(first.length, 1);
    assert.deepEqual(second.at(-1), [150.25, 116]);
  } finally {
    stopFirst();
    stopSecond();
  }
});
