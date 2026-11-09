import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function useHeroReveal() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      let disposed = false;
      const frames = new Set();
      const timers = new Set();
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
      const textReveal = gsap.fromTo(lines,
        { yPercent: 140, rotate: 10, transformOrigin: "50% 100%", willChange: "transform", force3D: true },
        {
          yPercent: 0, rotate: 0, duration: 1, ease: "power4.out",
          stagger: { each: 0.1, from: "start" }, paused: true,
          onComplete: () => gsap.set(lines, { clearProps: "transform,transformOrigin,willChange" }),
        },
      );
      const portraitReveal = gsap.fromTo(portrait,
        { opacity: 0, y: 24, scale: 0.985, willChange: "transform,opacity", force3D: true },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.1,
          ease: "power4.out", delay: 0.15, paused: true,
          onComplete: () => gsap.set(portrait, { clearProps: "opacity,transform,willChange" }),
        },
      );
      const reveals = new Map([[heading, textReveal], [portrait, portraitReveal]]);
      const play = (target) => {
        const ready = target === heading ? fontReady : Promise.all([fontReady, imageReady]);
        ready.then(() => {
          if (disposed) return;
          // Give decoded assets and their compositing layers a paint before
          // starting the motion, instead of racing the initial render.
          const first = requestAnimationFrame(() => {
            frames.delete(first);
            const second = requestAnimationFrame(() => {
              frames.delete(second);
              if (!disposed) reveals.get(target).play();
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

      return () => {
        disposed = true;
        observer?.disconnect();
        frames.forEach(cancelAnimationFrame);
        timers.forEach(window.clearTimeout);
      };
    }, section);

    return () => media.revert();
  }, []);

  return sectionRef;
}
