import { useEffect, useRef, useState } from "react";

const groups = [
  { number: "01", title: "Interfaces", color: "var(--toolkit-blue)", description: "Responsive, expressive experiences for the web.", items: ["React", "TypeScript", "JavaScript", "HTML & CSS", "Tailwind CSS", "MUI"] },
  { number: "02", title: "Motion & interaction", color: "var(--toolkit-teal)", description: "Adding personality through movement and depth.", items: ["GSAP", "Three.js", "UI / UX"] },
  { number: "03", title: "Beyond the browser", color: "var(--toolkit-rose)", description: "The tools behind connected applications.", items: ["Electron", "Supabase", "PostgreSQL", "Git & GitHub"] },
];

export default function Skills() {
  const gridRef = useRef(null);
  const [activeRow, setActiveRow] = useState(-1);

  useEffect(() => {
    const grid = gridRef.current;
    const rows = [...grid.children];
    let frame = 0;
    let currentRow = -1;

    const updateActiveRow = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      // One row owns the viewport center, in either scroll direction.
      const nextRow = rows.findIndex((row) => {
        const { top, bottom } = row.getBoundingClientRect();
        return top <= center && bottom > center;
      });

      if (nextRow !== currentRow) {
        currentRow = nextRow;
        setActiveRow(nextRow);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveRow);
    };

    const observer = new ResizeObserver(requestUpdate);
    observer.observe(grid);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
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
