import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ignittonImg from "../assets/igniton.png";
import dnaAlignImg from "../assets/dnaalign.png";
import osLowImg from "../assets/os-low.png";

gsap.registerPlugin(ScrollTrigger);

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
    image: ignittonImg,
    link: "https://ignitioncars.vercel.app",
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
    link: "https://github.com/Mrfaheem4/Synesthesia",
  },
  {
    id: "03",
    name: "DNA Align",
    tag: "Bioinformatics",
    tagline: "DNA sequence matching simplified.",
    desc: "Compare and align DNA sequences with an intuitive interface. Built for researchers and bioinformatics enthusiasts.",
    stack: ["React", "Tailwind"],
    gradient: "from-[#050515] via-[#0a0d2e] to-[#1a0530]",
    accent: "#06b6d4",
    stripes: false,
    image: dnaAlignImg,
    link: "https://dnaalign.vercel.app",
  },
  {
    id: "04",
    name: "OS Kernel Simulator",
    tag: "Systems Programming",
    tagline: "Operating system operations visualized.",
    desc: "Simulate OS kernel operations including process thread management, synchronization, scheduling, and memory management. Learn how operating systems work.",
    stack: ["React", "Tailwind", "JavaScript"],
    gradient: "from-[#0a0515] via-[#1a0a2e] to-[#2d0a30]",
    accent: "#10b981",
    stripes: false,
    image: osLowImg,
    link: "https://os-low.vercel.app",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const ghostRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Ghost fade in + scroll parallax
    gsap.fromTo(
      ghostRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom top",
          scrub: 2,
        },
      },
    );

    // Cards intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
          } else {
            entry.target.style.opacity = "0";
            entry.target.style.transform = "translateY(60px) scale(0.96)";
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
      className="relative w-full flex flex-col items-center"
      style={{ paddingTop: "12rem", paddingBottom: "12rem" }}
    >
      {/* CENTERED CONTAINER */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-10 flex flex-col items-center">
        {/* TOP HEADER */}
        <div className="w-full text-center">
          <p className="text-golden text-xs tracking-[0.3em] uppercase font-display mb-4">
            Selected Work
          </p>
          <h2
            className="font-display font-black text-cream"
            style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
          >
            Things I've Built
          </h2>
        </div>

        {/* GHOST TEXT — inline, sits between header and cards */}
        <div
          ref={ghostRef}
          className="relative w-full flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{
            height: "28rem",
            marginTop: "-2rem",
            marginBottom: "-4rem",
            opacity: 0,
          }}
        >
          <span
            className="font-display font-black whitespace-nowrap bg-gradient-to-b from-gray-400 to-black bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(80px, 16vw, 200px)",
              letterSpacing: "-0.02em",
            }}
          >
            WORK
          </span>
        </div>

        {/* CARDS */}
        <div className="w-full">
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => (cardsRef.current[i] = el)}
                style={{
                  opacity: 0,
                  transform: "translateY(60px) scale(0.96)",
                  transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
                }}
              >
                {/* IMAGE CARD */}
                <div className="group relative rounded-3xl overflow-hidden aspect-[4/3]">
                  {/* Card background or image */}
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`}
                    />
                  )}

                  {/* Racing stripes for Ignition */}
                  {p.stripes && !p.image && (
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
                </div>

                {/* CAPTION — below the image */}
                <div className="mt-8 text-center">
                  <p className="text-white/40 text-sm font-display font-bold tracking-widest uppercase mb-6">
                    {p.tagline}
                  </p>
                  <p className="text-white/70 text-base font-sans mb-8 max-w-sm mx-auto">
                    {p.desc}
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center gap-2 flex-wrap justify-center">
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
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/5 hover:bg-white/20 transition-all duration-300 text-white text-sm"
                      >
                        ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
