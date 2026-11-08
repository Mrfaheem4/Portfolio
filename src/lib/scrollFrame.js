const listeners = new Set();

export function subscribeScrollFrame(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function publishScrollFrame(scroll, time) {
  listeners.forEach((listener) => listener(scroll, time));
}

// A short, time-based glide has the same response at 60 Hz and 120 Hz.
export function smoothRibbonLength(current, target, deltaMs) {
  if (Math.abs(target - current) < 0.05) return target;
  const elapsed = Math.max(0, Math.min(64, deltaMs));
  return current + (target - current) * -Math.expm1(-elapsed / 65);
}
