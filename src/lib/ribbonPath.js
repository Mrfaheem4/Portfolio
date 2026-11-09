// Guides for one continuous curve, not stops on a zigzag. Paired guides let
// the ribbon linger near an edge before crossing the page.
const guides = {
  home: [[0.88, 0.22], [0.12, 1]],
  work: [[0.08, 0.12], [0.08, 0.24], [0.91, 0.58], [0.91, 0.82]],
  experience: [[0.2, 0.58], [0.14, 1]],
  about: [[0.28, 0.32], [0.88, 1]],
  skills: [[0.91, 0.34], [0.86, 0.78]],
  contact: [[0.73, 0], [0.35, 0.58], [0.12, 0.9], [0.12, 1]],
};

function buildRibbon(width, height, sections) {
  const inset = width <= 760 ? 0.1 : 0.045;
  const points = [{ x: width * 0.88, y: -64 }];

  for (const section of sections) {
    const route = guides[section.id] ?? [[0.5, 1]];
    for (const [position, progress] of route) {
      const y = Math.min(height, section.top + section.height * progress);
      const x = width * Math.max(inset, Math.min(1 - inset, position));
      if (Math.hypot(x - points.at(-1).x, y - points.at(-1).y) < 0.01) continue;
      points.push({ x, y });
    }
  }

  if (points.at(-1).y < height) points.push({ x: width * 0.12, y: height });

  // A cubic B-spline shares tangent and curvature at every join. Its convex
  // hull keeps it inside the page; increasing Y keeps scroll lookup valid.
  // Repeated end guides clamp the curve to its original end caps.
  const start = points[0];
  const end = points.at(-1);
  const controls = [start, start, ...points, end, end];
  let path = `M ${start.x} ${start.y}`;
  const curves = [];
  let previous = start;

  for (let index = 0; index < controls.length - 3; index++) {
    const [, b, c, d] = controls.slice(index, index + 4);
    const first = { x: (2 * b.x + c.x) / 3, y: (2 * b.y + c.y) / 3 };
    const second = { x: (b.x + 2 * c.x) / 3, y: (b.y + 2 * c.y) / 3 };
    const next = { x: (b.x + 4 * c.x + d.x) / 6, y: (b.y + 4 * c.y + d.y) / 6 };
    path += ` C ${first.x} ${first.y}, ${second.x} ${second.y}, ${next.x} ${next.y}`;
    curves.push([previous, first, second, next]);
    previous = next;
  }
  return { path, curves };
}

export function createRibbonPath(width, height, sections) {
  return buildRibbon(width, height, sections).path;
}

// Flatten the known Bezier curves in JS instead of asking SVG to traverse the
// entire path hundreds of times. Tight error bounds preserve the drawn shape.
export function createRibbonGeometry(width, height, sections) {
  const { path, curves } = buildRibbon(width, height, sections);
  const points = [{ ...curves[0][0], distance: 0 }];
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const flatten = (a, b, c, d, depth = 0) => {
    const chord = distance(a, d);
    const polygon = distance(a, b) + distance(b, c) + distance(c, d);
    if (polygon - chord < 0.05 || depth >= 12) {
      const previous = points.at(-1);
      points.push({ ...d, distance: previous.distance + distance(previous, d) });
      return;
    }
    const ab = midpoint(a, b), bc = midpoint(b, c), cd = midpoint(c, d);
    const abc = midpoint(ab, bc), bcd = midpoint(bc, cd);
    const middle = midpoint(abc, bcd);
    flatten(a, ab, abc, middle, depth + 1);
    flatten(middle, bcd, cd, d, depth + 1);
  };
  curves.forEach((curve) => flatten(...curve));

  const length = points.at(-1).distance;
  let cursor = 1;
  const samples = Array.from({ length: 601 }, (_, index) => {
    const target = length * index / 600;
    while (cursor < points.length - 1 && points[cursor].distance < target) cursor++;
    const before = points[cursor - 1], after = points[cursor];
    const progress = (target - before.distance) / (after.distance - before.distance || 1);
    return { distance: target, y: before.y + (after.y - before.y) * progress };
  });
  return { path, length, samples };
}

