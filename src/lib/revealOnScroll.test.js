import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { revealOnScroll } from "./revealOnScroll.js";

const originalWindow = globalThis.window;
afterEach(() => {
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
});

function browser({ reduced = false, supported = true } = {}) {
  const observers = [];
  const listeners = new Map();
  const motion = {
    matches: reduced,
    addEventListener: (_, callback) => listeners.set("motion", callback),
    removeEventListener: () => listeners.delete("motion"),
  };
  class Observer {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.targets = new Set();
      observers.push(this);
    }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.targets.clear(); }
    intersect(target, ratio) {
      this.callback([{ target, isIntersecting: ratio > 0, intersectionRatio: ratio }]);
    }
  }
  globalThis.window = {
    innerHeight: 800,
    matchMedia: () => motion,
    IntersectionObserver: supported ? Observer : undefined,
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: (event) => listeners.delete(event),
  };
  return { observers, listeners, motion };
}

function text() {
  const animations = [];
  const element = {
    animate(frames, options) {
      const animation = {
        frames, options, plays: 0, paused: false, cancelled: false,
        pause() { this.paused = true; },
        play() { this.plays++; },
        cancel() { this.cancelled = true; },
      };
      animations.push(animation);
      return animation;
    },
  };
  return { element, animations };
}

const frames = [{ opacity: 0 }, { opacity: 1 }];

test("partial initial intersections do not consume the reveal", () => {
  const { observers } = browser();
  const { element, animations } = text();
  const cleanup = revealOnScroll([{ element, frames }]);
  const animation = animations[0];
  assert.equal(animation.paused, true);
  assert.equal(animation.currentTime, 0);
  assert.equal(animation.options.fill, "both");
  observers[0].intersect(element, 0.01);
  assert.equal(animation.plays, 0);
  assert.equal(observers[0].targets.has(element), true);
  observers[0].intersect(element, 0.5);
  observers[0].intersect(element, 1);
  assert.equal(animation.plays, 1);
  animation.onfinish();
  assert.equal(animation.cancelled, true);
  cleanup();
});

test("contact lines reveal independently of the surrounding section", () => {
  const { observers } = browser();
  const first = text();
  const second = text();
  const underline = text();
  const firstLine = {};
  const secondLine = {};
  const cleanup = revealOnScroll([
    { element: first.element, target: firstLine, frames },
    { element: second.element, target: secondLine, frames },
    { element: underline.element, target: secondLine, frames, delay: 250 },
  ]);
  observers[0].intersect(firstLine, 0.5);
  assert.equal(first.animations[0].plays, 1);
  assert.equal(second.animations[0].plays, 0);
  assert.equal(underline.animations[0].plays, 0);
  observers[0].intersect(secondLine, 0.5);
  assert.equal(second.animations[0].plays, 1);
  assert.equal(underline.animations[0].plays, 1);
  cleanup();
});

test("resize updates the viewport inset without replaying completed targets", () => {
  const { observers, listeners } = browser();
  const first = text();
  const second = text();
  const cleanup = revealOnScroll([{ element: first.element, frames }, { element: second.element, frames }]);
  observers[0].intersect(first.element, 0.6);
  globalThis.window.innerHeight = 400;
  listeners.get("resize")();
  assert.equal(observers[1].options.rootMargin, "0px 0px -48px 0px");
  assert.equal(observers[1].targets.has(first.element), false);
  assert.equal(observers[1].targets.has(second.element), true);
  cleanup();
});

test("enabling reduced motion releases both waiting and running text", () => {
  const { observers, listeners, motion } = browser();
  const first = text();
  const second = text();
  const cleanup = revealOnScroll([{ element: first.element, frames }, { element: second.element, frames }]);
  observers[0].intersect(first.element, 0.8);
  motion.matches = true;
  listeners.get("motion")();
  assert.equal(first.animations[0].cancelled, true);
  assert.equal(second.animations[0].cancelled, true);
  assert.equal(observers[0].targets.size, 0);
  listeners.get("resize")();
  assert.equal(observers.length, 1);
  cleanup();
  assert.equal(listeners.size, 0);
});

test("reduced motion and unsupported observers leave text readable", () => {
  for (const options of [{ reduced: true }, { supported: false }]) {
    const { observers } = browser(options);
    const { element, animations } = text();
    revealOnScroll([{ element, frames }])();
    assert.equal(animations.length, 0);
    assert.equal(observers.length, 0);
  }
});
