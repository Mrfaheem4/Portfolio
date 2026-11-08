import { useEffect, useId, useRef } from "react";
import { createRibbonPath } from "../lib/ribbonPath";
import { smoothRibbonLength, subscribeScrollFrame } from "../lib/scrollFrame";

const palette = [
  { section: "home", progress: 0, color: "var(--ribbon-home)" },
  { section: "home", progress: 0.72, color: "var(--ribbon-home)" },
  { section: "work", progress: 0, color: "var(--ribbon-work)" },
  { section: "work", progress: 0.58, color: "var(--ribbon-mint)" },
  { section: "experience", progress: 0, color: "var(--ribbon-experience)" },
  { section: "about", progress: 0, color: "var(--ribbon-about)" },
  { section: "skills", progress: 0, color: "var(--ribbon-skills)" },
  { section: "contact", progress: 0, color: "var(--ribbon-contact)" },
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
    const contactText = main.querySelector(".contact-bottom-wrap");
    const contactMaskPath = main.querySelector(".contact-ribbon-mask-path");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let measureFrame = 0;
    let samples = [];
    let length = 0;
    let drawn = 0;
    let contactMask = null;
    let contactReveal = -1;
    let mainTop = 0;
    let mainHeight = 0;
    let viewportHeight = 0;
    let initialized = false;
    let introStart = null;
    let scrollPosition = window.scrollY;
    let lastFrame = null;

    // Update the existing mask path only while the ribbon crosses this row.
    // No image data is serialized or decoded during scrolling.
    const updateContactReveal = () => {
      if (!contactMaskPath || !contactMask || !samples.length || length <= 0) return;
      const position = Math.max(0, Math.min(1, drawn / length)) * (samples.length - 1);
      const index = Math.min(samples.length - 2, Math.floor(position));
      const y = samples[index].y + (samples[index + 1].y - samples[index].y) * (position - index);
      const radius = contactMask.strokeWidth / 2;
      const offset = y + radius < contactMask.top ? length
        : y - radius > contactMask.top + contactMask.height ? 0
        : Math.round(Math.max(0, length - drawn) * 2) / 2;
      if (offset === contactReveal) return;
      contactReveal = offset;
      contactMaskPath.style.strokeDashoffset = String(offset);
    };

    // Cache distances along the curve, avoiding SVG geometry reads on scroll.
    const targetLength = () => {
      const targetY = Math.max(
        0,
        Math.min(mainHeight, scrollPosition + viewportHeight * 0.76 - mainTop),
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

    const animate = (now) => {
      if (!samples.length || reducedMotion.matches) return;
      const deltaMs = lastFrame === null ? 1000 / 60 : now - lastFrame;
      lastFrame = now;
      const target = targetLength();
      const previous = drawn;
      if (introStart !== null) {
        const progress = Math.max(0, Math.min(1, (now - introStart) / 1200));
        drawn = target * (1 - (1 - progress) ** 3);
        if (progress === 1) introStart = null;
      } else {
        drawn = smoothRibbonLength(drawn, target, deltaMs);
      }
      if (drawn === previous) return;
      path.style.strokeDashoffset = String(length - drawn);
      updateContactReveal();
    };

    const measure = () => {
      measureFrame = 0;
      const width = main.clientWidth;
      const height = main.offsetHeight;
      const mainBounds = main.getBoundingClientRect();
      mainTop = mainBounds.top + window.scrollY;
      mainHeight = height;
      viewportHeight = window.innerHeight;
      scrollPosition = window.scrollY;
      const sections = [...main.querySelectorAll(":scope > section")].map((section) => ({
        id: section.id,
        top: section.offsetTop,
        height: section.offsetHeight,
      }));

      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      path.setAttribute("d", createRibbonPath(width, height, sections));
      if (contactText && contactMaskPath) {
        const bounds = contactText.getBoundingClientRect();
        contactMask = {
          strokeWidth: width <= 760 ? 40 : 60,
          top: bounds.top - mainBounds.top,
          height: bounds.height,
        };
        contactMaskPath.setAttribute("d", path.getAttribute("d"));
        contactMaskPath.setAttribute("transform", `translate(${mainBounds.left - bounds.left} ${mainBounds.top - bounds.top})`);
        contactMaskPath.setAttribute("stroke-width", String(contactMask.strokeWidth));
        contactMaskPath.parentElement.setAttribute("width", String(bounds.width));
        contactMaskPath.parentElement.setAttribute("height", String(bounds.height));
        contactReveal = -1;
      }
      gradientRef.current.setAttribute("y2", String(height));
      palette.forEach(({ section, progress }, index) => {
        const element = document.getElementById(section);
        gradientRef.current.children[index].setAttribute(
          "offset",
          String(element ? (element.offsetTop + element.offsetHeight * progress) / height : 0),
        );
      });

      length = path.getTotalLength();
      samples = Array.from({ length: 1201 }, (_, index) => {
        const distance = (index / 1200) * length;
        return { distance, y: path.getPointAtLength(distance).y };
      });
      path.style.strokeDasharray = reducedMotion.matches
        ? "none"
        : String(length);
      if (contactMaskPath) contactMaskPath.style.strokeDasharray = path.style.strokeDasharray;
      if (reducedMotion.matches) {
        drawn = length;
        introStart = null;
      } else if (!initialized) {
        drawn = 0;
        introStart = performance.now();
      } else if (introStart === null) {
        drawn = targetLength();
      }
      initialized = true;
      path.style.strokeDashoffset = String(length - drawn);
      updateContactReveal();
      svg.style.visibility = "visible";
    };

    const requestMeasure = () => {
      if (!measureFrame) measureFrame = window.requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(requestMeasure);
    observer.observe(main);
    const unsubscribe = subscribeScrollFrame((scroll, now) => {
      scrollPosition = scroll;
      animate(now);
    });
    window.addEventListener("resize", requestMeasure);
    reducedMotion.addEventListener("change", requestMeasure);
    measure();

    return () => {
      observer.disconnect();
      unsubscribe();
      window.removeEventListener("resize", requestMeasure);
      reducedMotion.removeEventListener("change", requestMeasure);
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
              stopOpacity={0.94}
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
