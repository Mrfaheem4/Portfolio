import { useEffect } from "react";

export default function useTextReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver) return;
    const animations = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry, index) => {
        observer.unobserve(entry.target);
        if (reducedMotion.matches) return;
        const animation = entry.target.animate(
          [{ opacity: 0.35, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 520, delay: Math.min(index * 45, 135), easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.25, rootMargin: "0px 0px -4% 0px" });

    const targets = document.querySelectorAll("main h2:not(#contact-title), main h3, .section-heading > p");
    if (!reducedMotion.matches) targets.forEach((target) => observer.observe(target));
    const stopMotion = () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    reducedMotion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      reducedMotion.removeEventListener("change", stopMotion);
    };
  }, []);
}
