import { useEffect, useRef, useState } from "react";

const groups = [
  { number: "01", title: "Interfaces", color: "var(--toolkit-white)", description: "Responsive, expressive experiences for the web.", items: ["React", "TypeScript", "JavaScript", "HTML & CSS", "Tailwind CSS", "MUI"] },
  { number: "02", title: "Motion & interaction", color: "var(--toolkit-light-grey)", description: "Adding personality through movement and depth.", items: ["GSAP", "Three.js", "UI / UX"] },
  { number: "03", title: "Beyond the browser", color: "var(--toolkit-grey)", description: "The tools behind connected applications.", items: ["Electron", "Supabase", "PostgreSQL", "Git & GitHub"] },
];

export default function Skills() {
  const gridRef = useRef(null);
  const [activeRow, setActiveRow] = useState(-1);

  useEffect(() => {
    const grid = gridRef.current;
    const rows = [...grid.children];
    let frame = 0;
    let currentRow = -1;
    let bounds = [];
    let viewportHeight = window.innerHeight;

    const updateActiveRow = () => {
      frame = 0;
      const center = window.scrollY + viewportHeight / 2;
      // One row owns the viewport center, in either scroll direction.
      const nextRow = bounds.findIndex(({ top, bottom }) => top <= center && bottom > center);

      if (nextRow !== currentRow) {
        currentRow = nextRow;
        setActiveRow(nextRow);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveRow);
    };

    const measure = () => {
      viewportHeight = window.innerHeight;
      bounds = rows.map((row) => {
        const rect = row.getBoundingClientRect();
        return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
      });
      requestUpdate();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    observer.observe(document.getElementById("main"));
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="skills" className="section stack-section" aria-labelledby="stack-title">
      <div className="container">
        <div className="section-heading">
          <div><h2 id="stack-title">My toolkit.</h2></div>
          <p>A practical stack for bringing<br className="desktop-break" /> thoughtful ideas to life.</p>
        </div>
        <div ref={gridRef} className="stack-grid">
          {groups.map((group, index) => (
            <article
              className={`stack-card${activeRow === index ? " is-active" : ""}`}
              key={group.number}
              style={{ "--stack-sweep": group.color }}
            >
              <div className="stack-copy">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <ul className="skill-list">
                {group.items.map((item, itemIndex) => (
                  <li key={item} style={{ "--pill-index": itemIndex }}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
