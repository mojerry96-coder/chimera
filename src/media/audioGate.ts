/**
 * Audio unlock gate.
 *
 * Browsers refuse to start audible playback until the user has interacted with
 * the page. This whole simulation is narration-led, so rather than let each
 * line fail on its own, playback waits here until sound is actually permitted
 * and then proceeds from the first line — nothing is dropped.
 *
 * Some embedded browsers allow autoplay outright, so the gate probes once with
 * a silent clip and opens immediately when it can.
 */

/** 44-byte silent WAV. Playing it is the cheapest honest autoplay probe. */
const SILENT_WAV =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YQAAAAA=";

let unlocked = false;
const waiters = new Set<() => void>();
const listeners = new Set<(v: boolean) => void>();

const GESTURES = ["pointerdown", "keydown", "touchstart"] as const;

function open() {
  if (unlocked) return;
  unlocked = true;
  GESTURES.forEach((g) => window.removeEventListener(g, open));
  waiters.forEach((w) => w());
  waiters.clear();
  listeners.forEach((l) => l(true));
}

if (typeof window !== "undefined") {
  GESTURES.forEach((g) => window.addEventListener(g, open, { once: false, passive: true }));
  const probe = new Audio(SILENT_WAV);
  probe.volume = 0;
  probe
    .play()
    .then(() => {
      probe.pause();
      open();
    })
    .catch(() => {
      /* Autoplay is blocked. The gate stays shut until a real gesture. */
    });
}

export function isAudioUnlocked() {
  return unlocked;
}

/** Resolves once audio may play. Resolves immediately if it already may. */
export function whenAudioUnlocked(): Promise<void> {
  if (unlocked) return Promise.resolve();
  return new Promise((resolve) => waiters.add(resolve));
}

/** Subscribe to gate state, for the prompt that asks for the first click. */
export function onAudioGateChange(cb: (open: boolean) => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
