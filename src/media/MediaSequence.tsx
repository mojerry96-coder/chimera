import { useCallback, useEffect, useRef, useState } from "react";
import { whenAudioUnlocked } from "./audioGate";

export type MediaCue = {
  /** Video source. Omit to hold a still for `hold` seconds. */
  src?: string;
  /** Plate shown on reduced motion, load failure, and after the cue ends. */
  poster: string;
  /** Seek-in point, for segment playback. */
  start?: number;
  /** Stop point. The element is paused here rather than played to its end. */
  end?: number;
  /** Seconds to hold, for still-only cues. */
  hold?: number;
  alt: string;
  /** 2-3% slow push. Section 18 permits this; it is the only motion allowed. */
  push?: boolean;
  filter?: "normal" | "under-ui" | "subdued";
};

type Props = {
  cues: MediaCue[];
  /** Fires once the last cue finishes. The page reveals its UI from here. */
  onComplete?: () => void;
  /** Section 1.5 — skipping is allowed after 2 seconds. */
  skipAfter?: number;
  className?: string;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Master prompt section 1.5 — video first, UI afterward.
 *
 *   1. Play each cue once, in order.
 *   2. Seek to cue.start and stop at cue.end when given.
 *   3. Never loop.
 *   4. Hold the final frame; the matching plate sits underneath at all times so
 *      the switch is invisible. P01-P08 are pixel-exact freeze frames of their
 *      own clips, so this is a true match rather than an approximation.
 *   5. Allow skip after 2s.
 *   6. On reduced motion or failed load, show the plate and complete after
 *      150ms without ever touching the network.
 *
 * Section 17 — media does not gate interaction. `onComplete` is a cue for the
 * page to reveal UI, not a lock; pages may reveal on their own schedule and
 * let audio continue underneath.
 */
export function MediaSequence({ cues, onComplete, skipAfter = 2, className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [degraded, setDegraded] = useState(() => prefersReducedMotion());
  const videoRef = useRef<HTMLVideoElement>(null);
  const completed = useRef(false);

  const cue = cues[Math.min(index, cues.length - 1)];
  const isLast = index >= cues.length - 1;

  /**
   * The plate on screen.
   *
   * While playing it is the current cue's, so the video-to-plate switch never
   * flashes. Once the sequence is over — or short-circuited by reduced motion,
   * a failed load, or a rejected autoplay — it is the *last* cue's, because
   * that is the "final held image" the section 15 placement manifest specifies
   * for the page. Holding cue zero here would strand page 01 on the Abuja
   * establishing shot instead of the cast reveal.
   */
  const displayCue = degraded || done ? cues[cues.length - 1] : cue;

  const finish = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    setDone(true);
    onComplete?.();
  }, [onComplete]);

  const advance = useCallback(() => {
    if (isLast) finish();
    else setIndex((i) => i + 1);
  }, [isLast, finish]);

  /** Skip the whole sequence, not just the current cue. */
  const skipAll = useCallback(() => {
    setIndex(cues.length - 1);
    finish();
  }, [cues.length, finish]);

  // Degraded path: never load video, reveal UI after 150ms.
  useEffect(() => {
    if (!degraded) return;
    const t = setTimeout(finish, 150);
    return () => clearTimeout(t);
  }, [degraded, finish]);

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setCanSkip(true), skipAfter * 1000);
    return () => clearTimeout(t);
  }, [done, skipAfter]);

  // Still-only cue: hold, then advance.
  useEffect(() => {
    if (degraded || done || cue?.src) return;
    const t = setTimeout(advance, (cue?.hold ?? 2) * 1000);
    return () => clearTimeout(t);
  }, [cue, degraded, done, advance]);

  // Video cue: seek in, watch for the out point, never loop.
  useEffect(() => {
    if (degraded || done) return;
    const el = videoRef.current;
    if (!el || !cue?.src) return;

    let raf = 0;
    const onLoaded = async () => {
      if (cue.start != null) el.currentTime = cue.start;
      try {
        await el.play();
      } catch (e) {
        const name = (e as DOMException)?.name;
        // A blocked autoplay is not a broken asset. Degrading here threw away
        // the entire cinematic sequence and jumped straight to the final
        // plate, which is exactly what "it happened too fast to follow" looks
        // like. Wait for the gate instead, then start.
        if (name === "NotAllowedError") {
          await whenAudioUnlocked();
          el.play().catch(() => setDegraded(true));
          return;
        }
        if (name === "AbortError") return;
        setDegraded(true);
      }
    };
    const watch = () => {
      if (cue.end != null && el.currentTime >= cue.end) {
        el.pause();
        advance();
        return;
      }
      raf = requestAnimationFrame(watch);
    };

    const onError = () => setDegraded(true);

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("ended", advance);
    el.addEventListener("error", onError);
    if (el.readyState >= 1) onLoaded();
    raf = requestAnimationFrame(watch);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("ended", advance);
      el.removeEventListener("error", onError);
    };
  }, [cue, degraded, done, advance]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (canSkip && !done && (e.key === "Escape" || e.key === "Enter")) skipAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canSkip, done, skipAll]);

  const filter = `media-${displayCue?.filter ?? "normal"}`;
  const showVideo = !degraded && !done && Boolean(cue?.src);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Plate always underneath, so the video-to-plate switch never flashes. */}
      <img
        src={displayCue?.poster}
        alt={displayCue?.alt ?? ""}
        className={`media-fill ${filter}`}
        style={
          displayCue?.push
            ? { transform: "scale(1.03)", transition: "transform 6s linear" }
            : undefined
        }
      />

      {showVideo && (
        <video
          ref={videoRef}
          src={cue!.src}
          poster={cue!.poster}
          className={`media-fill ${filter}`}
          playsInline
          muted
          preload="auto"
          aria-label={cue!.alt}
        />
      )}

      {canSkip && !done && (
        <button
          onClick={skipAll}
          className="absolute bottom-40 right-48 z-40 rounded-[var(--radius-pill)] border border-[var(--line-strong)] bg-[var(--surface)]/90 px-24 py-12 button-label text-[var(--paper)] transition-colors hover:bg-[var(--surface-raised)]"
        >
          Skip
        </button>
      )}
    </div>
  );
}

/** Static full-page plate. */
export function Plate({
  src,
  alt = "",
  filter = "normal",
  push = false
}: {
  src: string;
  alt?: string;
  filter?: "normal" | "under-ui" | "subdued";
  push?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={`media-fill media-${filter}`}
        style={push ? { transform: "scale(1.03)", transition: "transform 8s linear" } : undefined}
      />
    </div>
  );
}
