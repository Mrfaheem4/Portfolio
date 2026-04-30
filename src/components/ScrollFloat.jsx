import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import faheemPhoto from "../assets/faheem.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. ENTRANCE ANIMATION
      // Starts 100px lower (y: 100) and moves to its natural CSS position (y: 0)
      gsap.fromTo(
        [leftDivRef.current, rightDivRef.current],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.2,
        },
      );

      // 2. PARALLAX SCROLL (Fast upward movement)
      // We animate from y: 0 (the position they just landed in) to a negative Y value
      gsap.to(leftDivRef.current, {
        y: -400,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(rightDivRef.current, {
        y: -500,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Ghost background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-black whitespace-nowrap bg-gradient-to-b from-black to-gray-800 bg-clip-text text-transparent"
          style={{
            fontSize: "clamp(85px, 18vw, 220px)",
            letterSpacing: "-0.02em",
            transform: "translateY(-50px)",
          }}
        >
          DEVELOPER
        </span>
      </div>

      {/* Center photo with golden arch */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: "translateY(-30px)" }}
      >
        <div
          className="relative"
          style={{
            width: "clamp(280px, 36vw, 480px)",
            height: "clamp(320px, 42vw, 560px)",
          }}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full"
            style={{
              width: "85%",
              height: "90%",
              background:
                "radial-gradient(ellipse at 60% 40%, #c8956b 0%, #d4843a 40%, #8a4a1a 100%)",
              filter: "blur(6px)",
              opacity: 0.98,
            }}
          />
          <img
            src={faheemPhoto}
            alt="Faheem Ahmed"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 object-cover object-top rounded-t-full"
            style={{ width: "82%", height: "95%" }}
          />
        </div>
      </div>

      {/* Floating pills — Restored exact styles */}
      <div className="absolute top-[35%] left-[32%] z-20 animate-float">
        <div
          className="px-24 py-8 rounded-full bg-white border border-black/5 text-black text-base font-bold font-display tracking-widest shadow-2xl"
          style={{ padding: "0.5rem 0.5rem" }}
        >
          React JS
        </div>
      </div>

      <div className="absolute top-[28%] right-[34%] z-20 animate-float2">
        <div
          className="px-24 py-8 rounded-full bg-white border border-black/5 text-black text-base font-bold font-display tracking-widest shadow-2xl"
          style={{ padding: "0.5rem 0.5rem" }}
        >
          Three.js
        </div>
      </div>

      <div className="absolute top-[62%] left-[30%] z-20 animate-float3">
        <div
          className="px-24 py-8 rounded-full bg-white border border-black/5 text-black text-base font-bold font-display tracking-widest shadow-2xl"
          style={{ padding: "0.5rem 0.5rem" }}
        >
          GSAP
        </div>
      </div>

      <div className="absolute top-[58%] right-[32%] z-20 animate-float4">
        <div
          className="px-24 py-8 rounded-full bg-white border border-black/5 text-black text-base font-bold font-display tracking-widest shadow-2xl"
          style={{ padding: "0.5rem 0.5rem" }}
        >
          TypeScript
        </div>
      </div>

      <div className="absolute top-[80%] right-[32%] z-20 animate-float4">
        <div
          className="px-24 py-8 rounded-full bg-white border border-black/5 text-black text-base font-bold font-display tracking-widest shadow-2xl"
          style={{ padding: "0.5rem 0.5rem" }}
        >
          Javascript
        </div>
      </div>

      {/* LEFT CONTENT */}
      <div ref={leftDivRef} className="absolute bottom-16 left-10 z-10">
        <p className="text-gray-600 text-xs tracking-[0.2em] uppercase font-display mb-3">
          Hi 👋 I'm Faheem Ahmed
        </p>
        <h1
          className="font-display font-black leading-[1.1] text-black"
          style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
        >
          WEB DESIGN,
          <br />
          <span className="text-golden text-[0.95em]">FRONT END</span>
          <br />
          <span className="text-[0.9em]">&PRETTY THINGS.</span>
        </h1>
      </div>

      {/* RIGHT CONTENT */}
      <div ref={rightDivRef} className="absolute bottom-16 right-10 z-10">
        <p className="text-gray-600 text-xs tracking-[0.2em] uppercase font-display mb-3">
          A bit about me
        </p>
        <h2
          className="font-display font-black leading-[1.1] text-black"
          style={{ fontSize: "clamp(18px, 2.5vw, 36px)" }}
        >
          SOFTWARE ENGINEER
          <br />
          <span className="text-golden text-[0.95em]">& CREATIVE</span>
          <br />
          <span className="text-[0.9em]">DEVELOPER.</span>
        </h2>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-600 text-xs tracking-widest uppercase font-display">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-golden/60 to-transparent" />
      </div>
    </section>
  );
}
