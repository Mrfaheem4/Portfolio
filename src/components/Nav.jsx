import { useEffect, useState } from "react";

const links = [["Work", "work"], ["About", "about"], ["Stack", "skills"], ["Contact", "contact"]];

export default function Nav() {
  const [open, setOpen] = useState(false);

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
    <header className="site-header">
      <nav className="container nav" aria-label="Main navigation">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)} aria-label="Faheem Ahmed, home">faheem<span aria-hidden="true">.</span></a>
        <button id="menu-toggle" className="menu-toggle" type="button" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
        <div id="nav-links" className={`nav-links${open ? " is-open" : ""}`}>
          {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}{id === "contact" && <span aria-hidden="true"> ↗</span>}</a>)}
        </div>
      </nav>
    </header>
  );
}
