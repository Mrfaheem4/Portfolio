import { useLayoutEffect, useRef } from "react";

// GSAP's power4.out, sampled for the browser's compositor easing function.
const menuEase = `linear(${Array.from({ length: 61 }, (_, index) =>
  (1 - (1 - index / 60) ** 5).toFixed(6),
).join(",")})`;

export default function useHeroReveal() {
  const sectionRef = useRef(null);
  const played = useRef(new Set());

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};

    const start = () => {
      stop();
      if (reducedMotion.matches || !Element.prototype.animate) {
        played.current.add("heading");
        played.current.add("portrait");
        return;
      }
      if (played.current.size === 2) return;
      let disposed = false;
      const frames = new Set();
      const timers = new Set();
      const animations = new Set();
      const layers = new Map();
      const easing = CSS.supports("animation-timing-function", menuEase)
        ? menuEase : "cubic-bezier(0.16, 1, 0.3, 1)";
      const createReveal = (element, keyframes, duration, delay = 0) => {
        layers.set(element, element.style.willChange);
        element.style.willChange = "transform, opacity";
        const animation = element.animate(keyframes, { duration, delay, easing, fill: "both" });
        animation.pause();
        animation.currentTime = 0;
        animations.add(animation);
        animation.onfinish = () => {
          animation.cancel();
          animations.delete(animation);
          element.style.willChange = layers.get(element);
        };
        return animation;
      };
      const readyWithin = (promise, timeout) => new Promise((resolve) => {
        const timer = window.setTimeout(resolve, timeout);
        timers.add(timer);
        Promise.resolve(promise).catch(() => {}).then(() => {
          window.clearTimeout(timer);
          timers.delete(timer);
          resolve();
        });
      });
      const heading = section.querySelector("#hero-title");
      const portrait = section.querySelector(".portrait-composition");
      const image = portrait.querySelector(".portrait-frame img");
      const lines = section.querySelectorAll(".hero-title-label");
      const fontReady = readyWithin(document.fonts?.load('800 1em "Manrope"'), 1000);
      const imageReady = readyWithin(image.decode?.(), 2000);
      const textReveal = played.current.has("heading") ? [] : [...lines].map((line, index) => createReveal(line, [
        { transform: "translate3d(0, 140%, 0) rotate(10deg)", transformOrigin: "50% 100%" },
        { transform: "translate3d(0, 0, 0) rotate(0deg)", transformOrigin: "50% 100%" },
      ], 1000, index * 100));
      const portraitReveal = played.current.has("portrait") ? [] : [createReveal(portrait, [
        { opacity: 0, transform: "translate3d(0, 24px, 0) scale(0.985)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      ], 1100, 150)];
      const reveals = new Map([[heading, textReveal], [portrait, portraitReveal]].filter(([, animations]) => animations.length));
      const scheduled = new Set();
      const play = (target) => {
        const key = target === heading ? "heading" : "portrait";
        if (played.current.has(key) || scheduled.has(target)) return;
        scheduled.add(target);
        const ready = target === heading ? fontReady : Promise.all([fontReady, imageReady]);
        ready.then(() => {
          if (disposed) return;
          // Give decoded assets and their compositing layers a paint before
          // starting the motion, instead of racing the initial render.
          const first = requestAnimationFrame(() => {
            frames.delete(first);
            const second = requestAnimationFrame(() => {
              frames.delete(second);
              if (!disposed && !played.current.has(key)) {
                played.current.add(key);
                reveals.get(target).forEach((animation) => animation.play());
              }
            });
            frames.add(second);
          });
          frames.add(first);
        });
      };
      const observer = window.IntersectionObserver && new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          play(entry.target);
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.12 });
      reveals.forEach((_, target) => observer ? observer.observe(target) : play(target));

      stop = () => {
        disposed = true;
        observer?.disconnect();
        frames.forEach(cancelAnimationFrame);
        timers.forEach(window.clearTimeout);
        animations.forEach((animation) => animation.cancel());
        layers.forEach((previous, element) => { element.style.willChange = previous; });
      };
    };

    start();
    reducedMotion.addEventListener("change", start);
    return () => {
      stop();
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  return sectionRef;
}
