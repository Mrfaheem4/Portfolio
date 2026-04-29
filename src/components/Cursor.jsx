import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.opacity = "0.4";
      ring.style.borderColor = "#d4843a";
      dot.style.opacity = "0";
    };

    const onLeave = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.opacity = "0.7";
      dot.style.opacity = "1";
    };

    const addListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);
    // Re-query after DOM settles
    setTimeout(addListeners, 500);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#d4843a",
            transition: "opacity 0.2s",
          }}
        />
      </div>
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1.5px solid #d4843a",
            opacity: 0.7,
            transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
          }}
        />
      </div>
    </>
  );
}
