import { useCallback, useEffect, useRef, useState } from "react";
import type { VoiceLine } from "./voice";
import { whenAudioUnlocked, isAudioUnlocked } from "./audioGate";

/**
 * Sequential voiceover playback.
 *
 * Deliberately decoupled from MediaSequence. Measured against the master
 * prompt's section 15 timing table, 12 of 14 media windows are shorter than
 * the voiceover they carry — P02 is 14.8s of speech in a 6.2s window. Rather
 * than re-time the media, section 17's "media does not gate interaction" is
 * taken at its word: the page reveals its UI on the published schedule and the
 * voiceover finishes underneath. See ASSET_QA.md section 5.1.
 *
 * A rejected `play()` is NOT the same as a finished line. Three cases:
 *
 *   AbortError      the element was paused while play() was still pending,
 *                   which React StrictMode causes on every mount in dev. Do
 *                   nothing — the effect is being torn down and will re-run.
 *   NotAllowedError autoplay policy. Wait on the gate and start when the user
 *                   first interacts, rather than dropping the line.
 *   anything else   a genuinely broken file. Advance so one bad asset cannot
 *                   stall the film.
 *
 * Collapsing all three into "advance" is what silenced the whole track: the
 * StrictMode pause aborted line one, the sequence advanced, and every
 * subsequent line aborted the same way within a millisecond.
 */
export function useVoice(
  lines: VoiceLine[],
  opts: {
    autoplay?: boolean;
    enabled?: boolean;
    /**
     * Seconds from mount at which each line should begin, one entry per line.
     *
     * Without this, lines run back-to-back, which is right for a page whose
     * media is one continuous shot. On a cut sequence it is wrong — a line
     * lands wherever the previous one happened to end rather than on the shot
     * it belongs to. Page 10 uses offsets so the student speaks over her own
     * footage, the insert plays in silence, and Adebayo and Folake speak on
     * their own shots.
     *
     * Offsets are measured from mount, not from the previous line, so one
     * long line cannot push everything after it out of sync.
     */
    offsets?: number[];
  } = {}
) {
  const { autoplay = true, enabled = true, offsets } = opts;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState<VoiceLine | null>(null);
  const [waitingForGesture, setWaitingForGesture] = useState(!isAudioUnlocked());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mountedAt = useRef(performance.now());

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setPlaying(false);
    setCurrent(null);
  }, []);

  useEffect(() => {
    if (!enabled || !autoplay || index >= lines.length) {
      if (index >= lines.length) setPlaying(false);
      return;
    }

    const line = lines[index];
    const el = new Audio(line.src);
    el.preload = "auto";
    audioRef.current = el;

    let cancelled = false;
    const advance = () => {
      if (!cancelled) setIndex((i) => i + 1);
    };

    el.addEventListener("ended", advance);
    el.addEventListener("error", advance);

    (async () => {
      if (!isAudioUnlocked()) {
        setWaitingForGesture(true);
        await whenAudioUnlocked();
      }
      if (cancelled) return;

      // Hold this line until its cue point. Measured from mount, so the wait
      // shrinks by however long the gate and earlier lines already consumed.
      const cue = offsets?.[index];
      if (cue != null) {
        const wait = cue * 1000 - (performance.now() - mountedAt.current);
        if (wait > 0) await new Promise((r) => setTimeout(r, wait));
        if (cancelled) return;
      }

      setWaitingForGesture(false);
      setCurrent(line);
      setPlaying(true);
      try {
        await el.play();
      } catch (e) {
        if (cancelled) return;
        const name = (e as DOMException)?.name;
        if (name === "AbortError") return;
        if (name === "NotAllowedError") {
          setWaitingForGesture(true);
          await whenAudioUnlocked();
          if (!cancelled) el.play().catch(() => advance());
          return;
        }
        advance();
      }
    })();

    return () => {
      cancelled = true;
      el.removeEventListener("ended", advance);
      el.removeEventListener("error", advance);
      el.pause();
    };
  }, [index, lines, enabled, autoplay, offsets]);

  useEffect(() => stop, [stop]);

  return {
    /** Line currently sounding, for the caption layer. */
    current,
    playing,
    /** True while the browser is refusing sound until the user interacts. */
    waitingForGesture,
    index,
    stop,
    totalSeconds: lines.reduce((n, l) => n + l.seconds, 0)
  };
}
