import { useRef, useCallback } from "react";
export default function MorphText({ original, replacement, radius = 100 }) {
  const spanRefs = useRef([]);

  const handleMouseMove = useCallback(
    (e) => {
      spanRefs.current.forEach((span, i) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

        if (dist < radius && i < replacement.length) {
          span.textContent = replacement[i];
          span.style.color = "rgb(255, 105, 180)";
        } else {
          span.textContent = original[i];
          span.style.color = "";
        }
      });
    },
    [original, replacement, radius],
  );

  const handleMouseLeave = useCallback(() => {
    spanRefs.current.forEach((span, i) => {
      if (!span) return;
      span.textContent = original[i];
      span.style.color = "";
    });
  }, [original]);

  return (
    <span
      className="text-[0.9em] inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "default" }}
    >
      {original.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => (spanRefs.current[i] = el)}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
