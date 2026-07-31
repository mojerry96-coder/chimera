import { useMemo, useState } from "react";
import { ArrowRight, Users, ShieldCheck, Cube, Database, Broadcast } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton, SecondaryButton } from "@/components/controls";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, PLATE, SEGMENT, segmentPlate } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";

/** Read-only category view. Section 10 page 05 — five large nodes, nothing else. */
const CATEGORIES = [
  { label: "Users", Icon: Users },
  { label: "Access Gateway", Icon: ShieldCheck },
  { label: "Application Services", Icon: Cube },
  { label: "Data Services", Icon: Database },
  { label: "External Services", Icon: Broadcast }
];

/**
 * PAGE 05 — Architecture confirmation.  Route /t1-confirm
 *
 * Forces commitment before justification. The preview is deliberately
 * read-only: no component tray, no node handles, no tool dock, no metrics and
 * no help control.
 */
export default function T1Confirm() {
  const { go } = useSceneNav("t1-confirm");
  const [uiReady, setUiReady] = useState(false);
  const pattern = useSim((s) => s.patternDesigned);

  const cues = useMemo<MediaCue[]>(
    () => [
      {
        src: VIDEO.V01_ADEBAYO,
        poster: segmentPlate("V01", "A"),
        start: SEGMENT.A.in,
        end: SEGMENT.A.out,
        alt: "Dr Adebayo at the project table."
      },
      { poster: PLATE.P10_ARCHITECTURE, hold: 0.2, alt: "The architecture workstation.", filter: "under-ui" }
    ],
    []
  );

  useVoice(useMemo(() => [VO.P05_ADB_01], []));

  return (
    <PageShell
      pageNumber="05"
      media={<MediaSequence cues={cues} onComplete={() => setUiReady(true)} />}
    >
      {uiReady && (
        <>
          <Box x={286} y={102} w={1348} h={868} z={10} className="flat-panel" />

          <Box x={350} y={144} w={500} h={28} z={20}>
            <span className="label text-[var(--accent)]">Project Chimera · 05</span>
          </Box>

          <Box x={350} y={206} w={1220} h={82} z={20}>
            <h1 className="display-md text-[var(--paper)]">ARCHITECTURE CONFIRMATION</h1>
          </Box>

          <Box x={350} y={304} w={1220} h={32} z={20}>
            <p className="body-lg text-[var(--paper-soft)]">Is this your chosen architecture?</p>
          </Box>

          <Box x={350} y={368} w={1220} h={310} z={20}>
            <div className="flex h-full w-full items-center justify-between rounded-[var(--radius-card)] border border-[var(--line)] px-40">
              {CATEGORIES.map((c, i) => (
                <div key={c.label} className="flex items-center">
                  <div className="flex w-[170px] flex-col items-center gap-16">
                    <div className="flex h-[96px] w-[96px] items-center justify-center rounded-[var(--radius-card)] border border-[var(--accent)]">
                      <c.Icon size={40} className="text-[var(--paper)]" />
                    </div>
                    <span className="text-center font-manrope text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--paper)]">
                      {c.label}
                    </span>
                  </div>
                  {i < CATEGORIES.length - 1 && (
                    <ArrowRight size={20} className="mx-8 shrink-0 text-[var(--accent)]" />
                  )}
                </div>
              ))}
            </div>
          </Box>

          <Box x={510} y={720} w={900} h={54} z={20}>
            <p className="body text-center text-[var(--text-muted)]">
              Review the architecture above. You can redesign it, or confirm and proceed.
              {pattern && <> Detected pattern: <span className="text-[var(--paper-soft)]">{pattern}</span>.</>}
            </p>
          </Box>

          <Box x={526} y={814} w={350} h={64} z={20}>
            <SecondaryButton onClick={() => go("t1")}>Redesign</SecondaryButton>
          </Box>

          <Box x={902} y={814} w={420} h={64} z={20}>
            <PrimaryButton onClick={() => go("t1-justify")}>
              Confirm Architecture <ArrowRight size={18} />
            </PrimaryButton>
          </Box>
        </>
      )}
    </PageShell>
  );
}
