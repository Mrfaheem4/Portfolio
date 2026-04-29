import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollOrchestrator({ heroRef, marqueeRef, aboutRef }) {
  useEffect(() => {
    // Wait for Hero's entrance animation to finish (it takes ~1s)
    const delay = setTimeout(() => {
      const hero = heroRef.current;
      const marquee = marqueeRef.current;
      const about = aboutRef.current;
      if (!hero || !marquee || !about) return;

      // ── Initial states: push sections below viewport ────────
      gsap.set(marquee, { y: "60vh", opacity: 0, visibility: "visible" });
      gsap.set(about, { y: "80vh", opacity: 0, visibility: "visible" });

      // ── Master timeline, pinning the hero section ────────────
      // "+=220%" = 2.2x viewport heights of scroll before unpinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=220%", // tune this ↑↓ to control "wait" duration
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Phase 1 — 0% to 40%: Hero just sits. User scrolls, nothing moves.
      // (This is the "wait" feeling before anything happens)
      tl.to({}, { duration: 0.4 });

      // Phase 2 — 40% to 70%: Hero slides up and fades out
      tl.to(hero, {
        y: "-105vh",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      // Phase 3 — 50% to 80%: Marquee rises into view (overlaps hero exit)
      tl.to(
        marquee,
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
        },
        "<0.15",
      ); // starts 15% into hero's exit

      // Phase 4 — 70% to 100%: About section rises in after a beat
      tl.to(
        about,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power4.out",
        },
        "<0.2",
      ); // starts 20% after marquee starts
    }, 1200); // 1.2s — lets Hero entrance finish first

    return () => clearTimeout(delay);
  }, [heroRef, marqueeRef, aboutRef]);

  return null; // purely logic, no DOM output
}
