import { useEffect, useId, useRef } from "react";
import { createRibbonPath } from "../lib/ribbonPath";

const palette = [
  { section: "home", progress: 0, color: "#000000" },
  { section: "home", progress: 0.72, color: "#000000" },
  { section: "work", progress: 0, color: "#174c35" },
  { section: "work", progress: 0.58, color: "#65732c" },
  { section: "about", progress: 0, color: "#576b29" },
  { section: "skills", progress: 0, color: "#166448" },
  { section: "contact", progress: 0, color: "#bed16b" },
];

export default function ScrollRibbon() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const gradientRef = useRef(null);
  const gradientId = useId();

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const main = svg.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let measureFrame = 0;
    let samples = [];
    let length = 0;
    let drawn = 0;

    // Cache distances along the curve, avoiding SVG geometry reads on scroll.
    const targetLength = () => {
      const top = main.getBoundingClientRect().top;
      const targetY = Math.max(
        0,
        Math.min(main.offsetHeight, window.innerHeight * 0.76 - top),
      );
      let low = 0;
      let high = samples.length - 1;
      while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (samples[middle].y < targetY) low = middle + 1;
        else high = middle;
      }
      const after = samples[low];
      const before = samples[Math.max(0, low - 1)];
      const fraction = (targetY - before.y) / (after.y - before.y || 1);
      return Math.max(
        0,
        Math.min(
          length,
          before.distance + (after.distance - before.distance) * fraction,
        ),
      );
    };

    const animate = () => {
      frame = 0;
      if (!samples.length || reducedMotion.matches) return;
      const target = targetLength();
      drawn += (target - drawn) * 0.16;
      if (Math.abs(target - drawn) < 0.25) drawn = target;
      path.style.strokeDashoffset = String(length - drawn);
      if (drawn !== target) frame = window.requestAnimationFrame(animate);
    };

    const requestDraw = () => {
      if (!frame && !reducedMotion.matches)
        frame = window.requestAnimationFrame(animate);
    };

    const measure = () => {
      measureFrame = 0;
      const width = main.clientWidth;
      const height = main.offsetHeight;
      const sections = [...main.querySelectorAll(":scope > section")].map((section) => ({
        id: section.id,
        top: section.offsetTop,
        height: section.offsetHeight,
      }));

      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      path.setAttribute("d", createRibbonPath(width, height, sections));
      gradientRef.current.setAttribute("y2", String(height));
      palette.forEach(({ section, progress }, index) => {
        const element = document.getElementById(section);
        gradientRef.current.children[index].setAttribute(
          "offset",
          String(element ? (element.offsetTop + element.offsetHeight * progress) / height : 0),
        );
      });

      length = path.getTotalLength();
      samples = Array.from({ length: 401 }, (_, index) => {
        const distance = (index / 400) * length;
        return { distance, y: path.getPointAtLength(distance).y };
      });
      path.style.strokeDasharray = reducedMotion.matches
        ? "none"
        : String(length);
      drawn = reducedMotion.matches ? length : targetLength();
      path.style.strokeDashoffset = String(length - drawn);
      svg.style.visibility = "visible";
    };

    const requestMeasure = () => {
      if (!measureFrame) measureFrame = window.requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(requestMeasure);
    observer.observe(main);
    window.addEventListener("scroll", requestDraw, { passive: true });
    window.addEventListener("resize", requestMeasure);
    reducedMotion.addEventListener("change", requestMeasure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestDraw);
      window.removeEventListener("resize", requestMeasure);
      reducedMotion.removeEventListener("change", requestMeasure);
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(measureFrame);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="scroll-ribbon"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          ref={gradientRef}
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          {palette.map(({ section, progress, color }) => (
            <stop
              key={`${section}-${progress}`}
              offset="0"
              stopColor={color}
              stopOpacity={section === "home" ? 0.9 : 0.52}
            />
          ))}
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
