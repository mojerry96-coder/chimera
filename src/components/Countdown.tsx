import { useEffect, useState } from "react";

/**
 * Mission clock. Page 03 states the rule plainly: show only the mission clock,
 * never confidence, readiness, backlog, architecture or justification.
 *
 * `live` ticks for presentation. It does not drive `timeRemaining` — that is
 * spent explicitly by task via `useSim().spendTime`, so the simulation stays
 * deterministic and a player who leaves a tab open is not punished.
 */
export function Countdown({
  hours,
  minutes = 0,
  seconds = 0,
  live = false,
  size = 72
}: {
  hours: number;
  minutes?: number;
  seconds?: number;
  live?: boolean;
  size?: number;
}) {
  const [t, setT] = useState(hours * 3600 + minutes * 60 + seconds);

  useEffect(() => {
    setT(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setT((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, [live]);

  const hh = Math.floor(t / 3600);
  const mm = Math.floor((t % 3600) / 60);
  const ss = t % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="flex items-baseline gap-18 text-[var(--paper)]"
      style={{
        fontFamily: '"Afacad", sans-serif',
        fontSize: size,
        lineHeight: 0.9,
        fontVariantNumeric: "tabular-nums"
      }}
      role="timer"
      aria-label={`${hh} hours ${mm} minutes remaining`}
    >
      <span>{pad(hh)}</span>
      <span className="text-[var(--text-faint)]">:</span>
      <span>{pad(mm)}</span>
      <span className="text-[var(--text-faint)]">:</span>
      <span>{pad(ss)}</span>
    </div>
  );
}

export function TimeSublabels() {
  return (
    <div className="flex gap-18" style={{ fontFamily: '"Manrope", sans-serif', fontSize: 10 }}>
      <span className="w-[76px] uppercase tracking-[0.18em] text-[var(--text-muted)]">Hours</span>
      <span className="w-[76px] uppercase tracking-[0.18em] text-[var(--text-muted)]">Minutes</span>
      <span className="w-[76px] uppercase tracking-[0.18em] text-[var(--text-muted)]">Seconds</span>
    </div>
  );
}
