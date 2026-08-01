import { useEffect, useState } from "react";
import { SpeakerSlash } from "@phosphor-icons/react";
import { isAudioUnlocked, onAudioGateChange } from "@/media/audioGate";

/**
 * Shown only while the browser is withholding sound.
 *
 * This is not persistent chrome — section 1.4 forbids that — it is a transient
 * notice that removes itself the moment any interaction opens the gate. Without
 * it a player sits through narrated pages in silence with no idea why.
 */
export function AudioGatePrompt() {
  const [locked, setLocked] = useState(!isAudioUnlocked());

  useEffect(() => {
    const off = onAudioGateChange((open) => setLocked(!open));
    return () => {
      off();
    };
  }, []);

  if (!locked) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute bottom-[52px] left-[64px] z-50 flex items-center gap-14 rounded-[var(--radius-pill)] border border-[var(--line-strong)] bg-[var(--surface)] px-22 py-14"
    >
      <SpeakerSlash size={20} className="text-[var(--accent)]" />
      <span className="font-manrope text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--paper-soft)]">
        Click anywhere to enable sound
      </span>
    </div>
  );
}
