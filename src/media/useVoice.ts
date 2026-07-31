import { useCallback, useEffect, useRef, useState } from "react";
import type { VoiceLine } from "./voice";

/**
 * Sequential voiceover playback.
 *
 * Deliberately decoupled from MediaSequence. Measured against the master
 * prompt's section 15 timing table, 12 of 14 media windows are shorter than
 * the voiceover they carry — P02 is 14.8s of speech in a 6.2s window. Rather
 * than re-time the media, section 17's "media does not gate interaction" is
 * taken at its word: the page reveals its UI on the published schedule and the
 * voiceover finishes underneath. See ASSET_QA.md section 5.1.
 */
export function useVoice(lines: VoiceLine[], opts: { autoplay?: boolean; enabled?: boolean } = {}) {
  const { autoplay = true, enabled = true } = opts;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState<VoiceLine | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    audioRef.current = el;
    setCurrent(line);
    setPlaying(true);

    const next = () => setIndex((i) => i + 1);
    el.addEventListener("ended", next);
    // A missing or blocked file must not stall the sequence.
    el.addEventListener("error", next);
    el.play().catch(next);

    return () => {
      el.removeEventListener("ended", next);
      el.removeEventListener("error", next);
      el.pause();
    };
  }, [index, lines, enabled, autoplay]);

  useEffect(() => stop, [stop]);

  return {
    /** Line currently sounding, for the caption layer. */
    current,
    playing,
    /** Index of the line being spoken. */
    index,
    stop,
    /** Total scripted runtime, useful when pacing a page against its media. */
    totalSeconds: lines.reduce((n, l) => n + l.seconds, 0)
  };
}
