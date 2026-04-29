import { useEffect, useRef } from "react";

const skills = [
  { name: "React JS", level: "Expert" },
  { name: "TypeScript", level: "Proficient" },
  { name: "Three.js", level: "Proficient" },
  { name: "GSAP", level: "Proficient" },
  { name: "MUI", level: "Expert" },
  { name: "HTML / CSS", level: "Expert" },
  { name: "UI / UX", level: "Passionate" },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-10 overflow-hidden"
    >
      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-outline font-display font-black"
          style={{ fontSize: "clamp(80px, 16vw, 200px)" }}
        >
          STACK
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-golden text-xs tracking-[0.3em] uppercase font-display mb-4">
          What I Use
        </p>
        <h2
          className="font-display font-black text-cream mb-20"
          style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
        >
          My Tech Stack
        </h2>

        {/* Scattered pills layout */}
        <div className="flex flex-wrap gap-4 max-w-3xl">
          {skills.map(({ name, level }, i) => (
            <div
              key={name}
              className="reveal group"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                className={`px-6 py-3 rounded-full border transition-all duration-300 flex items-center gap-3
                ${
                  i % 3 === 0
                    ? "border-golden/50 bg-golden/10 hover:bg-golden/20"
                    : "border-cream/15 bg-cream/5 hover:border-golden/30 hover:bg-cream/10"
                }`}
              >
                <span className="font-display font-bold text-cream text-sm tracking-wide">
                  {name}
                </span>
                <span className="text-xs text-cream/30 font-sans">{level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
