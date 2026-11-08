// Paused animations hold their first frame until the observed text is visible.
// Cancelling them restores the normal, readable document styles.
export function revealOnScroll(definitions) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!window.IntersectionObserver || reducedMotion.matches) return () => {};

  const threshold = 0.45;
  const pending = new Map();
  const animations = new Set();
  let observer;
  let stopped = false;

  for (const { element, target = element, frames, delay = 0, duration = 800 } of definitions) {
    if (!element?.animate || !target) continue;
    const animation = element.animate(frames, {
      duration,
      delay,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "both",
    });
    animation.pause();
    animation.currentTime = 0;
    animations.add(animation);
    animation.onfinish = () => {
      animations.delete(animation);
      animation.cancel();
    };
    if (!pending.has(target)) pending.set(target, []);
    pending.get(target).push(animation);
  }

  const observe = () => {
    observer?.disconnect();
    if (stopped || !pending.size) return;
    observer = new window.IntersectionObserver((entries) => {
      for (const entry of entries) {
        // Initial observer notifications can arrive below the threshold.
        if (!entry.isIntersecting || entry.intersectionRatio < threshold) continue;
        const waiting = pending.get(entry.target);
        if (!waiting) continue;
        pending.delete(entry.target);
        observer.unobserve(entry.target);
        waiting.forEach((animation) => animation.play());
      }
    }, {
      threshold,
      // Pixel units keep the inset proportional to viewport height.
      rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.12)}px 0px`,
    });
    pending.forEach((_, target) => observer.observe(target));
  };

  const stop = () => {
    stopped = true;
    observer?.disconnect();
    animations.forEach((animation) => animation.cancel());
    animations.clear();
    pending.clear();
  };
  const updateMotion = () => {
    if (reducedMotion.matches) stop();
  };

  observe();
  window.addEventListener("resize", observe);
  reducedMotion.addEventListener("change", updateMotion);

  return () => {
    stop();
    window.removeEventListener("resize", observe);
    reducedMotion.removeEventListener("change", updateMotion);
  };
}
