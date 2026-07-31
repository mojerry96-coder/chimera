import { useMemo, useState } from "react";
import { ArrowRight, Bug, Warning, Clock, ClipboardText } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton, Pill } from "@/components/controls";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, PLATE, SEGMENT, segmentPlate } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";
import { DEFECTS, type Severity } from "@/config/missionData";

const ICON = { d07: Warning, d12: Bug, d19: Clock, d23: ClipboardText };
const TONE: Record<Severity, "danger" | "warning" | "neutral"> = {
  Critical: "danger",
  High: "warning",
  Medium: "neutral"
};

/**
 * PAGE 07 — Defect board reveal.  Route /t2-intro
 *
 * Shifts from architecture theory to live operational consequence. The defect
 * UI appears only after the physical folder settles — the object lands first,
 * then the data.
 *
 * Rows carry an icon, ID, one-line title and a severity pill. No paragraph.
 * Full detail opens only on selection.
 */
export default function T2Intro() {
  const { go } = useSceneNav("t2-intro");
  const [uiReady, setUiReady] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const cues = useMemo<MediaCue[]>(
    () => [
      { src: VIDEO.V06_FOLDER, poster: PLATE.P06_RED_BOARD, alt: "Folake places the defect folder on the table." },
      {
        src: VIDEO.V02_CHIDI,
        poster: segmentPlate("V02", "A"),
        start: SEGMENT.A.in,
        end: SEGMENT.A.out,
        alt: "Chidi, focused."
      },
      { poster: PLATE.P06_RED_BOARD, hold: 0.2, alt: "The red defect board.", filter: "under-ui" }
    ],
    []
  );

  useVoice(useMemo(() => [VO.P07_CHI_01, VO.P07_FOL_01], []));

  return (
    <PageShell
      pageNumber="07"
      media={<MediaSequence cues={cues} onComplete={() => setUiReady(true)} />}
    >
      {uiReady && (
        <>
          <Box x={54} y={70} w={1048} h={936} z={10} className="flat-panel" />

          <Box x={108} y={166} w={820} h={100} z={20}>
            <h1 className="display-md text-[var(--paper)]">
              FOUR ENGINEERS.
              <br />
              <span className="text-[var(--accent)]">FOUR DEFECTS.</span>
            </h1>
          </Box>

          <Box x={108} y={286} w={760} h={34} z={20}>
            <p className="body-lg text-[var(--paper-soft)]">
              We cannot treat every problem as equal.
            </p>
          </Box>

          {/* Rows are 890x102 with a 16px gap. */}
          <Box x={108} y={364} w={890} h={456} z={20}>
            <div className="flex h-full flex-col gap-16">
              {DEFECTS.map((d) => {
                const Icon = ICON[d.id];
                const isOpen = open === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setOpen(isOpen ? null : d.id)}
                    aria-expanded={isOpen}
                    className={`flex h-[102px] w-full shrink-0 items-center gap-20 rounded-[var(--radius-card)] border px-24 text-left transition-colors ${
                      isOpen
                        ? "border-[var(--accent)] bg-[var(--surface-raised)]"
                        : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-raised)]"
                    }`}
                  >
                    <Icon size={28} className="shrink-0 text-[var(--accent)]" />
                    <span className="w-[92px] shrink-0 font-manrope text-[16px] font-semibold text-[var(--paper)]">
                      {d.code}
                    </span>
                    <span className="flex-1 font-manrope text-[16px] text-[var(--paper-soft)]">
                      {d.title}
                    </span>
                    <Pill tone={TONE[d.severity]}>{d.severity}</Pill>
                  </button>
                );
              })}
            </div>
          </Box>

          <Box x={108} y={864} w={890} h={64} z={20}>
            <PrimaryButton onClick={() => go("t2")}>
              Allocate Engineers <ArrowRight size={18} />
            </PrimaryButton>
          </Box>
        </>
      )}
    </PageShell>
  );
}
