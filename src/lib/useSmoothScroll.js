import { useEffect } from "react";
import Lenis from "lenis";

export default function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;

    const updateMotion = () => {
      lenis?.destroy();
      lenis = undefined;

      if (reducedMotion.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.1,
      });
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

      lenis.scrollTo(target, {
        duration: 1.2,
        lerp: 0,
        easing: (progress) => 1 - (1 - progress) ** 3,
        onComplete: () => {
          const hadTabIndex = target.hasAttribute("tabindex");
          if (!hadTabIndex) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (!hadTabIndex) target.removeAttribute("tabindex");
        },
      });
    };

    updateMotion();
    reducedMotion.addEventListener("change", updateMotion);
    document.addEventListener("click", scrollToAnchor);

    return () => {
      reducedMotion.removeEventListener("change", updateMotion);
      document.removeEventListener("click", scrollToAnchor);
      lenis?.destroy();
    };
  }, []);
}
