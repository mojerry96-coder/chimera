import { useMemo, useState } from "react";
import { ArrowRight, SealCheck, Check } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton } from "@/components/controls";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, PLATE, SEGMENT, segmentPlate } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";
import { UAT_ORDER, UAT_STEPS } from "@/config/missionData";

/**
 * PAGE 12 — UAT resolution.  Route /t3-resolve
 *
 * Lets the correct process visually settle before the final decision.
 * Section 10 page 12 — no metrics dashboard. The summary carries exactly three
 * lines and nothing more.
 */
export default function T3Resolve() {
  const { go } = useSceneNav("t3-resolve");
  const [uiReady, setUiReady] = useState(false);

  const cues = useMemo<MediaCue[]>(
    () => [
      { poster: PLATE.P12_UAT, hold: 3, push: true, alt: "The QA table.", filter: "under-ui" },
      {
        src: VIDEO.V03_FOLAKE,
        poster: segmentPlate("V03", "D"),
        start: SEGMENT.D.in,
        end: SEGMENT.D.out,
        alt: "Folake looks up from the folder."
      }
    ],
    []
  );

  useVoice(useMemo(() => [VO.P12_FOL_01], []));

  return (
    <PageShell
      pageNumber="12"
      media={<MediaSequence cues={cues} onComplete={() => setUiReady(true)} />}
    >
      {uiReady && (
        <>
          <Box x={362} y={112} w={1196} h={830} z={10} className="flat-panel" />

          <Box x={424} y={184} w={1000} h={120} z={20}>
            <h1 className="display-md text-[var(--paper)]">
              UAT <span className="text-[var(--accent)]">RESOLUTION</span>
            </h1>
          </Box>

          <Box x={424} y={334} w={480} h={40} z={20}>
            <div className="flex items-center gap-12">
              <SealCheck size={26} className="text-[var(--success)]" />
              <span className="font-manrope text-[15px] font-semibold uppercase tracking-[0.12em] text-[var(--success)]">
                Sequence approved
              </span>
            </div>
          </Box>

          <Box x={424} y={424} w={1000} h={128} z={20}>
            <div className="flex h-full items-center gap-16">
              {UAT_ORDER.map((code, i) => (
                <div key={code} className="flex items-center">
                  <div className="flex h-[128px] w-[164px] flex-col items-center justify-center gap-10 rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--surface)] px-12">
                    <Check size={16} className="text-[var(--success)]" />
                    <span
                      className="text-[34px] text-[var(--accent)]"
                      style={{ fontFamily: '"Afacad", sans-serif' }}
                    >
                      {code}
                    </span>
                    <span className="text-center font-manrope text-[11px] leading-[1.3] text-[var(--text-muted)]">
                      {UAT_STEPS[code]}
                    </span>
                  </div>
                  {i < UAT_ORDER.length - 1 && (
                    <ArrowRight size={16} className="mx-4 text-[var(--text-faint)]" />
                  )}
                </div>
              ))}
            </div>
          </Box>

          <Box x={424} y={594} w={1000} h={164} z={20}>
            <div className="flex h-full flex-col justify-center gap-16 rounded-[var(--radius-card)] border border-[var(--line)] px-32">
              {["Sequence valid", "Sign-off ready", "Next step available"].map((t) => (
                <div key={t} className="flex items-center gap-14">
                  <Check size={16} className="text-[var(--success)]" />
                  <span className="body text-[var(--paper-soft)]">{t}</span>
                </div>
              ))}
            </div>
          </Box>

          <Box x={728} y={796} w={390} h={60} z={20}>
            <PrimaryButton onClick={() => go("pre-final")}>
              Continue <ArrowRight size={18} />
            </PrimaryButton>
          </Box>
        </>
      )}
    </PageShell>
  );
}
