import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const ghostRef = useRef(null);
  const pillsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Pills staggered entrance
      gsap.fromTo(
        pillsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center"
      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      {/* CENTERED CONTAINER */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-10 flex flex-col items-center">
        {/* TOP HEADER */}
        <div className="w-full text-center">
          <p className="text-golden text-xs tracking-[0.3em] uppercase font-display mb-4">
            What I Use
          </p>
          <h2
            className="font-display font-black text-black"
            style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
          >
            My Tech Stack
          </h2>
        </div>

        {/* GHOST TEXT */}
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
            className="font-display font-black whitespace-nowrap bg-gradient-to-b from-black to-gray-800 bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(80px, 16vw, 200px)",
              letterSpacing: "-0.02em",
            }}
          >
            STACK
          </span>
        </div>

        {/* SKILLS PILLS */}
        <div className="w-full flex justify-center">
          <div className="flex flex-wrap gap-8 justify-center max-w-5xl">
            {skills.map(({ name, level }, i) => (
              <div
                key={name}
                ref={(el) => (pillsRef.current[i] = el)}
                style={{ opacity: 0, transform: "translateY(40px)" }}
              >
                <div className="px-8 py-8 rounded-2xl bg-white border border-black/5 text-black text-lg font-bold font-display tracking-widest shadow-2xl hover:shadow-golden/30 transition-all duration-300 flex items-center justify-center text-center">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
