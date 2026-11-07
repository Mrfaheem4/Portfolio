import { useEffect, useRef, useState } from "react";

const links = [["Work", "work"], ["Experience", "experience"], ["About", "about"], ["Stack", "skills"], ["Contact", "contact"]];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const main = document.getElementById("main");
    const sections = [...main.querySelectorAll(":scope > section")];
    let frame = 0;
    let currentSection;

    const updateColor = () => {
      frame = 0;
      const boundary = header.getBoundingClientRect().bottom + 1;
      const atBottom = window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const section = atBottom
        ? sections.at(-1)
        : sections.findLast((section) => section.getBoundingClientRect().top <= boundary) ?? sections[0];

      if (section === currentSection) return;
      currentSection = section;
      header.style.setProperty("--nav-background", getComputedStyle(section).getPropertyValue("--section-color"));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateColor);
    };

    const observer = new ResizeObserver(requestUpdate);
    observer.observe(main);
    observer.observe(header);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("pageshow", requestUpdate);
    updateColor();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("pageshow", requestUpdate);
      window.cancelAnimationFrame(frame);
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
