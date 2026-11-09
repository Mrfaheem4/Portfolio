import { useEffect } from "react";
import Lenis from "lenis";
import { publishScrollFrame } from "./scrollFrame";

export default function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;
    let frame = 0;
    let menuOpen = false;

    const tick = (now) => {
      frame = window.requestAnimationFrame(tick);
      lenis.raf(now);
      publishScrollFrame(lenis.scroll, now);
    };

    const updateMotion = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lenis?.destroy();
      lenis = undefined;

      if (reducedMotion.matches) return;

      lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        lerp: 0.1,
      });
      if (menuOpen) lenis.stop();
      frame = window.requestAnimationFrame(tick);
    };

    const updateMenu = (event) => {
      menuOpen = event.detail;
      if (menuOpen) lenis?.stop();
      else lenis?.start();
    };

    const scrollToAnchor = (event) => {
      if (
        !lenis || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      ) return;

      const link = event.target.closest("a[href]");
      if (!link || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search || !url.hash) return;

      let id;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;

      // Stop the browser's hash jump before starting the Lenis animation.
      event.preventDefault();
      if (window.location.hash !== url.hash) {
        window.history.pushState(null, "", url.hash);
      }

      // Read layout once per click, then let the existing animation loop scroll.
      // Match the anchor inset so the fixed header doesn't cover the heading.
      const inset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const destination = Math.max(0, Math.min(maximum,
        target.getBoundingClientRect().top + window.scrollY - inset,
      ));
      const distance = Math.abs(destination - lenis.scroll);
      const duration = Math.min(3, Math.max(1.1, 0.9 + Math.sqrt(distance) / 40));

      lenis.scrollTo(destination, {
        duration,
        lerp: 0,
        // Zero velocity and acceleration at both ends: no initial rush or snap.
        easing: (progress) => progress ** 3 * (10 + progress * (-15 + 6 * progress)),
        onComplete: () => {
          const hadTabIndex = target.hasAttribute("tabindex");
          if (!hadTabIndex) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (!hadTabIndex) {
            target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
          }
        },
      });
    };

    updateMotion();
    reducedMotion.addEventListener("change", updateMotion);
    document.addEventListener("click", scrollToAnchor);
    window.addEventListener("portfolio:menu", updateMenu);

    return () => {
      reducedMotion.removeEventListener("change", updateMotion);
      document.removeEventListener("click", scrollToAnchor);
      window.removeEventListener("portfolio:menu", updateMenu);
      lenis?.destroy();
      window.cancelAnimationFrame(frame);
    };
  }, []);
}
