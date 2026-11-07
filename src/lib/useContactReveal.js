import { useEffect, useRef } from "react";

export default function useContactReveal() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver || reducedMotion.matches) return;

    const animations = [];
    const play = (element, frames, delay = 0, duration = 900) => {
      animations.push(element.animate(frames, {
        duration,
        delay,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "backwards",
      }));
    };
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      if (reducedMotion.matches) return;

      section.querySelectorAll(".contact-title-line > span").forEach((line, index) => {
        play(line, [
          { transform: "translateY(110%) rotate(2deg)", opacity: 0 },
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        ], index * 130);
      });
      play(section.querySelector(".contact-arrow"), [
        { transform: "translate(-28px, 28px) rotate(-35deg)", opacity: 0 },
        { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
      ], 220, 1100);
      play(section.querySelector(".contact-bottom"), [
        { transform: "translateY(22px)", opacity: 0 },
        { transform: "translateY(0)", opacity: 1 },
      ], 380);
      play(section.querySelector(".contact-underline path"), [
        { strokeDashoffset: "1" },
        { strokeDashoffset: "0" },
      ], 450, 1200);
    }, { threshold: 0.2 });

    observer.observe(section);
    const stopMotion = () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
    reducedMotion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      reducedMotion.removeEventListener("change", stopMotion);
    };
  }, []);

  return sectionRef;
}
