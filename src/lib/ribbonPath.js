// Broad, rounded sweeps follow section heights instead of a series of small
// waypoints. The hero always gets one uninterrupted curve across its content.
export function createRibbonPath(width, height, sections) {
  const mobile = width <= 760;
  const inset = mobile ? 0.09 : 0.045;
  const preferredSpan = mobile ? 1000 : 850;
  let x = width * 0.88;
  let y = -64;
  let bend = 0;
  let path = `M ${x} ${y}`;

  const sweepTo = (nextY) => {
    if (nextY <= y) return;
    const nextX = width * (++bend % 2 ? inset : 1 - inset);
    const span = nextY - y;
    // Both handles are vertical at each join: the line rounds the bend without
    // a corner, diagonal kink, or overshoot. Height stays monotonic for scroll.
    path += ` C ${x} ${y + span * 0.52}, ${nextX} ${nextY - span * 0.52}, ${nextX} ${nextY}`;
    x = nextX;
    y = nextY;
  };

  for (const section of sections) {
    const count = section.id === "home" ? 1 : Math.max(1, Math.round(section.height / preferredSpan));
    for (let index = 1; index <= count; index++) {
      sweepTo(Math.min(height, section.top + section.height * index / count));
    }
  }
  sweepTo(height);
  return path;
}
