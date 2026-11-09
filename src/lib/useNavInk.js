import { useEffect } from "react";

export default function useNavInk(surfaceRef) {
  useEffect(() => {
    const surface = surfaceRef.current;
    const header = surface.closest("header");
    const main = document.getElementById("main");
    const sections = [...main.querySelectorAll(":scope > section")];
    const ink = surface.querySelector(".nav-ink");
    const drops = [...ink.children];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let measureFrame = 0;
    let currentSection;
    let positions = [];
    let headerHeight = 0;
    let pageHeight = 0;
    let viewportHeight = 0;
    let animations = [];
    let pendingColor;
    let transitionId = 0;

    const setColor = (color, immediate = false) => {
      const id = ++transitionId;
      // Settle an interrupted wash before spreading the next section's ink.
      if (pendingColor) surface.style.setProperty("--nav-background", pendingColor);
      animations.forEach((animation) => animation.cancel());
      animations = [];
      ink.classList.remove("is-changing");
      pendingColor = color;
      if (immediate || reducedMotion.matches || !drops.every((drop) => drop.animate)) {
        surface.style.setProperty("--nav-background", color);
        pendingColor = undefined;
        return;
      }

      surface.style.setProperty("--nav-ink-color", color);
      ink.classList.add("is-changing");
      animations = drops.map((drop, index) => drop.animate([
        { transform: "scale(0.02, 0.15)", opacity: 0 },
        { offset: 0.25, opacity: 0.8 },
        { transform: "scale(1.85, 1.15)", opacity: 1 },
      ], {
        duration: 1200 + index * 120,
        delay: index * 90,
        easing: "cubic-bezier(0.35, 0, 0.2, 1)",
        fill: "both",
      }));
      Promise.all(animations.map((animation) => animation.finished)).then(() => {
        if (id !== transitionId) return;
        surface.style.setProperty("--nav-background", color);
        pendingColor = undefined;
        ink.classList.remove("is-changing");
        animations.forEach((animation) => animation.cancel());
        animations = [];
      }).catch(() => {});
    };

    const updateColor = () => {
      frame = 0;
      const boundary = window.scrollY + headerHeight + 1;
      const atBottom = window.scrollY > 0 &&
        window.scrollY + viewportHeight >= pageHeight - 2;
      const section = atBottom
        ? positions.at(-1)
        : positions.findLast((section) => section.top <= boundary) ?? positions[0];
      if (!section || section === currentSection) return;
      const initial = !currentSection;
      currentSection = section;
      setColor(section.color, initial);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateColor);
    };
    const measure = () => {
      measureFrame = 0;
      positions = sections.map((section) => ({
        top: section.getBoundingClientRect().top + window.scrollY,
        color: getComputedStyle(section).getPropertyValue("--section-color").trim(),
      }));
      // Native anchor jumps honor scroll padding, including with reduced motion.
      const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      headerHeight = Math.max(header.offsetHeight, scrollPadding);
      pageHeight = document.documentElement.scrollHeight;
      viewportHeight = window.innerHeight;
      const previous = currentSection?.color;
      currentSection = positions.find((section) => section.color === previous);
      updateColor();
    };
    const requestMeasure = () => {
      if (!measureFrame) measureFrame = window.requestAnimationFrame(measure);
    };
    const updateMotion = () => {
      if (reducedMotion.matches && currentSection) setColor(currentSection.color, true);
    };
    const observer = new ResizeObserver(requestMeasure);
    observer.observe(main);
    observer.observe(header);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestMeasure);
    window.addEventListener("pageshow", requestMeasure);
    reducedMotion.addEventListener("change", updateMotion);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestMeasure);
      window.removeEventListener("pageshow", requestMeasure);
      reducedMotion.removeEventListener("change", updateMotion);
      transitionId++;
      animations.forEach((animation) => animation.cancel());
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(measureFrame);
    };
  }, [surfaceRef]);
}
