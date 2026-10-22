const groups = [
  { number: "01", title: "Interfaces", description: "Responsive, expressive experiences for the web.", items: ["React", "TypeScript", "JavaScript", "HTML & CSS", "Tailwind CSS", "MUI"] },
  { number: "02", title: "Motion & interaction", description: "Adding personality through movement and depth.", items: ["GSAP", "Three.js", "UI / UX"] },
  { number: "03", title: "Beyond the browser", description: "The tools behind connected applications.", items: ["Electron", "Supabase", "PostgreSQL", "Git & GitHub"] },
];

export default function Skills() {
  return (
    <section id="skills" className="section stack-section" aria-labelledby="stack-title"><div className="container">
      <div className="section-heading"><div><p className="eyebrow section-label">03 / My toolkit</p><h2 id="stack-title">Good ideas. <span className="serif">The right tools.</span></h2></div><p>A practical stack for bringing<br className="desktop-break" /> thoughtful ideas to life.</p></div>
      <div className="stack-grid">{groups.map((group) => <article className="stack-card" key={group.number}><span className="stack-number">/{group.number}</span><h3>{group.title}</h3><p>{group.description}</p><ul className="skill-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
    </div></section>
  );
}
