import { useEffect, useRef, useState } from "react";

const links = [["Work", "work"], ["Experience", "experience"], ["About", "about"], ["Stack", "skills"], ["Contact", "contact"]];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const main = document.getElementById("main");
    const sections = [...main.querySelectorAll(":scope > section")];
    const ink = header.querySelector(".nav-ink");
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
      // Rapid scrolling settles the previous wash before starting the next.
      if (pendingColor) header.style.setProperty("--nav-background", pendingColor);
      animations.forEach((animation) => animation.cancel());
      animations = [];
      ink.classList.remove("is-changing");
      pendingColor = color;
      if (immediate || reducedMotion.matches || !drops.every((drop) => drop.animate)) {
        header.style.setProperty("--nav-background", color);
        pendingColor = undefined;
        return;
      }

      header.style.setProperty("--nav-ink-color", color);
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
        header.style.setProperty("--nav-background", color);
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

      if (!section) return;
      if (section === currentSection) return;
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
      headerHeight = header.offsetHeight;
      pageHeight = document.documentElement.scrollHeight;
      viewportHeight = window.innerHeight;
      // Preserve identity across measurements so a resize does not replay ink.
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
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="nav-ink" aria-hidden="true"><span /><span /><span /></div>
      <nav className="container nav" aria-label="Main navigation">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)} aria-label="Faheem Ahmed, home">faheem<span aria-hidden="true">.</span></a>
        <button id="menu-toggle" className="menu-toggle" type="button" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
        <div id="nav-links" className={`nav-links${open ? " is-open" : ""}`}>
          {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
        </div>
      </nav>
    </header>
  );
}
