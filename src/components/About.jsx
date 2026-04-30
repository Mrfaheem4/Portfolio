import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const ghostRef = useRef(null);
  const taglineRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ghostRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" },
      );

      gsap.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        },
      );

      const chars = headingRef.current?.querySelectorAll(".char");
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.025,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 60%",
              once: true,
            },
          },
        );
      }

      gsap.fromTo(
        [bioRef.current, ctaRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      const cards = statsRef.current?.querySelectorAll(".stat-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.13,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center"
      style={{ paddingTop: "4rem", paddingBottom: "6rem" }}
    >
      {/* TOP CONTENT */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-10 flex flex-col items-center text-center">
        <p
          ref={taglineRef}
          className="text-golden text-xs tracking-[0.4em] uppercase font-display mb-12 opacity-0"
        >
          Hi — Who AM i ?
        </p>

        <div
          ref={headingRef}
          className="font-display font-black text-black mb-16 w-full"
          style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.15 }}
        >
          <div className="overflow-hidden mb-4">
            {"I LIKE THINGS".split("").map((c, i) => (
              <span
                key={i}
                className="char inline-block opacity-0"
                style={{ whiteSpace: c === " " ? "pre" : "normal" }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="overflow-hidden">
            {"THAT LOOK ".split("").map((c, i) => (
              <span
                key={i}
                className="char inline-block opacity-0 text-golden"
                style={{ whiteSpace: c === " " ? "pre" : "normal" }}
              >
                {c}
              </span>
            ))}
            {"PRETTY.".split("").map((c, i) => (
              <span
                key={i}
                className="char inline-block opacity-0"
                style={{ whiteSpace: c === " " ? "pre" : "normal" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <p
          ref={bioRef}
          className="text-gray-700 text-lg leading-[2.2] font-sans opacity-0 max-w-2xl mb-12"
        >
          Currently studying Software Engineering at NUST. I build web
          experiences that make people stop and stare — obsessing over the curve
          of a button, the weight of a font, the timing of an animation.
        </p>

        <a
          ref={ctaRef}
          href="#contact"
          className="opacity-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-golden text-charcoal text-sm font-display font-bold tracking-widest uppercase hover:bg-caramel transition-all duration-300"
        >
          Let's Talk <span>→</span>
        </a>
      </div>

      {/* GHOST TEXT — inline between top and stats, not absolute */}
      <div
        ref={ghostRef}
        className="relative w-full flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{
          height: "28rem",
          marginTop: "-4rem",
          marginBottom: "-4rem",
          opacity: 0,
        }}
      >
        <span
          className="font-display font-black whitespace-nowrap bg-gradient-to-b from-black to-gray-800 bg-clip-text text-transparent"
          style={{
            fontSize: "clamp(85px, 18vw, 220px)",
            letterSpacing: "-0.02em",
          }}
        >
          ABOUT
        </span>
      </div>

      {/* STATS GRID */}
      <div
        ref={statsRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-10 grid grid-cols-2 gap-6 place-items-center"
      >
        {[
          {
            num: "10+",
            label: "Prized Projects",
            sub: "Real work. Real craft.",
          },
          {
            num: "7+",
            label: "Technologies",
            sub: "React, Three.js, GSAP & more",
          },
          {
            num: "∞",
            label: "Late Nights",
            sub: "The best work happens after midnight",
          },
          { num: "1", label: "Goal", sub: "Ship beauty into the world" },
        ].map(({ num, label, sub }) => (
          <div
            key={label}
            className="stat-card opacity-0 w-full rounded-3xl transition-all duration-500 group text-left"
          >
            <div className="p-6">
              <div
                className="font-display font-black text-golden mb-4 group-hover:scale-105 transition-transform duration-300 origin-left"
                style={{ fontSize: "clamp(52px, 7vw, 100px)", lineHeight: 1 }}
              >
                {num}
              </div>
              <div className="text-black font-display font-black text-2xl tracking-wide mb-3">
                {label}
              </div>
              <div className="text-gray-600 text-sm font-sans leading-relaxed">
                {sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
