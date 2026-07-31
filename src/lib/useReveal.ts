import { useEffect, useState } from "react";

/**
 * Staged UI reveal.
 *
 * Section 1.4 — the page reveals only what the player needs at that moment.
 * Pass the published cue times from the section 15 timing table; `at(n)` is
 * true once stage n has arrived.
 *
 * Reduced motion collapses every stage to immediate, so nobody waits on
 * decorative timing.
 */
export function useReveal(stages: number[]) {
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setReached(stages.length);
      return;
    }

    const timers = stages.map((s, i) => setTimeout(() => setReached((r) => Math.max(r, i + 1)), s * 1000));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages.length]);

  return {
    /** True once stage `n` (1-based) has arrived. */
    at: (n: number) => reached >= n,
    reached
  };
}
