// Mimics jQuery easeInOutQuad easing function
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Mimics jQuery easeOutElastic easing function
export function easeOutElastic(t: number): number {
  const p = 0.3;
  return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
}

// Custom timing function that combines elastic and quad easing
export function customLogoEasing(t: number): number {
  return t < 0.5 ? easeInOutQuad(t) : easeOutElastic(t);
}