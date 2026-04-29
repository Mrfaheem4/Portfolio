import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.15 },
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-10 overflow-hidden"
    >
      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-outline font-display font-black"
          style={{ fontSize: "clamp(80px, 16vw, 200px)" }}
        >
          ABOUT
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Left — bio */}
        <div className="reveal">
          <p className="text-golden text-xs tracking-[0.3em] uppercase font-display mb-6">
            Who I Am
          </p>
          <p className="text-cream/80 text-xl leading-relaxed font-sans mb-6">
            I like things that look pretty.
          </p>
          <p className="text-cream/50 text-base leading-relaxed font-sans mb-8">
            Currently studying Software Engineering at NUST, I build web
            experiences that make people stop and stare. I obsess over details —
            the curve of a button, the weight of a font, the timing of an
            animation.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-golden text-charcoal text-sm font-display font-bold tracking-widest uppercase hover:bg-caramel transition-all duration-300"
          >
            Let's Talk
            <span>→</span>
          </a>
        </div>

        {/* Right — stats */}
        <div
          className="grid grid-cols-2 gap-4 reveal"
          style={{ transitionDelay: "0.2s" }}
        >
          {[
            { num: "2+", label: "Prized Projects" },
            { num: "5+", label: "Technologies" },
            { num: "∞", label: "Late Nights" },
            { num: "1", label: "Goal: Ship Beauty" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="p-6 rounded-2xl border border-cream/10 bg-cream/5 backdrop-blur-sm hover:border-golden/40 transition-all duration-300 group"
            >
              <div className="text-4xl font-display font-black text-golden mb-2 group-hover:scale-110 transition-transform duration-300">
                {num}
              </div>
              <div className="text-cream/50 text-sm font-display tracking-wide">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
