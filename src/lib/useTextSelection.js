import { useEffect } from "react";

export default function useTextSelection() {
  useEffect(() => {
    const targets = [...document.querySelectorAll(
      "main p, main h3, main .text-link, .project-stack li, .hero-bottom > span, .portrait-caption strong, .portrait-caption div > span, .about-education > span, .work-footnote > span",
    )];
    const marked = new Set();

    const update = () => {
      const selection = window.getSelection();
      const ranges = selection && !selection.isCollapsed
        ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index))
        : [];

      for (const element of targets) {
        const selected = ranges.some((range) => range.intersectsNode(element));
        if (selected && !marked.has(element)) {
          element.setAttribute("data-text-selected", "");
          marked.add(element);
        } else if (!selected && marked.has(element)) {
          element.removeAttribute("data-text-selected");
          marked.delete(element);
        }
      }
    };

    document.addEventListener("selectionchange", update);
    update();
    return () => {
      document.removeEventListener("selectionchange", update);
      marked.forEach((element) => element.removeAttribute("data-text-selected"));
    };
  }, []);
}
