import { useLayoutEffect, useRef } from "react";
import { revealOnScroll } from "./revealOnScroll";

export default function useContactReveal() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lines = [...section.querySelectorAll(".contact-title-line")];
    return revealOnScroll([
      ...lines.map((target) => ({
        target,
        element: target.firstElementChild,
        frames: [
          { transform: "translateY(110%) rotate(2deg)", opacity: 0 },
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        ],
        duration: 900,
      })),
      {
        target: lines.at(-1),
        element: section.querySelector(".contact-underline path"),
        frames: [{ strokeDashoffset: "1" }, { strokeDashoffset: "0" }],
        delay: 250,
        duration: 1200,
      },
    ]);
  }, []);

  return sectionRef;
}
