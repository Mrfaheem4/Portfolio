import { useEffect, useRef } from "react";

const projects = [
  {
    id: "01",
    name: "Ignition",
    tag: "Passion Project",
    tagline: "Built for the love of the game.",
    desc: "A love letter to Need for Speed. Racing aesthetics, nostalgia-coded visuals, and the kind of energy that made 14-year-olds stay up till 3am.",
    stack: ["Three.js", "GSAP", "React"],
    gradient: "from-[#0a0a0a] via-[#1a0a00] to-[#2d1200]",
    accent: "#d4843a",
    stripes: true,
  },
  {
    id: "02",
    name: "Synesthesia",
    tag: "Creative Dev",
    tagline: "What does your playlist look like?",
    desc: "Music visualized through shapes and colors. Feed it a track, watch it think in gradients and geometry.",
    stack: ["React", "TypeScript", "Three.js"],
    gradient: "from-[#050510] via-[#0d0520] to-[#150a2d]",
    accent: "#8b5cf6",
    stripes: false,
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
            entry.target.style.filter = "blur(0px)";
          } else {
            entry.target.style.opacity = "0";
            entry.target.style.transform = "translateY(60px) scale(0.96)";
            entry.target.style.filter = "blur(4px)";
          }
        });
      },
      { threshold: 0.2 },
    );
    cardsRef.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 px-10 overflow-hidden"
    >
      {/* Ghost gradient text */}
      <div className="absolute top-16 inset-x-0 flex justify-center pointer-events-none select-none">
        <span
          className="text-outline-golden font-display font-black"
          style={{ fontSize: "clamp(80px, 16vw, 200px)" }}
        >
          WORK
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-golden text-xs tracking-[0.3em] uppercase font-display mb-4">
          Selected Work
        </p>
        <h2
          className="font-display font-black text-cream mb-20"
          style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
        >
          Things I've Built
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{
                opacity: 0,
                transform: "translateY(60px) scale(0.96)",
                filter: "blur(4px)",
                transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s, filter 0.7s ease ${i * 0.15}s`,
              }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3]"
            >
              {/* Card background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`}
              />

              {/* Racing stripes for Ignition */}
              {p.stripes && (
                <div className="absolute inset-0 opacity-10">
                  {[...Array(6)].map((_, j) => (
                    <div
                      key={j}
                      className="absolute h-full w-px"
                      style={{
                        left: `${15 + j * 14}%`,
                        background: "#d4843a",
                        transform: "skewX(-20deg)",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Synesthesia blobs */}
              {!p.stripes && (
                <div className="absolute inset-0 overflow-hidden opacity-40">
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 200,
                      height: 200,
                      top: "10%",
                      left: "20%",
                      background:
                        "radial-gradient(circle, #8b5cf6, transparent)",
                      filter: "blur(40px)",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 150,
                      height: 150,
                      top: "40%",
                      right: "15%",
                      background:
                        "radial-gradient(circle, #06b6d4, transparent)",
                      filter: "blur(30px)",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 180,
                      height: 180,
                      bottom: "10%",
                      left: "30%",
                      background:
                        "radial-gradient(circle, #ec4899, transparent)",
                      filter: "blur(35px)",
                    }}
                  />
                </div>
              )}

              {/* Project number */}
              <div className="absolute top-6 right-6 font-display font-black text-white/10 text-6xl leading-none select-none">
                {p.id}
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${p.accent}22, transparent 70%)`,
                }}
              />

              {/* Content — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-white/40 text-xs font-display tracking-widest uppercase mb-2">
                  {p.tagline}
                </p>
                <p className="text-white/70 text-sm font-sans mb-5 max-w-sm">
                  {p.desc}
                </p>

                {/* Stack pills + arrow */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs font-display tracking-wide border border-white/20 text-white/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-5 py-2 rounded-full font-display font-bold tracking-widest uppercase text-xs text-white border border-white/20 bg-white/5">
                      {p.name}
                    </span>
                    <button className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/5 hover:bg-white/20 transition-all duration-300 text-white text-sm">
                      ↗
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
